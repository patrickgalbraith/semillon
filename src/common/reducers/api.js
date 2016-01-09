import { merge } from 'lodash'
import { post, types as postActionTypes } from './post'

const initialState = {
  posts: {}
}

// Updates an entity cache in response to any action with response.entities.
export function entities(state = initialState, action) {
  let newState = null;

  if (action.response && action.response.entities) {
    newState = merge({}, state, action.response.entities)
  }

  // Check if it is an action related to getting a Post
  if (postActionTypes.indexOf(action.type) >= 0) {
    newState = post(newState ? newState : state, action)
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