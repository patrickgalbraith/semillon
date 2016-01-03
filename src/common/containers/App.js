import React, { Component, PropTypes } from 'react'
import Header from './Header'
import Introduction from '../components/Introduction'

export default class App extends Component {
  render() {
    const { children } = this.props
    return (
      <div>
        <Header />

        <div className="outer-container">
          <Introduction />

          {children}
        </div>
      </div>
    )
  }
}

App.propTypes = {
  children: PropTypes.node
}