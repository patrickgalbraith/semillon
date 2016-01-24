import { merge } from 'lodash'

function commentsArea(state = {}, action) {
  const { type } = action

  if (type === 'COMMENTS_CREATE_REQUEST') {
    const post = action.comment.post

    let newState = merge({}, state)

    if(!newState[post]) {
      newState[post] = { post }
    }

    newState[post].isPending = true

    return newState
  } else if(type === 'COMMENTS_CREATE_FAILURE') {
    const post = action.comment.post

    let newState = merge({}, state)

    if(!newState[post]) {
      newState[post] = { post }
    }

    newState[post].isPending = false

    return newState
  } else if(type === 'COMMENTS_CREATE_SUCCESS') {
    const post = action.comment.post
    const commentId = action.response.entities.comments[action.response.result].id

    let newState = merge({}, state)

    if(!newState[post]) {
      newState[post] = { post }
    }

    if(!newState[post].entities) {
      newState[post].entities = []
    }

    newState[post].isPending = false
    newState[post].entities.push(commentId)

    return newState
  }

  return state
}

export default function forms(state = {}, action) {
  return {
    commentsArea: commentsArea(state.commentsArea, action)
  }
}