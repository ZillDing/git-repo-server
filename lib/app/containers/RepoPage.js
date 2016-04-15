import { connect } from 'react-redux'

import { fetchRepoInfo, setDisplayLinkType } from '../actions'
import { trimTrailingGit } from '../utils'

import Repo from '../components/Repo'

function mapStateToProps(state, ownProps) {
  return {
    id: ownProps.params.id,
    error: state.error,
    displayLinkType: state.displayLinkType,
    loadingSelectedRepo: state.loadingSelectedRepo,
    selectedRepo: state.selectedRepo
  }
}

function mapDispatchToProps(dispatch) {
  return {
    onLoad: id => dispatch(fetchRepoInfo(id)),
    onSetDisplayLinkType: type => dispatch(setDisplayLinkType(type))
  }
}

const RepoPage = connect(
  mapStateToProps,
  mapDispatchToProps
)(Repo)

export default RepoPage
