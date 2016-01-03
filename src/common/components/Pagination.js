import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'

export default class Pagination extends Component {
  renderPrev() {
    const { currentPage, totalPages, direction } = this.props
    const larr = String.fromCharCode(8592)
    let delta = direction === 'asc' ? -1 : 1

    if (currentPage === 1 && direction === 'asc') {
      return null
    } else if (currentPage >= totalPages && direction === 'desc') {
      return null
    }

    return (
      <div className="nav-previous">
        <Link to={`/page/${currentPage+delta}`}><span className="meta-nav">{larr}</span> Older posts</Link>
      </div>
    )
  }

  renderNext() {
    const { currentPage, totalPages, direction } = this.props
    const rarr = String.fromCharCode(8594)
    let delta = direction === 'asc' ? 1 : -1

    if (currentPage === 1 && direction === 'desc') {
      return null
    } else if (currentPage >= totalPages && direction === 'asc') {
      return null
    }

    return (
      <div className="nav-next">
        <Link to={`/page/${currentPage+delta}`}>Newer posts <span className="meta-nav">{rarr}</span></Link>
      </div>
    )
  }

  render() {
    return (
      <nav className="navigation paging-navigation" role="navigation">
        <h1 className="screen-reader-text">Posts navigation</h1>
        <div className="nav-links">
          {this.renderPrev()}
          {this.renderNext()}
        </div>
      </nav>
    )
  }
}

Pagination.propTypes = {
  currentPage: PropTypes.number.isRequired,
  totalPages: PropTypes.number.isRequired,
  direction: PropTypes.string
}