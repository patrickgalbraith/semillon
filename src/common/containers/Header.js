import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import PrimaryMenu from '../components/PrimaryMenu'
import HeaderNav from '../components/HeaderNav'
import * as MenuActions from '../actions/menu'

class Header extends Component {
  render() {
    const { primaryMenuVisible, actions } = this.props
    return (
      <div className={primaryMenuVisible ? 'primary-menu-open' : ''}>
        <PrimaryMenu />
        <HeaderNav togglePrimaryMenu={actions.togglePrimaryMenu} />
      </div>
    )
  }
}

Header.propTypes = {
  primaryMenuVisible: PropTypes.bool,
  actions: PropTypes.object.isRequired
}

function mapStateToProps(state) {
  return { primaryMenuVisible: state.menu.primaryMenuVisible }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(MenuActions, dispatch)
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Header)