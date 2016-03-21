import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import DebounceInput from 'react-debounce-input'

import { fetchRepos, setSearchTerm } from './actions'
import { getFilteredResult } from './utils'

function getCreateComponent(user) {
  return user ?
    <Link to="/new">Create New Repository</Link> :
    null
}

function constructGetDeleteComponent(user) {
  return id => {
    return user ?
      <span>
        <span style={{marginLeft: 20}}>---</span>
        <Link to={`/delete/${id}`}>delete</Link>
      </span> :
      null
  }
}

class Repos extends Component {
  componentWillMount() {
    this.props.onLoad()
  }

  render() {
    const {
      loadingRepos,
      visibleRepos,
      user,
      onSearchTermChange
    } = this.props

    if (loadingRepos) {
      return <p>loading...</p>
    }

    const getDeleteComponent = constructGetDeleteComponent(user)

    return (
      <div>
        <p>{ getCreateComponent(user) }</p>
        <DebounceInput
          debounceTimeout={300}
          placeholder="Search..."
          onChange={e => onSearchTermChange(e.target.value)} />
        <ul>
          {
            visibleRepos.map(id =>
              <li key={id} style={{margin: 5}}>
                <Link to={`/repos/${id}`}>{id}</Link>
                { getDeleteComponent(id) }
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
    visibleRepos: getFilteredResult(state.repos, state.searchTerm),
    user: state.user
  }
}

function mapDispatchToProps(dispatch) {
  return {
    onLoad: () => dispatch(fetchRepos()),
    onSearchTermChange: (text) => dispatch(setSearchTerm(text))
  }
}

const ReposComponent = connect(
  mapStateToProps,
  mapDispatchToProps
)(Repos)

export default ReposComponent
