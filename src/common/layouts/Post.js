import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import PostHeader from '../components/PostHeader'
import Spinner from '../components/Spinner'
import { loadPostBySlug } from '../actions/posts'

class Post extends Component {
  static fetchData(dispatch, urlParams) {
    const loadPostBound = bindActionCreators(loadPostBySlug, dispatch)

    return Promise.all([
      loadPostBound(urlParams.post)
    ])
  }

  componentWillMount() {
    this.constructor.fetchData(this.props.dispatch, this.props.params)
  }

  render() {
    const {post} = this.props

    if (!post || post.isFetchingFailed) {
      return (
        <h1>Post not found!</h1>
      )
    }

    if (post.isFetching) {
      return (
        <Spinner />
      )
    }

    return (
      <article className={`post post-${post.id}`} key={post.id}>
        <PostHeader post={post} />
        <section className="post-body" itemProp="articleBody" dangerouslySetInnerHTML={{__html: post.content.rendered }} />
      </article>
    )
  }
}

Post.propTypes = {
  post: PropTypes.object
}

function mapStateToProps(state, ownProps) {
  const posts = state.entities.posts
  let post = null

  for (let key in posts) {
    if (posts[key].slug === ownProps.params.post) {
      post = posts[key]
      break
    }
  }

  return {
    post
  }
}

export default connect(
  mapStateToProps
)(Post)