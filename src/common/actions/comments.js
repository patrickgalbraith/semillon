import { CALL_API, Schemas } from '../middleware/api'
import { get } from 'lodash'

export const COMMENTS_REQUEST = 'COMMENTS_REQUEST'
export const COMMENTS_SUCCESS = 'COMMENTS_SUCCESS'
export const COMMENTS_FAILURE = 'COMMENTS_FAILURE'

function isNumeric(item) {
  return (+item) == item
}

function fetchCommentsByPost(post, page = 1) {
  const postKey = isNumeric(post) ? 'post' : 'post_slug'
  return {
    post,
    page,
    [CALL_API]: {
      types: [ COMMENTS_REQUEST, COMMENTS_SUCCESS, COMMENTS_FAILURE ],
      endpoint: `wp/v2/comments/?${postKey}=${post}&page=${page}&order=asc`,
      schema: Schemas.COMMENT_ARRAY
    }
  }
}

export function loadCommentsByPost(post, page = 1) {
  return (dispatch, getState) => {
    const state = getState()
    const comments = get(state, `pagination.comments.${post}.ids[${page-1}]`)

    if (comments) {
      return null
    }

    return dispatch(fetchCommentsByPost(post, page))
  }
}