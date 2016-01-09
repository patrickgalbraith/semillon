import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import PostHeader from '../components/PostHeader'
import CommentsArea from '../components/CommentsArea'
import Spinner from '../components/Spinner'
import { loadPostBySlug } from '../actions/posts'

class Post extends Component {
  static fetchData(dispatch, urlParams) {
    const _loadPost = bindActionCreators(loadPostBySlug, dispatch)

    return Promise.all([
      _loadPost(urlParams.post)
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

        <CommentsArea comments={comments} />
      </div>
    )
  }
}

Post.propTypes = {
  post: PropTypes.object
}

function mapStateToProps(state, ownProps) {
  const posts = state.entities.posts
  const comments = state.entities.comments

  let post = null
  let postComments = []

  for (let key in posts) {
    if (posts[key].slug === ownProps.params.post) {
      post = posts[key]
      break
    }
  }

  if(post) {
    for (let key in comments) {
      if (comments[key].post === post.id) {
        postComments.push(comments[key])
      }
    }
  }

  return {
    post,
    comments: postComments
  }
}

export default connect(
  mapStateToProps
)(Post)