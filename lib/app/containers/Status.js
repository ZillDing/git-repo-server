import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'

import { getProfile, logout } from '../actions'

class Status extends Component {
  componentWillMount() {
    this.props.onLoad()
  }

  render() {
    const { user, loggingOut, onLogoutClick } = this.props

    if (!user) {
      return <p><Link to="/login">Login</Link></p>
    }

    const logout = loggingOut ?
      <span>logging out...</span> :
      <a href="#" onClick={onLogoutClick}>Logout</a>

    return (
      <div>
        Hi, <strong>{user.username}</strong>!
        <span style={{marginLeft: 10}}>-- </span>
        { logout }
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    user: state.user,
    loggingOut: state.loggingOut,
    error: state.error
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onLoad: () => dispatch(getProfile()),
    onLogoutClick: () => dispatch(logout())
  }
}

const StatusComponent = connect(
  mapStateToProps,
  mapDispatchToProps
)(Status)

export default StatusComponent
