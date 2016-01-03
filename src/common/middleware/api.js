import { Schema, arrayOf, normalize } from 'normalizr'
import { camelizeKeys } from 'humps'
import 'isomorphic-fetch'

export const CALL_API = Symbol('CALL_API')

const API_ROOT = 'http://reactwp.loopback.link/wp-json/wp/v2/'

// Fetches an API response and normalizes the result JSON according to schema.
// This makes every API response have the same shape, regardless of how nested it was.
function callApi(endpoint, schema) {
  const fullUrl = (endpoint.indexOf(API_ROOT) === -1) ? API_ROOT + endpoint : endpoint

  return fetch(fullUrl)
    .then(response =>
      response.json().then(json => ({ json, response }))
    ).then(({ json, response }) => {
      if (!response.ok) {
        return Promise.reject(json)
      }

      const camelizedJson = camelizeKeys(json)

      return Object.assign({},
        normalize(camelizedJson, schema)
      )
    })
}

const userSchema = new Schema('users', {
  idAttribute: 'id'
})

const postSchema = new Schema('posts', {
  idAttribute: 'id'
})

export const Schemas = {
  USER: userSchema,
  USER_ARRAY: arrayOf(userSchema),
  POST: postSchema,
  POST_ARRAY: arrayOf(postSchema)
}

// A Redux middleware that interprets actions with CALL_API info specified.
// Performs the call and promises when such actions are dispatched.
export default store => next => action => {
  const callAPI = action[CALL_API]

  if (typeof callAPI === 'undefined') {
    return next(action)
  }

  let { endpoint } = callAPI
  const { schema, types, initialState } = callAPI

  if (typeof endpoint === 'function') {
    endpoint = endpoint(store.getState())
  }

  if (typeof endpoint !== 'string') {
    throw new Error('Specify a string endpoint URL.')
  }
  if (!schema) {
    throw new Error('Specify one of the exported Schemas.')
  }
  if (!Array.isArray(types) || types.length !== 3) {
    throw new Error('Expected an array of three action types.')
  }
  if (!types.every(type => typeof type === 'string')) {
    throw new Error('Expected action types to be strings.')
  }

  function actionWith(data) {
    const finalAction = Object.assign({}, action, data)
    delete finalAction[CALL_API]
    return finalAction
  }

  const [ requestType, successType, failureType ] = types
  next(actionWith({
    type: requestType,
    initialState
  }))

  return callApi(endpoint, schema).then(
    response => next(actionWith({
      response,
      type: successType,
      initialState
    })),
    error => next(actionWith({
      type: failureType,
      error: error.message || 'Something bad happened',
      initialState
    }))
  )
}