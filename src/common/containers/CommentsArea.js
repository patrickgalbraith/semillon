import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { get } from 'lodash'
import CommentsList from '../components/CommentsList'
import CommentsForm from '../components/CommentsForm'
import RespondLink from '../components/RespondLink'
import { loadCommentsByPost, createComment } from '../actions/comments'
import { scrollToElement } from '../helpers/scrollTo'

const CommentsAreaTitle = () =>
  <section className="section-title">
    <h2>COMMENTS</h2>
    <p className="comments-title-cta"><RespondLink>Leave a reply</RespondLink></p>
  </section>

export default class CommentsArea extends Component {
  static fetchData(dispatch, postId) {
    const _loadComments = bindActionCreators(loadCommentsByPost, dispatch)

    return Promise.all([
      _loadComments(postId)
    ])
  }

  constructor() {
    super()
    this.state = {
      replyToComment: 0
    }
  }

  componentWillMount() {
    this.constructor.fetchData(this.props.dispatch, +this.props.post.id)
  }

  onReplyClick(comment) {
    this.setState({
      replyToComment: comment.id
    })

    const element = document.querySelector('.comment-respond')

    if (element) {
      scrollToElement(element, 400)
    }
    })
  }

  render() {
    const { replyToComment } = this.state
    const { comments, fetching, commentFormSubmit } = this.props

    return (
      <div className="comments-area">
        { comments.length > 0 ?
          <CommentsAreaTitle />
        : null}

        { comments.length > 0 && !fetching ?
          <section className="comments">
            <CommentsList comments={comments} onReplyClick={this.onReplyClick.bind(this)} />
          </section>
        : null}

        { fetching ?
          <p>COMMENTS LOADING...</p>
        : null }

        <CommentsForm commentParent={replyToComment} onSubmit={commentFormSubmit} />
      </div>
    )
  }
}

CommentsArea.propTypes = {
  post: PropTypes.object.isRequired,
  commentFormSubmit: PropTypes.func.isRequired,
}

function mapStateToProps(state, ownProps) {
  if(!ownProps.post) {
    return {
      comments: [],
      fetching: false
    }
  }

  const postId = ownProps.post.id
  const ids = get(state, `pagination.comments.${postId}.ids[0]`)
  const fetching = get(state, `pagination.comments.${postId}.isFetching`)
  const comments = ids ? ids.map((val) => state.entities.comments[val]) : []

  return {
    comments,
    fetching
  }
}

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    commentFormSubmit: bindActionCreators(createComment, dispatch)
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CommentsArea)