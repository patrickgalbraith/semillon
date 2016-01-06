import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'

export default class Introduction extends Component {
  render() {
    const { title, subTitle } = this.props
    return (
      <section className="introduction">
        <h1><Link to="/">{title}</Link></h1>
        <h2>{subTitle}</h2>
      </section>
    )
  }
}

Introduction.propTypes = {
  title: PropTypes.string.isRequired,
  subTitle: PropTypes.string.isRequired
}