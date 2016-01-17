import React, { Component, PropTypes } from 'react'
import { scrollToElement } from '../helpers/scrollTo'

export default class RespondLink extends Component {
  scrollToCommentsForm(event) {
    event.preventDefault()

    const element = document.querySelector('.comment-respond')

    if (element) {
      scrollToElement(element)
    }
  }

  render() {
    const { children } = this.props
    return (
      <button onClick={this.scrollToCommentsForm}>{children}</button>
    )
  }
}