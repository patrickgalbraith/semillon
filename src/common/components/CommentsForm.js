import React, { Component, PropTypes } from 'react'

export default class CommentsForm extends Component {
  constructor() {
    super()
    this.state = {
      comment: '',
      author: '',
      email: '',
      url: ''
    }
  }

  onSubmit(event) {
    event.preventDefault()

    if(this.isValid()) {
      this.props.onSubmit(this.state)
    }
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  isValid() {
    const required = ['comment', 'author', 'email']
    return required.reduce((prev, key) => {
      return prev && this.state[key].length > 0
    })
  }

  render() {
    const { commentParent } = this.props

    const onSubmit = this.onSubmit.bind(this)
    const handleChange = this.handleChange.bind(this)

    return (
      <div className="comment-respond">
        <h3 className="comment-reply-title">
          <span>
            Leave a Reply
            { commentParent ?
              <small>
                {' '}
                <a href="#" rel="nofollow">Cancel reply</a>
              </small>
            : null}
          </span>
        </h3>

        <form className="comment-form" onSubmit={onSubmit}>
          <p className="comment-notes">
            <span>Your email address will not be published.</span> Required fields are marked <span className="required">*</span>
          </p>
          <p className="comment-form-comment">
            <label htmlFor="comment">Comment</label>
            <textarea
              name="comment"
              rows="8"
              cols="45"
              required
              ariaRequired="true"
              placeholder="Type your comment here... &lt;code&gt; Put code inside a code tag like this. &lt;/code&gt;"
              value={this.state.comment}
              onChange={handleChange} />
          </p>
          <p className="comment-form-author">
            <label htmlFor="author">Name <span className="required">*</span></label>
            <input
              name="author"
              type="text"
              size="30"
              required
              ariaRequired="true"
              onChange={handleChange}
              value={this.state.author} />
          </p>
          <p className="comment-form-email">
            <label htmlFor="email">Email <span className="required">*</span></label>
            <input
              name="email"
              type="email"
              size="30"
              required
              ariaRequired="true"
              onChange={handleChange}
              value={this.state.email} />
          </p>
          <p className="comment-form-url">
            <label htmlFor="url">Website</label>
            <input
              name="url"
              size="30"
              type="url"
              onChange={handleChange}
              value={this.state.url} />
          </p>
          <p className="form-submit">
            <input className="submit" name="submit" type="submit" value="Post Comment" />
          </p>
        </form>
      </div>
    )
  }
}