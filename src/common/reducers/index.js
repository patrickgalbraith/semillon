import { combineReducers } from 'redux'
import { routeReducer } from 'redux-simple-router'
import menu from './menu'
import paginate from './paginate'
import { entities, errorMessage } from './api'

import { POSTS_REQUEST, POSTS_SUCCESS, POSTS_FAILURE } from '../actions/posts'
import { COMMENTS_REQUEST, COMMENTS_SUCCESS, COMMENTS_FAILURE } from '../actions/comments'

// Updates the pagination data for different actions.
const pagination = combineReducers({
  posts: paginate({
    mapActionToKey: action => 'archive',
    types: [
      POSTS_REQUEST,
      POSTS_SUCCESS,
      POSTS_FAILURE
    ]
  }),

  comments: paginate({
    mapActionToKey: action => action.post ? `${action.post}` : 'archive',
    types: [
      COMMENTS_REQUEST,
      COMMENTS_SUCCESS,
      COMMENTS_FAILURE
    ]
  })
})

const rootReducer = combineReducers({
  menu,
  entities,
  pagination,
  errorMessage,
  routing: routeReducer
})

export default rootReducer