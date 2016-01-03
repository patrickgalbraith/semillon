import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'
import Icon from './Icon'

export default class HeaderNav extends Component {
  render() {
    const { togglePrimaryMenu } = this.props
    return (
      <header className="top-header">
        <div className="left">
          <button onClick={togglePrimaryMenu}><div className="menu-icon"><b></b><b></b><b></b></div></button>
        </div>
        <div className="right">
          <Link to="/contact" title="Email"><Icon name="mail" /></Link>
          <a href="https://twitter.com/P_Galbraith" title="Twitter"><Icon name="twitter" /></a>
          <a href="http://au.linkedin.com/in/pjgalbraith" title="LinkedIn"><Icon name="linkedin" /></a>
        </div>
      </header>
    )
  }
}

HeaderNav.propTypes = {
  togglePrimaryMenu: PropTypes.func.isRequired,
}