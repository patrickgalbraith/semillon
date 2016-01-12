import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { get } from 'lodash'
import PostHeader from '../components/PostHeader'
import CommentsArea from '../containers/CommentsArea'
import Spinner from '../components/Spinner'
import { loadPostBySlug } from '../actions/posts'
import { loadCommentsByPost } from '../actions/comments'

class Post extends Component {
  static fetchData(dispatch, urlParams) {
    const _loadPost = bindActionCreators(loadPostBySlug, dispatch)

    return Promise.all([
      _loadPost(urlParams.post),
    ])
  }

  componentWillMount() {
    this.constructor.fetchData(this.props.dispatch, this.props.params)
  }

  getPostClasses(post) {
    let classes = [
      'post',
      'post-'+post.id,
      'type-'+post.type,
      'status-'+post.status,
      'format-'+post.format,
      'hentry'
    ]

    if(post.featuredImage) {
      classes.push('has-post-thumbnail')
    }

    return classes.join(' ')
  }

  render() {
    const {post, comments} = this.props

    if (!post || post.isFetchingFailed) {
      return (
        <h1>Post not found!</h1>
      )
    }

    const excerpt = post.excerpt ? post.excerpt.rendered : null
    const content = post.content ? post.content.rendered : excerpt

    if (post.isFetching && !excerpt) {
      return (
        <Spinner />
      )
    }

    return (
      <div>
        <article className={this.getPostClasses(post)} key={post.id}>
          <PostHeader post={post} />
          <section className="post-body" itemProp="articleBody" dangerouslySetInnerHTML={{__html: content }} />
        </article>

        <CommentsArea post={post} />
      </div>
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

  return { post }
}

export default connect(
  mapStateToProps
)(Post)