import React, { Component, PropTypes } from 'react'

export default class CommentsForm extends Component {
  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  onCancelReply(event) {
    event.preventDefault()
    this.props.onCancelReply()
  }

  onSubmit(event) {
    event.preventDefault()

    if(this.isValid()) {
      this.props.onSubmit(this.state)
    }
  }

  isValid() {
    const required = ['content', 'author_name', 'author_email']
    return required.every((key) => {
      return this.state[key].length > 0
    })
  }

  render() {
    const { commentParent, pending } = this.props

    const onSubmit = this.onSubmit.bind(this)
    const onCancelReply = this.onCancelReply.bind(this)
    const handleChange = this.handleChange.bind(this)

    const ldquo = "\u201C"
    const rdquo = "\u201D"

    let commentTitle = <h3 className="comment-reply-title">Leave a Reply</h3>

    if(commentParent) {
      commentTitle = (
        <h3 className="comment-reply-title">
          { `Replying to ${ldquo}${commentParent.authorName}${rdquo}` }
          <button onClick={onCancelReply}>Cancel reply</button>
        </h3>
      )
    }

    return (
      <div className="comment-respond">
        { commentTitle }

        <form className="comment-form" onSubmit={onSubmit}>
          <p className="comment-notes">
            <span>Your email address will not be published.</span> Required fields are marked <span className="required">*</span>
          </p>
          <p className="comment-form-comment">
            <label htmlFor="comment">Comment</label>
            <textarea
              name="content"
              rows="8"
              cols="45"
              required
              ariaRequired="true"
              disabled={pending}
              placeholder="Type your comment here... &lt;code&gt; Put code inside a code tag like this. &lt;/code&gt;"
              onChange={handleChange} />
          </p>
          <p className="comment-form-author">
            <label htmlFor="author">Name <span className="required">*</span></label>
            <input
              name="author_name"
              type="text"
              size="30"
              required
              ariaRequired="true"
              disabled={pending}
              onChange={handleChange} />
          </p>
          <p className="comment-form-email">
            <label htmlFor="email">Email <span className="required">*</span></label>
            <input
              name="author_email"
              type="email"
              size="30"
              required
              ariaRequired="true"
              disabled={pending}
              onChange={handleChange} />
          </p>
          <p className="comment-form-url">
            <label htmlFor="author_url">Website</label>
            <input
              name="url"
              size="30"
              type="url"
              disabled={pending}
              onChange={handleChange} />
          </p>
          <p className="form-submit">
            <input
              className="submit"
              name="submit"
              type="submit"
              disabled={pending}
              value="Post Comment" />
          </p>
        </form>
      </div>
    )
  }
}