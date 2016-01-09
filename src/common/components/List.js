import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'
import PostHeader from './PostHeader'

export default class List extends Component {
  renderArticle(item) {
    if(!item.isFetching && !item.isFetchingFailed) {
      return (
        <article className={`post post-${item.id}`} key={item.id}>
          <PostHeader post={item} />
          <section className="post-body" itemProp="articleBody" dangerouslySetInnerHTML={{__html: item.excerpt.rendered }} />
        </article>
      )
    }
  }

  render() {
    const { items } = this.props
    return (
      <div className="posts">
        {items.length > 0 ? items.map((item) =>
          item ? this.renderArticle(item) : null
        ) : null}
      </div>
    )
  }
}

List.propTypes = {
  items: PropTypes.array.isRequired
}