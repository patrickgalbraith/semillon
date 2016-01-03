import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'
import TimeAgo from './TimeAgo'

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
          {post.commentCount.approved ? (
            <Link to={post.link} className="comment-count">{post.commentCount.approved}</Link>
          ) : null}
        </h1>
        <p className="subtitle">
          {post.secondaryTitle}
        </p>
        <p className="date">
          <TimeAgo dateTime={post.dateGmt}/>
        </p>
      </header>
    )
  }
}