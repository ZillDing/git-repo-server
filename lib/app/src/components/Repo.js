import React, { Component } from 'react'
import { connect } from 'react-redux'
import ReactMarkdown from 'react-markdown'

import { fetchRepoInfo, setDisplayLinkType } from '../actions'
import { trimTrailingGit } from '../utils'
import RepoLink from './RepoLink'

function Readme(str) {
  if (str) {
    return (
      <div>
        <p>README.md:</p>
        <ReactMarkdown source={str} />
      </div>
    )
  } else {
    return <p>Cannot find `README.md` file.</p>
  }
}

class Repo extends Component {
  componentWillMount() {
    const { id, onLoad } = this.props
    onLoad(id)
  }

  render() {
    const {
      id,
      error,
      displayLinkType,
      loadingSelectedRepo,
      selectedRepo,
      onSetDisplayLinkType
    } = this.props

    if (error) {
      return <h2>No such repo: {id}</h2>
    }

    if (loadingSelectedRepo) {
      return <p>loading...</p>
    }

    return (
      <div>
        <h1>{trimTrailingGit(id)}</h1>
        <RepoLink
          id={id}
          displayLinkType={displayLinkType}
          onLinkTypeChange={onSetDisplayLinkType} />
        <hr/>
        { Readme(selectedRepo.readmeContent) }
      </div>
    )
  }
}

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

const RepoComponent = connect(
  mapStateToProps,
  mapDispatchToProps
)(Repo)

export default RepoComponent
