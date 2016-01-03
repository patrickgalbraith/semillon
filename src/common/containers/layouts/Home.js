import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import List from '../../components/List'
import { loadPosts } from '../../actions/posts'

function loadData(props) {
  props.loadPosts()
}

class Home extends Component {
  componentWillMount() {
    loadData(this.props)
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
  posts: PropTypes.array.isRequired,
  loadPosts: PropTypes.func.isRequired
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

function mapDispatchToProps(dispatch) {
  return {
    loadPosts: bindActionCreators(loadPosts, dispatch)
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home)