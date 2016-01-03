/* eslint-disable no-console, no-use-before-define */

import path from 'path'
import express from 'express'
import qs from 'qs'
import favicon from 'serve-favicon'
import compression from 'compression'

import webpack from 'webpack'
import webpackDevMiddleware from 'webpack-dev-middleware'
import webpackHotMiddleware from 'webpack-hot-middleware'
import webpackConfig from '../../webpack.config'

import React from 'react'
import { renderToString } from 'react-dom/server'
import { Provider } from 'react-redux'
import { match, RoutingContext } from 'react-router'
import { createMemoryHistory } from 'history'
import { replacePath, syncReduxAndRouter } from 'redux-simple-router'

import configureStore from '../common/store/configureStore'
import routes from '../common/routes'

const app = new express()
const port = process.env.PORT || 3000

if(__DEVELOPMENT__) {
  // Use this middleware to set up hot module reloading via webpack.
  const compiler = webpack(webpackConfig)

  app.use(webpackDevMiddleware(compiler, { noInfo: true, publicPath: webpackConfig.output.publicPath }))
  app.use(webpackHotMiddleware(compiler))
}

app.use(compression())
app.use(favicon(path.join(__dirname, '..', '..', 'static', 'favicon.ico')))
app.use('/static', express.static('static'))

// This is fired every time the server side receives a request
app.use(handleRender)

function handleRender(req, res) {
  if(__DISABLE_SSR__) {
    return res.send(renderFullPage("", {}))
  }

  // Compile an initial state
  const initialState = { }

  // Create in-memory history object
  const history = createMemoryHistory()

  // Create a new Redux store instance
  const store = configureStore(initialState, history)

  syncReduxAndRouter(history, store)

  store.dispatch(replacePath(req.originalUrl, store.getState()))

  match({ routes, location: req.originalUrl }, (error, redirectLocation, renderProps) => {
    if (error) {
      res.status(500).send(error.message)
    } else if (redirectLocation) {
      res.redirect(302, redirectLocation.pathname + redirectLocation.search)
    } else if (renderProps) {
      Promise.all(renderProps.components
        .filter(component => component.fetchData)
        .map(component => {
          // have each component dispatch load actions that return promises
          return component.fetchData(store.dispatch, renderProps.params)
        }))
        .then(() => {
          // after fetchData() has been run on every component the route
          const component = (
            <Provider store={store}>
              <div>
                <RoutingContext {...renderProps} />
              </div>
            </Provider>
          )

          const html = renderToString(component)

          const finalState = store.getState()

          res.status(200)
             .send(renderFullPage(html, finalState))
        })
    } else {
      res.status(404).send('Not found')
    }
  })
}

function renderFullPage(html, initialState) {
  return `
    <!doctype html>
    <html>
      <head>
        <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
        <title>Redux Universal Example</title>
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <link rel="stylesheet" href="/static/main.css" />
        <link rel="stylesheet" href="/static/font/flaticon/flaticon.css" />
      </head>
      <body>
        <div id="app">${html}</div>
        <div id="devtools" class="devtools"></div>
        <script>
          window.__INITIAL_STATE__ = ${JSON.stringify(initialState)}
        </script>
        <script src="/static/bundle.js"></script>
      </body>
    </html>
    `
}

app.listen(port, (error) => {
  if (error) {
    console.error(error)
  } else {
    console.info(`==> 🌎  Listening on port ${port}. Open up http://localhost:${port}/ in your browser.`)
  }
})
