import { push } from 'react-router-redux'

const API_ROOT = '/api'

export function fetchRepos() {
  return dispatch => {
    return fetch(`${API_ROOT}/repos`)
      .then(response => response.json())
      .then(data => dispatch(setRepos(data)))
      .catch(error => dispatch(apologize(error)))
  }
}

function apologize(error) {
  return { type: 'APOLOGIZE', error }
}

function setRepos(repos) {
  return { type: 'SET_REPOS', repos }
}

export function fetchRepoInfo(id) {
  return dispatch => {
    return fetch(`${API_ROOT}/repos/${id}`)
      .then(response => response.json())
      .then(data => dispatch(selectRepo(data)))
      .catch(error => dispatch(apologize(error)))
  }
}

function selectRepo(repo) {
  return { type: 'SELECT_REPO', repo }
}

export function setSearchTerm(term) {
  return { type: 'SET_SEARCH_TERM', term }
}

export function createNewRepo(id) {
  return dispatch => {
    dispatch({ type: 'CREATE_REPO' })

    return fetch(`${API_ROOT}/repos`, {
        method: 'post',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ id }),
        credentials: 'include'
      }).then(response => {
        if (response.ok) {
          return response.json()
        } else {
          throw response
        }
      })
      .then(data => dispatch(push(`/repo/${id}`)))
      .catch(error => dispatch(apologize(error)))
  }
}

export function deleteRepo(id) {
  return dispatch => {
    dispatch({ type: 'DELETE_REPO' })

    return fetch(`${API_ROOT}/repos/${id}`, {
        method: 'delete',
        credentials: 'include'
      })
      .then(response => {
        if (response.ok) {
          return response.json()
        } else {
          throw response
        }
      })
      .then(data => dispatch(push('/')))
      .catch(error => dispatch(apologize(error)))
  }
}

function setUser(user) {
  return { type: 'SET_USER', user }
}

export function login(username, password) {
  return dispatch => {
    dispatch({ type: 'LOGIN' })

    return fetch(`${API_ROOT}/login`, {
        method: 'post',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password }),
        credentials: 'include'
      })
      .then(response => {
        if (response.ok) {
          return response.json()
        } else {
          throw response
        }
      })
      .then(data => {
        dispatch(setUser(data))
        dispatch(push('/'))
      })
      .catch(error => dispatch(apologize(error)))
  }
}

export function logout() {
  return dispatch => {
    dispatch({ type: 'LOGOUT' })

    return fetch(`${API_ROOT}/logout`, {
        credentials: 'include'
      })
      .then(response => {
        if (response.ok) {
          dispatch(setUser(null))
          dispatch(push('/'))
        } else {
          throw response
        }
      })
      .catch(error => dispatch(apologize(error)))
  }
}

export function getProfile() {
  return dispatch => {
    return fetch(`${API_ROOT}/profile`, {
        credentials: 'include'
      })
      .then(response => {
        if (response.ok) {
          return response.json()
        } else {
          throw response
        }
      })
      .then(data => dispatch(setUser(data)))
      // TODO: need to improve error handling
      .catch(error => error)
  }
}

export function setDisplayLinkType(linkType) {
  return { type: 'SET_DISPLAY_LINK_TYPE', linkType}
}
