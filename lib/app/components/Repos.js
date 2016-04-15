import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'
import DebounceInput from 'react-debounce-input'

import RepoList from './RepoList'

class Repos extends Component {
  componentWillMount() {
    this.props.onLoad()
  }

  render() {
    const {
      loadingRepos,
      visibleRepos,
      isLoggedIn,
      onSearchTermChange
    } = this.props

    if (loadingRepos) {
      return <p>loading...</p>
    }

    return (
      <div>
        {
          isLoggedIn ?
            <p>
              <Link to="/new">Create New Repository</Link>
            </p> :
            null
        }
        <DebounceInput
          debounceTimeout={300}
          placeholder="Search..."
          onChange={e => onSearchTermChange(e.target.value)} />
        {
          loadingRepos ?
            <p>loading...</p> :
            <RepoList
              repos={visibleRepos}
              isLoggedIn={isLoggedIn} />
        }
      </div>
    )
  }
}

Repos.propTypes = {
  loadingRepos: PropTypes.bool.isRequired,
  visibleRepos: PropTypes.array.isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
  onLoad: PropTypes.func.isRequired,
  onSearchTermChange: PropTypes.func.isRequired
}

export default Repos
