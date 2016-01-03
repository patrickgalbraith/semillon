import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'
import Icon from './Icon'

export default class PrimaryMenu extends Component {
  render() {
    return (
      <div className="primary-menu">
        <div className="primary-menu-content">
          <ul className="nav">
            <li><Link to="/">Posts</Link></li>
            <li><Link to="/portfolio">Portfolio</Link></li>
            <li className="social">
              <p>Contact Me</p>
              <Link to="/contact" title="Email"><Icon name="mail" /></Link>
              <Link to="https://twitter.com/P_Galbraith" title="Twitter"><Icon name="twitter" /></Link>
              <Link to="http://au.linkedin.com/in/pjgalbraith" title="LinkedIn"><Icon name="linkedin" /></Link>
            </li>
          </ul>
        </div>
        <div className="primary-menu-cover"></div>
      </div>
    )
  }
}