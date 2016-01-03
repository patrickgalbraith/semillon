import React from 'react'
import { render } from 'react-dom'
import { createHistory } from 'history'
import { syncReduxAndRouter } from 'redux-simple-router'
import configureStore from '../common/store/configureStore'
import Root from '../common/containers/Root'

const initialState = window.__INITIAL_STATE__
const history = createHistory()
const store = configureStore(initialState)
const rootElement = document.getElementById('app')

syncReduxAndRouter(history, store)

if(module.hot) {
  module.hot.accept()
}

render(
  <Root store={store} history={history} />,
  rootElement
)
