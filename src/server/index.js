require("babel-register")
require('dotenv').load()

global.__CLIENT__ = false
global.__SERVER__ = true
global.__DISABLE_SSR__ = process.env.DISABLE_SSR  // <----- DISABLES SERVER SIDE RENDERING
global.__DEVELOPMENT__ = process.env.NODE_ENV !== 'production'
global.__API_ROOT__ = process.env.API_ROOT

require('./server')