import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import DebounceInput from 'react-debounce-input'

import { fetchRepos, setSearchTerm } from './actions'
import { addTrailingGit, trimTrailingGit, getFilteredResult } from './utils'

class Repos extends Component {
  componentDidMount() {
    this.props.dispatch(fetchRepos())
  }

  render() {
    const {
      dispatch,
      loadingRepos,
      visibleRepos
    } = this.props

    if (loadingRepos) {
      return <p>loading...</p>
    }

    return (
      <div>
        <p>
          <Link to="/new">Create New Repository</Link>
        </p>
        <DebounceInput
          debounceTimeout={300}
          placeholder="Search..."
          onChange={e => dispatch(setSearchTerm(e.target.value))} />
        <ul>
          {
            visibleRepos.map(id =>
              <li key={id} style={{margin: 5}}>
                <Link to={`/repos/${addTrailingGit(id)}`}>{trimTrailingGit(id)}</Link>
                <span style={{marginLeft: 20}}>---</span>
                <Link to={`/delete/${addTrailingGit(id)}`}>delete</Link>
              </li>
            )
          }
        </ul>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    loadingRepos: state.loadingRepos,
    visibleRepos: getFilteredResult(state.repos, state.searchTerm)
  }
}

const ReposComponent = connect(
  mapStateToProps
)(Repos)

export default ReposComponent
