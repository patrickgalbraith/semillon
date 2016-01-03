import { combineReducers } from 'redux'
import { routeReducer } from 'redux-simple-router'
import menu from './menu'
import { entities, errorMessage } from './api'

const rootReducer = combineReducers({
  menu,
  entities,
  errorMessage,
  routing: routeReducer
})

export default rootReducer