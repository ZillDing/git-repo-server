/**
UI App state tree:
{
  error: {},
  user: { id, username },
  loggingIn: true/false,
  loggingOut: true/false,
  creatingRepo: true/false,
  deletingRepo: true/false,
  loadingRepos: true/false,
  loadingSelectedRepo: true/false,
  selectedRepo: {
    id: 'hello.git',
    readmeContent: '...'
  },
  searchTerm: '...',
  repos: [
    'repo1',
    'repo2',
    ...
  ]
}
 */

import { combineReducers } from 'redux'
import { routeReducer } from 'react-router-redux'

function error(state = null, action) {
  switch (action.type) {
    case 'APOLOGIZE':
      return action.error
    case 'SET_REPOS':
      return null
    default:
      return state
  }
}

function user(state = null, action) {
  switch (action.type) {
    case 'SET_USER':
      return action.user
    default:
      return state
  }
}

function loggingIn(state = false, action) {
  switch (action.type) {
    case 'LOGIN':
      return true
    case 'SET_USER':
      return false
    case 'APOLOGIZE':
      return false
    default:
      return state
  }
}

function loggingOut(state = false, action) {
  switch (action.type) {
    case 'LOGOUT':
      return true
    case 'SET_USER':
      return false
    case 'APOLOGIZE':
      return false
    default:
      return state
  }
}

function creatingRepo(state = false, action) {
  switch (action.type) {
    case 'CREATE_REPO':
      return true
    case 'SELECT_REPO':
      return false
    case 'APOLOGIZE':
      return false
    default:
      return state
  }
}

function deletingRepo(state = false, action) {
  switch (action.type) {
    case 'DELETE_REPO':
      return true
    case 'SET_REPOS':
      return false
    case 'APOLOGIZE':
      return false
    default:
      return state
  }
}

function loadingRepos(state = true, action) {
  switch (action.type) {
    case 'SET_REPOS':
      return false
    case 'SELECT_REPO':
      return true
    default:
      return state
  }
}

function loadingSelectedRepo(state = true, action) {
  switch (action.type) {
    case 'SELECT_REPO':
      return false
    case 'SET_REPOS':
      return true
    default:
      return state
  }
}

function selectedRepo(state = {}, action) {
  switch (action.type) {
    case 'SELECT_REPO':
      return action.repo
    default:
      return state
  }
}

function repos(state = [], action) {
  switch (action.type) {
    case 'SET_REPOS':
      return action.repos
    default:
      return state
  }
}

function searchTerm(state = '', action) {
  switch (action.type) {
    case 'SET_SEARCH_TERM':
      return action.term
    case 'SELECT_REPO':
      return ''
    default:
      return state
  }
}

const reposApp = combineReducers({
  error,
  user,
  loggingIn,
  loggingOut,
  creatingRepo,
  deletingRepo,
  loadingRepos,
  loadingSelectedRepo,
  selectedRepo,
  searchTerm,
  repos,
  routing: routeReducer
})

export default reposApp
