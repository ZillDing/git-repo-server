import React, { Component } from 'react'
import { connect } from 'react-redux'
import ReactMarkdown from 'react-markdown'

import { fetchRepoInfo } from '../actions'
import { trimTrailingGit } from '../utils'

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
    const { dispatch, id } = this.props
    dispatch(fetchRepoInfo(id))
  }

  _handleFocus(e) {
    e.target.select()
  }

  render() {
    const { id, error, loadingSelectedRepo, selectedRepo } = this.props

    if (error) {
      return <h2>No such repo: {id}</h2>
    }

    if (loadingSelectedRepo) {
      return <p>loading...</p>
    }

    const repoSSHLink = `git@zubuntu.ddns.net:/opt/git/${id}`

    return (
      <div>
        <h1>{trimTrailingGit(id)}</h1>
        <span>ssh:</span>
        <input
          type="text"
          value={repoSSHLink}
          readOnly
          onFocus={this._handleFocus.bind(this)} />
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
    loadingSelectedRepo: state.loadingSelectedRepo,
    selectedRepo: state.selectedRepo
  }
}

const RepoComponent = connect(
  mapStateToProps
)(Repo)

export default RepoComponent
