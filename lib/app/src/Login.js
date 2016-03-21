import React, { Component } from 'react'
import { connect } from 'react-redux'

import { login } from './actions'

export class Login extends Component {
  constructor(props) {
    super(props)
    this._handleClick = this._handleClick.bind(this)
  }

  _getError() {
    if (this.props.error) {
      return <p style={{color: 'red'}}>Login failed.</p>
    }
  }

  _handleClick() {
    const username = this.refs.username.value
    const password = this.refs.password.value
    if (username && password) {
      this.props.dispatch(login(username, password))
    }
  }

  render() {
    return (
      <form ref="form">
        <p>
          <label>Username:
            <input
              type="text"
              name="username"
              ref="username"
              defaultValue="zill" />
          </label>
        </p>
        <p>
          <label>Password:
            <input
              type="password"
              name="password"
              ref="password"
              defaultValue="password" />
          </label>
        </p>
        <p>
          <button type="button" onClick={this._handleClick}>Log In</button>
        </p>
        { this._getError() }
      </form>
    )
  }
}

function mapStateToProps(state, ownProps) {
  return {
    error: state.error,
    loggingIn: state.loggingIn
  }
}

const LoginRepoComponent = connect(
  mapStateToProps
)(Login)

export default LoginRepoComponent
