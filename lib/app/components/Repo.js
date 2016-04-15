import React, { Component, PropTypes } from 'react'

import { trimTrailingGit } from '../utils'

import RepoLink from './RepoLink'
import Readme from './Readme'

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

    return (
      <div>
        <h1>{trimTrailingGit(id)}</h1>
        <RepoLink
          id={id}
          displayLinkType={displayLinkType}
          onLinkTypeChange={onSetDisplayLinkType} />
        <hr/>
        {
          loadingSelectedRepo ?
            <p>loading...</p> :
            <Readme content={selectedRepo.readmeContent || ''} />
        }
      </div>
    )
  }
}

Repo.propTypes = {
  id: PropTypes.string.isRequired,
  error: PropTypes.any,
  displayLinkType: PropTypes.oneOf(['ssh', 'http']).isRequired,
  loadingSelectedRepo: PropTypes.bool.isRequired,
  selectedRepo: PropTypes.object.isRequired,
  onLoad: PropTypes.func.isRequired,
  onSetDisplayLinkType: PropTypes.func.isRequired
}

export default Repo
