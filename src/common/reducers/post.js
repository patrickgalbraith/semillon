import { merge } from 'lodash'
import { POST_REQUEST, POST_SUCCESS, POST_FAILURE } from '../actions/posts'

export const types = [
  POST_REQUEST, POST_SUCCESS, POST_FAILURE
]

export function post(state, action) {
  const { slug, id } = action.initialState
  let newState = { posts: {} }

  if (action.type === POST_REQUEST) {
    if (id) {
      newState.posts[id] = action.initialState
    }

    if (slug) {
      newState.posts[slug] = action.initialState
    }

    return merge({}, state, newState)
  } else if(action.type === POST_FAILURE) {
    newState = merge({}, state)

    if (id && newState.posts[id]) {
      newState.posts[id].isFetching = false
      newState.posts[id].isFetchingFailed = true
    }

    if (slug && newState.posts[slug]) {
      newState.posts[slug].isFetching = false
      newState.posts[slug].isFetchingFailed = true
    }

    return newState
  } else if(action.type === POST_SUCCESS) {
    newState = merge({}, state)

    if (id && newState.posts[id]) {
      newState.posts[id].isFetching = false
    }

    if (action.response.result.length > 0 && slug) {
      delete newState.posts[slug]
    } else if(newState.posts[slug]) {
      newState.posts[slug].isFetching = false
      newState.posts[slug].isFetchingFailed = true
    }

    return newState
  }

  return state
}