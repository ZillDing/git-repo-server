import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import { login } from '../actions'

class Login extends Component {
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
      this.props.onLogin(username, password)
    }
  }

  render() {
    return (
      <form>
        <p>
          <label>Username:
            <input
              type="text"
              name="username"
              ref="username"
              defaultValue="zill"/>
          </label>
        </p>
        <p>
          <label>Password:
            <input
              type="password"
              name="password"
              ref="password"/>
          </label>
        </p>
        <p>Hint: team</p>
        <p>
          <button
            type="button"
            disabled={this.props.loggingIn}
            onClick={this._handleClick}>
            Log In
          </button>
        </p>
        { this._getError() }
      </form>
    )
  }
}

Login.propTypes = {
  error: PropTypes.any,
  loggingIn: PropTypes.bool.isRequired,
  onLogin: PropTypes.func.isRequired
}

export default Login
