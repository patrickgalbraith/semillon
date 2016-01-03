import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import api from '../middleware/api'
import DevTools from '../containers/DevTools'
import rootReducer from '../reducers'

let finalCreateStore
const middlewares = applyMiddleware(
  api, thunk
)

if(__CLIENT__ && __DEVELOPMENT__) {
  finalCreateStore = compose(
    middlewares,

    // Enable Redux DevTools with the monitors you chose
    DevTools.instrument()
  )(createStore)
} else {
  finalCreateStore = middlewares(createStore)
}

export default function configureStore(initialState, history) {
  const store = finalCreateStore(rootReducer, initialState)

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../reducers', () => {
      const nextRootReducer = require('../reducers')
      store.replaceReducer(nextRootReducer)
    })
  }

  return store
}