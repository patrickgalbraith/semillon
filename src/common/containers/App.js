import React, { Component, PropTypes } from 'react'
import Header from './Header'
import Introduction from '../components/Introduction'
import Footer from '../components/Footer'

export default class App extends Component {
  render() {
    const { children } = this.props
    return (
      <div>
        <Header />

        <div className="outer-container">
          <Introduction title={__SITE_NAME__} subTitle={__SITE_TAGLINE__} />

          {children}

          <Footer />
        </div>
      </div>
    )
  }
}

App.propTypes = {
  children: PropTypes.node
}