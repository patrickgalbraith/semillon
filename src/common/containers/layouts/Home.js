import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { get } from 'lodash'
import List from '../../components/List'
import Pagination from '../../components/Pagination'
import { loadPosts } from '../../actions/posts'

class Home extends Component {
  static fetchData(dispatch, urlParams) {
    const loadPostsBound = bindActionCreators(loadPosts, dispatch)
    const paged = urlParams.paged ? +urlParams.paged : 1

    return Promise.all([
      loadPostsBound(paged)
    ])
  }

  componentWillMount() {
    this.constructor.fetchData(this.props.dispatch, this.props.params)
  }

  componentWillReceiveProps(nextProps) {
    const paged    = +get(this.props, 'params.paged', 1)
    const newPaged = +get(nextProps, 'params.paged', 1)

    if (paged !== newPaged) {
      console.log('fetch1')
      this.constructor.fetchData(this.props.dispatch, nextProps.params)
    }
  }

  render() {
    const { posts, totalPages } = this.props
    const paged = +get(this.props, 'params.paged', 1)

    return (
      <div className='home' key={paged}>
        <List items={posts} />

        <Pagination currentPage={paged} totalPages={totalPages} direction="desc" />
      </div>
    )
  }
}

Home.propTypes = {
  posts: PropTypes.array.isRequired
}

function mapStateToProps(state, ownProps) {
  const paged = +get(ownProps, 'params.paged', 1)
  const ids = get(state, `pagination.posts.archive.ids[${paged-1}]`)

  let posts = ids ? ids.map((val) => state.entities.posts[val]) : []

  return {
    posts,
    totalPages: get(state, 'pagination.posts.archive.totalPages')
  }
}

export default connect(
  mapStateToProps
)(Home)