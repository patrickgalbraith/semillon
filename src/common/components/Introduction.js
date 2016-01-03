import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'

export default class introduction extends Component {
  render() {
    return (
      <section className="introduction">
        <h1><Link to="/">My Blog</Link></h1>
        <h2>This is the subtitle</h2>
      </section>
    )
  }
}

