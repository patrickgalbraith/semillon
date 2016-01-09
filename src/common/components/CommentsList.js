import React, { Component, PropTypes } from 'react'

class Comment extends Component {
  render() {
    const { comments } = this.props
    return (
      <div className="comment-body">
        <div className="comment-body-inner">
          <div className="comment-meta">
            <cite className="comment-author">Thomas</cite>
            <span className="says">said</span>
            <time dateTime="August 30, 2012 7:13 pm">
              <a href="/rageagain/#comment-9010">3 years ago</a>
            </time>
          </div>

          <div className="comment-awaiting-mod"></div>

          <div className="comment-content">
            <p>Content....</p>
          </div>

          <div className="comment-reply">
            <a href="#" rel="nofollow" className="comment-reply-link" ariaLabel="Reply to Thomas">Reply</a>
          </div>
        </div>
      </div>
    )
  }
}

export default class CommentsList extends Component {
  render() {
    const { comments } = this.props
    return (
      <ol className="comment-list">
        { comments.map((comment, idx) =>
          <li key={idx} class="comment even thread-even depth-1">
            <Comment />
          </li>
        )}
      </ol>
    )
  }
}

CommentsList.propTypes = {
  comments: PropTypes.array.isRequired
}