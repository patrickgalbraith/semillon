import React, { Component, PropTypes } from 'react'

export default class Icon extends Component {
  render() {
    return (
      <i className={`flaticon-${this.props.name}`} />
    )
  }
}

Icon.propTypes = {
  name: PropTypes.string
}