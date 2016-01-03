window.__CLIENT__ = true
window.__SERVER__ = false
window.__DEVELOPMENT__ = process.env.NODE_ENV !== 'production'
window.__API_ROOT__ = __DEVELOPMENT__ ? 'http://www.pjgalbraith.local/wp-json/wp/v2/' : 'https://www.pjgalbraith.com/wp-json/wp/v2/'

require('./client')