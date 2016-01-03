import merge from 'lodash/object/merge'
import union from 'lodash/array/union'

// Creates a reducer managing pagination, given the action types to handle,
// and a function telling how to extract the key from an action.
export default function paginate({ types, mapActionToKey }) {
  if (!Array.isArray(types) || types.length !== 3) {
    throw new Error('Expected types to be an array of three elements.')
  }
  if (!types.every(t => typeof t === 'string')) {
    throw new Error('Expected types to be strings.')
  }
  if (typeof mapActionToKey !== 'function') {
    throw new Error('Expected mapActionToKey to be a function.')
  }

  const [ requestType, successType, failureType ] = types

  function updatePagination(state = {
    isFetching: false,
    ids: [],
    fetchedPages: []
  }, action) {
    switch (action.type) {
      case requestType:
        return merge({}, state, {
          isFetching: true
        })
      case successType:
        let ids = state.ids.slice(0)
        ids[action.page-1] = action.response.result

        return merge({}, state, {
          ids: ids, //union(state.ids, action.response.result),
          isFetching: false,
          fetchedPages: union(state.fetchedPages, [action.page])
        }, action.response.pagination)
      case failureType:
        return merge({}, state, {
          isFetching: false
        })
      default:
        return state
    }
  }

  return function updatePaginationByKey(state = {}, action) {
    switch (action.type) {
      case requestType:
      case successType:
      case failureType:
        const key = mapActionToKey(action)
        if (typeof key !== 'string') {
          throw new Error('Expected key to be a string.')
        }
        return merge({}, state, {
          [key]: updatePagination(state[key], action)
        })
      default:
        return state
    }
  }
}