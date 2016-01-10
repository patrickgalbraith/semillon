import React, { Component, PropTypes } from 'react'
import CommentsList from '../components/CommentsList'
import CommentsForm from '../components/CommentsForm'

const CommentsAreaTitle = () =>
  <section className="section-title">
    <h2>COMMENTS</h2>
    <p className="comments-title-cta"><a href="#respond">Leave a reply</a></p>
  </section>

export default class CommentsArea extends Component {
  onReplyClick() {

  }

  render() {
    const { comments } = this.props
    return (
      <div className="comments-area">
        <CommentsAreaTitle />

        <section className="comments">
          <CommentsList comments={comments} onReplyClick={this.onReplyClick.bind(this)} />
        </section>

        <CommentsForm />
      </div>
    )
  }
}

CommentsArea.propTypes = {
  comments: PropTypes.array.isRequired
}