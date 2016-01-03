import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import PostHeader from '../../components/PostHeader'
import Spinner from '../../components/Spinner'
import { loadPostBySlug } from '../../actions/posts'

export function fetchData(props) {
  props.loadPost(props.params.post)
}

class Post extends Component {
  componentWillMount() {
    fetchData(this.props)
  }

  render() {
    const {post} = this.props

    if (!post) {
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
  post: PropTypes.object,
  loadPost: PropTypes.func.isRequired
}

function mapStateToProps(state, ownProps) {
  const posts = state.entities.posts
  let post = null

  for (let key in posts) {
    if (posts[key].slug === ownProps.params.post) {
      post = posts[key]
    }
  }

  return {
    post
  }
}

function mapDispatchToProps(dispatch) {
  return {
    loadPost: bindActionCreators(loadPostBySlug, dispatch)
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Post)