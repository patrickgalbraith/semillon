import { Schema, arrayOf } from 'normalizr'
import parseLinkHeader from 'parse-link-header'
import 'isomorphic-fetch'
import { normalizeApiResponse } from '../helpers/wordpressApiResponse'

export const CALL_API = Symbol('CALL_API')

const API_ROOT = __API_ROOT__

// Fetches an API response and normalizes the result JSON according to schema.
// This makes every API response have the same shape, regardless of how nested it was.
function callApi(endpoint, schema, init = {}) {
  const fullUrl = (endpoint.indexOf(API_ROOT) === -1) ? API_ROOT + endpoint : endpoint

  return fetch(fullUrl, init)
    .then(response =>
      response.json().then(json => ({ json, response }))
    ).then(({ json, response }) => {
      if (!response.ok) {
        return Promise.reject(json)
      }

      return normalizeApiResponse(schema, json, response)
    })
}

// Schemas
const userSchema = new Schema('users')
const postSchema = new Schema('posts')
const commentSchema = new Schema('comments')
const mediaSchema = new Schema('media')
const termSchema = new Schema('terms')

postSchema.define({
  _embedded: {
    author: arrayOf(userSchema),
    replies: arrayOf(commentSchema),
    "https://api.w.org/featuredmedia": arrayOf(mediaSchema),
    "https://api.w.org/term": arrayOf(termSchema)
  }
})

commentSchema.define({
  _embedded: {
    up: arrayOf(postSchema)
  }
})

mediaSchema.define({
  _embedded: {
    author: arrayOf(userSchema),
    replies: arrayOf(commentSchema)
  }
})

export const Schemas = {
  USER: userSchema,
  USER_ARRAY: arrayOf(userSchema),
  POST: postSchema,
  POST_ARRAY: arrayOf(postSchema),
  COMMENT: commentSchema,
  COMMENT_ARRAY: arrayOf(commentSchema),
  MEDIA: mediaSchema,
  MEDIA_ARRAY: arrayOf(mediaSchema)
}

// A Redux middleware that interprets actions with CALL_API info specified.
// Performs the call and promises when such actions are dispatched.
export default store => next => action => {
  const callAPI = action[CALL_API]

  if (typeof callAPI === 'undefined') {
    return next(action)
  }

  let { endpoint } = callAPI
  const { schema, types, init } = callAPI

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
    type: requestType
  }))

  return callApi(endpoint, schema, init).then(
    response => next(actionWith({
      response,
      type: successType
    })),
    error => next(actionWith({
      type: failureType,
      error: error.message || 'Something bad happened'
    }))
  )
}