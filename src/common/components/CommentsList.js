import React, { Component, PropTypes } from 'react'
import TimeAgo from './TimeAgo'

class Comment extends Component {
  onReplyClick(event) {
    event.preventDefault()
    this.props.onReplyClick(this.props.comment)
  }

  render() {
    const { comment } = this.props
    return (
      <div className="comment-body">
        <div className="comment-body-inner">
          <div className="comment-meta">
            <cite className="comment-author">
              { comment.authorUrl ?
                <a href={comment.authorUrl} target="_blank" rel="nofollow">{comment.authorName}</a>
              : comment.authorName }
            </cite>
            {" "}
            <span className="says">said</span>
            {" "}
            <TimeAgo dateTime={comment.date}/>
          </div>

          <div className="comment-content" dangerouslySetInnerHTML={{__html: comment.content.rendered }} />

          <div className="comment-reply">
            <button onClick={this.onReplyClick.bind(this)} className="comment-reply-link" ariaLabel="Reply to Thomas">Reply</button>
          </div>
        </div>
      </div>
    )
  }
}

export default class CommentsList extends Component {
  getCommentClasses(comment, idx) {
    let classes = [
      'comment',
      'depth-'+(comment.parent ? 1 : 0),
      'comment-author-id-'+comment.author
    ]

    if(comment.author) {
      classes.push('byuser')
      // @todo Need to access current post here and match against author
      classes.push('bypostauthor')
    }

    if(idx % 2 == 0) {
      classes.push('even')
    } else {
      classes.push('odd')
    }

    return classes.join(' ')
  }

  render() {
    const { comments, onReplyClick } = this.props
    return (
      <ol className="comment-list">
        { comments.map((comment, idx) =>
          <li key={comment.id} className={this.getCommentClasses(comment, idx)}>
            <Comment comment={comment} onReplyClick={onReplyClick} />
          </li>
        )}
      </ol>
    )
  }
}

CommentsList.propTypes = {
  comments: PropTypes.array.isRequired
}