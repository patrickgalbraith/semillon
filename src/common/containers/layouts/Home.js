import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import List from '../../components/List'
import { loadPosts } from '../../actions/posts'

class Home extends Component {
  static fetchData(dispatch, urlParams) {
    const loadPostsBound = bindActionCreators(loadPosts, dispatch)

    return Promise.all([
      loadPostsBound()
    ])
  }

  componentWillMount() {
    this.constructor.fetchData(this.props.dispatch, this.props.params)
  }

  render() {
    const { posts } = this.props
    return (
      <div className='home'>
        <List items={posts} />
      </div>
    )
  }
}

Home.propTypes = {
  posts: PropTypes.array.isRequired
}

function mapStateToProps(state) {
  let posts = []

  for (let key in state.entities.posts) {
    posts.push(Object.assign({}, state.entities.posts[key]))
  }

  return {
    posts: posts
  }
}

export default connect(
  mapStateToProps
)(Home)