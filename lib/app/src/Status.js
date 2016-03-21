import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'

import { logout } from './actions'

const Status = ({ user, loggingOut, onLogoutClick }) => {
  if (!user) {
    return <Link to="/login">Login</Link>
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

function mapStateToProps(state, ownProps) {
  return {
    user: state.user,
    loggingOut: state.loggingOut,
    error: state.error
  }
}

function mapDispatchToProps(dispatch) {
  return {
    onLogoutClick: () => dispatch(logout())
  }
}

const StatusComponent = connect(
  mapStateToProps,
  mapDispatchToProps
)(Status)

export default StatusComponent
