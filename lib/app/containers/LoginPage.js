import { connect } from 'react-redux'

import { login } from '../actions'

import Login from '../components/Login'

const mapStateToProps = state => {
  return {
    error: state.error,
    loggingIn: state.loggingIn
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onLogin: (username, password) => dispatch(login(username, password))
  }
}

const LoginRepoPage = connect(
  mapStateToProps,
  mapDispatchToProps
)(Login)

export default LoginRepoPage
