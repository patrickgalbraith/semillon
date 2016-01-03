import { CALL_API, Schemas } from '../middleware/api'

export const POST_REQUEST = 'POST_REQUEST'
export const POST_SUCCESS = 'POST_SUCCESS'
export const POST_FAILURE = 'POST_FAILURE'

// Relies on API middleware.
function fetchPost(id) {
  return {
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
      return null
    }

    return dispatch(fetchPost(id))
  }
}

// Relies on API middleware.
function fetchPostBySlug(slug) {
  return {
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
      return null
    }

    return dispatch(fetchPostBySlug(slug))
  }
}

export const POSTS_REQUEST = 'POSTS_REQUEST'
export const POSTS_SUCCESS = 'POSTS_SUCCESS'
export const POSTS_FAILURE = 'POSTS_FAILURE'
export const POSTS_PER_PAGE = 10

// Relies on API middleware.
function fetchPosts() {
  return {
    [CALL_API]: {
      types: [ POSTS_REQUEST, POSTS_SUCCESS, POSTS_FAILURE ],
      endpoint: `posts`,
      schema: Schemas.POST_ARRAY
    }
  }
}

// Relies on Redux Thunk middleware.
export function loadPosts(page = 0) {
  return (dispatch, getState) => {
    const state = getState()
    const posts = state.entities.posts

    // @TODO handle pagination logic and prevent duplicate api calls

    return dispatch(fetchPosts())
  }
}