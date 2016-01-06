require('dotenv').load()

window.__CLIENT__ = true
window.__SERVER__ = false
window.__DEVELOPMENT__ = process.env.NODE_ENV !== 'production'
window.__API_ROOT__ = process.env.API_ROOT

require('./client')