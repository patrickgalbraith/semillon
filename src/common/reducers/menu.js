import { UPDATE_PATH } from 'redux-simple-router'

export const TOGGLE_PRIMARY_MENU = 'TOGGLE_PRIMARY_MENU'

const initialState = {
  primaryMenuVisible: false
}

export default function menu(state = initialState, action) {
  switch (action.type) {
    case TOGGLE_PRIMARY_MENU:
      return {
        primaryMenuVisible: !state.primaryMenuVisible
      }
    case UPDATE_PATH:
      return {
        primaryMenuVisible: false
      }
    default:
      return state
  }
}