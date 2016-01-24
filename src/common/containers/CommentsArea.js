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
    this.state = { replyToComment: 0 }
  }

  componentWillMount() {
    this.constructor.fetchData(this.props.dispatch, +this.props.post.id)
  }

  commentFormSubmit(commentData) {
    const _createComment = bindActionCreators(createComment, this.props.dispatch)
    commentData.post = +this.props.post.id

    if(this.state.replyToComment) {
      commentData.parent = this.state.replyToComment.id
    }

    return _createComment(commentData)
  }

  onReplyClick(comment) {
    this.setState({
      replyToComment: comment
    })

    const element = document.querySelector('.comment-respond')

    if (element) {
      scrollToElement(element, 400)
    }
  }

  onCancelReplyClick() {
    this.setState({
      replyToComment: null
    })
  }

  render() {
    const { replyToComment } = this.state
    const { comments, fetching, pending } = this.props
    const onCancelReply = this.onCancelReplyClick.bind(this)
    const commentFormSubmit = this.commentFormSubmit.bind(this)

    return (
      <div className="comments-area">
        { comments.length > 0 ?
          <CommentsAreaTitle />
        : null }

        { comments.length > 0 && !fetching ?
          <section className="comments">
            <CommentsList comments={comments} onReplyClick={this.onReplyClick.bind(this)} />
          </section>
        : null }

        { fetching ?
          <p>COMMENTS LOADING...</p>
        : null }

        <CommentsForm commentParent={replyToComment} onCancelReply={onCancelReply} pending={pending} onSubmit={commentFormSubmit} />
      </div>
    )
  }
}

CommentsArea.propTypes = {
  post: PropTypes.object.isRequired,
  comments: PropTypes.array.isRequired,
  fetching: PropTypes.bool
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
  const pending = get(state, `forms.commentsArea.${postId}.isPending`)
  const comments = ids ? ids.map((val) => state.entities.comments[val]) : []

  return {
    comments,
    fetching,
    pending
  }
}

function mapDispatchToProps(dispatch) {
  return {
    dispatch
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CommentsArea)