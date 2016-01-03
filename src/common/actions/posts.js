import { CALL_API, Schemas } from '../middleware/api'
import { get } from 'lodash'

export const POST_REQUEST = 'POST_REQUEST'
export const POST_SUCCESS = 'POST_SUCCESS'
export const POST_FAILURE = 'POST_FAILURE'

// Relies on API middleware.
function fetchPost(id) {
  return {
    id,
    [CALL_API]: {
      types: [ POST_REQUEST, POST_SUCCESS, POST_FAILURE ],
      endpoint: `posts/${id}`,
      schema: Schemas.POST,
      initialState: {
        id: id,
        isFetching: true
      }
    }
  }
}

// Relies on Redux Thunk middleware.
export function loadPost(id, requiredFields = []) {
  return (dispatch, getState) => {
    const post = getState().entities.posts[id]

    if (post && requiredFields.every(key => post.hasOwnProperty(key))) {
      console.log('Skip fetching post w/ id', slug)
      return null
    }

    return dispatch(fetchPost(id))
  }
}

// Relies on API middleware.
function fetchPostBySlug(slug) {
  return {
    slug,
    [CALL_API]: {
      types: [ POST_REQUEST, POST_SUCCESS, POST_FAILURE ],
      endpoint: `posts/?filter[name]=${slug}`,
      schema: Schemas.POST_ARRAY,
      initialState: {
        slug: slug,
        isFetching: true
      }
    }
  }
}

// Relies on Redux Thunk middleware.
export function loadPostBySlug(slug, requiredFields = []) {
  return (dispatch, getState) => {
    const posts = getState().entities.posts
    let post = null

    for (let key in posts) {
      if (posts[key].slug === slug) {
        post = posts[key]
        break
      }
    }

    if (post && requiredFields.every(key => post.hasOwnProperty(key))) {
      console.log('Skip fetching post w/ slug', slug)
      return null
    }

    return dispatch(fetchPostBySlug(slug))
  }
}

export const POSTS_REQUEST = 'POSTS_REQUEST'
export const POSTS_SUCCESS = 'POSTS_SUCCESS'
export const POSTS_FAILURE = 'POSTS_FAILURE'

// Relies on API middleware.
function fetchPosts(page) {
  return {
    page,
    [CALL_API]: {
      types: [ POSTS_REQUEST, POSTS_SUCCESS, POSTS_FAILURE ],
      endpoint: `posts?page=${page}`,
      schema: Schemas.POST_ARRAY
    }
  }
}

// Relies on Redux Thunk middleware.
export function loadPosts(page = 1) {
  return (dispatch, getState) => {
    const state = getState()
    const posts = get(state, `pagination.posts.archive.ids[${page-1}]`)

    if (posts) {
      console.log('Skip fetching posts w/ page', page)
      return null
    }

    return dispatch(fetchPosts(page))
  }
}