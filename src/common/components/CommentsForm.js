import React, { Component, PropTypes } from 'react'

export default class CommentsForm extends Component {
  render() {
    const { comments } = this.props
    return (
      <div className="comment-respond">
        <h3 className="comment-reply-title">
          <span>Leave a Reply <small><a href="#" rel="nofollow">Cancel reply</a></small></span>
        </h3>
        <form className="comment-form" name="commentform">
          <p className="comment-notes">
            <span>Your email address will not be published.</span> Required fields are marked <span className="required">*</span>
          </p>
          <p className="comment-form-comment">
            <label htmlFor="comment">Comment</label>
            <textarea ariaRequired="true" cols="45" name="comment" placeholder="Type your comment here... &lt;code&gt; Put code inside a code tag like this. &lt;/code&gt;" rows="8"></textarea>
          </p>
          <p className="comment-form-author">
            <label htmlFor="author">Name <span className="required">*</span></label>
            <input ariaRequired="true" name="author" required="required" size="30" type="text" value="" />
          </p>
          <p className="comment-form-email">
            <label htmlFor="email">Email <span className="required">*</span></label>
            <input aria-describedby="email-notes" ariaRequired="true" name="email" required="required" size="30" type="email" value="" />
          </p>
          <p className="comment-form-url">
            <label htmlFor="url">Website</label>
            <input name="url" size="30" type="url" value="" />
          </p>
          <p className="form-submit">
            <input className="submit" name="submit" type="submit" value="Post Comment" />
            <input name="comment_post_ID" type="hidden" value="1008" />
            <input name="comment_parent" type="hidden" value="0" />
          </p>
        </form>
      </div>
    )
  }
}