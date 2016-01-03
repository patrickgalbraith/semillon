require("babel-register")

global.__CLIENT__ = false
global.__SERVER__ = true
global.__DISABLE_SSR__ = false  // <----- DISABLES SERVER SIDE RENDERING FOR ERROR DEBUGGING
global.__DEVELOPMENT__ = process.env.NODE_ENV !== 'production'
global.__API_ROOT__ = __DEVELOPMENT__ ? 'http://www.pjgalbraith.local/wp-json/wp/v2/' : 'https://www.pjgalbraith.com/wp-json/wp/v2/'

require('./server')
