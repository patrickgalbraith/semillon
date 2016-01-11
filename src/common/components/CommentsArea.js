import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import CommentsList from '../components/CommentsList'
import CommentsForm from '../components/CommentsForm'
import { createComment } from '../actions/comments'

const CommentsAreaTitle = () =>
  <section className="section-title">
    <h2>COMMENTS</h2>
    <p className="comments-title-cta"><a href="#respond">Leave a reply</a></p>
  </section>

export default class CommentsArea extends Component {
  constructor() {
    super()
    this.state = {
      replyToComment: 0
    }
  }

  onReplyClick(comment) {
    this.setState({
      replyToComment: comment.id
    })
  }

  render() {
    const { replyToComment } = this.state
    const { comments, post, commentFormSubmit } = this.props

    return (
      <div className="comments-area">
        { comments.length > 0 ?
          <CommentsAreaTitle />
        : null}

        { comments.length > 0 ?
          <section className="comments">
            <CommentsList comments={comments} onReplyClick={this.onReplyClick.bind(this)} />
          </section>
        : null}

        <CommentsForm commentParent={post.id} onSubmit={commentFormSubmit} />
      </div>
    )
  }
}

CommentsArea.propTypes = {
  post: PropTypes.object.isRequired,
  comments: PropTypes.array.isRequired,
  commentFormSubmit: PropTypes.func.isRequired,
}

function mapDispatchToProps(dispatch) {
  return {
    commentFormSubmit: bindActionCreators(createComment, dispatch)
  }
}

export default connect(
  null,
  mapDispatchToProps
)(CommentsArea)