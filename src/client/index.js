window.__CLIENT__ = true
window.__SERVER__ = false
window.__DEVELOPMENT__ = process.env.NODE_ENV !== 'production'
window.__API_ROOT__ = process.env.API_ROOT

window.__SITE_NAME__ = process.env.SITE_NAME
window.__SITE_TAGLINE__ = process.env.SITE_TAGLINE

require('./client')