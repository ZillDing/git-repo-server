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
  displayLinkType: 'http'/'ssh',
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

export function error(state = null, action) {
  switch (action.type) {
    case 'APOLOGIZE':
      return action.error
    case 'SET_REPOS':
      return null
    default:
      return state
  }
}

export function user(state = null, action) {
  switch (action.type) {
    case 'SET_USER':
      return action.user
    default:
      return state
  }
}

export function loggingIn(state = false, action) {
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

export function loggingOut(state = false, action) {
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

export function creatingRepo(state = false, action) {
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

export function deletingRepo(state = false, action) {
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

export function loadingRepos(state = true, action) {
  switch (action.type) {
    case 'SET_REPOS':
      return false
    case 'SELECT_REPO':
      return true
    default:
      return state
  }
}

export function loadingSelectedRepo(state = true, action) {
  switch (action.type) {
    case 'SELECT_REPO':
      return false
    case 'SET_REPOS':
      return true
    default:
      return state
  }
}

export function selectedRepo(state = {}, action) {
  switch (action.type) {
    case 'SELECT_REPO':
      return action.repo
    default:
      return state
  }
}

export function repos(state = [], action) {
  switch (action.type) {
    case 'SET_REPOS':
      return action.repos
    default:
      return state
  }
}

export function searchTerm(state = '', action) {
  switch (action.type) {
    case 'SET_SEARCH_TERM':
      return action.term
    case 'SELECT_REPO':
      return ''
    default:
      return state
  }
}

export function displayLinkType(state = 'http', action) {
  switch (action.type) {
    case 'SET_DISPLAY_LINK_TYPE':
      return action.linkType
    default:
      return state
  }
}
