require("babel-register")

global.__CLIENT__ = false
global.__SERVER__ = true
global.__DISABLE_SSR__ = false  // <----- DISABLES SERVER SIDE RENDERING FOR ERROR DEBUGGING
global.__DEVELOPMENT__ = process.env.NODE_ENV !== 'production'

require('./server')
