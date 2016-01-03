import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'

export default class PostHeader extends Component {
  render() {
    const {post} = this.props
    return (
      <header className="post-header">
        <h1 className="title">
          <span itemProp="name headline">
            <Link to={post.link}>
              <span dangerouslySetInnerHTML={{__html: post.title.rendered }} />
            </Link>
          </span>
          <Link to={post.link} className="comment-count">9</Link>
        </h1>
        <p className="subtitle">Post sub-title</p>
        <time dateTime={post.dateGmt}>{post.dateGmt}</time>
      </header>
    )
  }
}