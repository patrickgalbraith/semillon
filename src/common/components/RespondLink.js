import React, { Component, PropTypes } from 'react'

export default class RespondLink extends Component {
  scrollToCommentsForm(event) {
    event.preventDefault()

    const element = document.querySelector('.comment-respond')

    if (element) {
      element.scrollIntoView();
    }
  }

  render() {
    const { children } = this.props
    return (
      <button onClick={this.scrollToCommentsForm}>{children}</button>
    )
  }
}