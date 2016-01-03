import { merge } from 'lodash'

const initialState = {
  posts: {}
}

function post(state, action) {
  let newState = { posts: {} }

  if (action.type === 'POST_REQUEST') {
    if (action.initialState.id) {
      newState.posts[action.initialState.id] = action.initialState
    }

    if (action.initialState.slug) {
      newState.posts[action.initialState.slug] = action.initialState
    }

    return merge({}, state, newState)
  } else if(action.type === 'POST_FAILURE') {
    newState = merge({}, state)

    if (action.initialState.id) {
      newState.posts[action.initialState.id].isFetching = false
      newState.posts[action.initialState.id].isFetchingFailed = true
    }

    if (action.initialState.slug) {
      delete newState.posts[action.initialState.slug]
    }

    return newState
  } else if(action.type === 'POST_SUCCESS') {
    newState = merge({}, state)

    if (action.initialState.id) {
      newState.posts[action.initialState.id].isFetching = false
    }

    if (action.initialState.slug) {
      delete newState.posts[action.initialState.slug]
    }

    return newState
  }

  return state
}

// Updates an entity cache in response to any action with response.entities.
export function entities(state = initialState, action) {
  let newState = null;

  if (action.response && action.response.entities) {
    newState =  merge({}, state, action.response.entities)
  }

  // Check if it is an action related to getting a Post
  if (
    [
      'POST_REQUEST',
      'POST_SUCCESS',
      'POST_FAILURE'
    ].indexOf(action.type) >= 0
  ) {
    newState = post(newState, action)
  }

  return newState ? newState : state
}

// Updates error message to notify about the failed fetches.
export function errorMessage(state = null, action) {
  const { type, error } = action

  if (type === 'RESET_ERROR_MESSAGE') {
    return null
  } else if (error) {
    return action.error
  }

  return state
}