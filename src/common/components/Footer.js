import React, { Component, PropTypes } from 'react'

export default class Footer extends Component {
  render() {
    const copyright = String.fromCharCode(169)
    const thisYear = new Date().getFullYear()

    return (
      <footer className="main-footer">
        {`${copyright} ${thisYear} - Patrick Galbraith. All Rights Reserved.`}
        <br />
        {'All embedded code under '}
        <a href="/static/licence-for-embedded-code.txt" target="_blank" rel="nofollow">MIT license</a>
        <br />
        <br />
      </footer>
    )
  }
}