import { connect } from 'react-redux'

import { fetchRepos, setSearchTerm } from '../actions'
import { getFilteredResult } from '../utils'

import Repos from '../components/Repos'

function mapStateToProps(state) {
  return {
    loadingRepos: state.loadingRepos,
    visibleRepos: getFilteredResult(state.repos, state.searchTerm),
    isLoggedIn: state.user != null
  }
}

function mapDispatchToProps(dispatch) {
  return {
    onLoad: () => dispatch(fetchRepos()),
    onSearchTermChange: (text) => dispatch(setSearchTerm(text))
  }
}

const ReposPage = connect(
  mapStateToProps,
  mapDispatchToProps
)(Repos)

export default ReposPage
