window.__CLIENT__ = true
window.__SERVER__ = false
window.__DEVELOPMENT__ = process.env.NODE_ENV !== 'production'

require('./client')