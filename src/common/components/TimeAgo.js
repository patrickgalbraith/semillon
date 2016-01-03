import React, { Component, PropTypes } from 'react'
import timeAgo from '../helpers/timeAgo'

export default class TimeAgo extends Component {
  render() {
    const { dateTime } = this.props
    return (
      <time dateTime={dateTime}>{timeAgo(dateTime)}</time>
    )
  }
}