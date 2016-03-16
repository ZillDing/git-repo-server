import React from 'react'
import { connect } from 'react-redux'

import { addTrailingGit } from './utils'
import { createNewRepo } from './actions'

class CreateRepo extends React.Component {
  _getError() {
    if (this.props.error) {
      return <p style={{color: 'red'}}>Create failed.</p>
    }
  }

  _handleClick() {
    const { dispatch } = this.props
    const text = this.refs.input.value
    if (text) {
      dispatch(createNewRepo(addTrailingGit(text)))
    }
  }

  render() {
    const { creatingRepo } = this.props

    return (
      <div>
        <h3>Create a new repository</h3>
        <input
          ref="input"
          type="text"
          placeholder="Enter repository name..." />
        <button
          onClick={this._handleClick.bind(this)}
          disabled={creatingRepo}>
          Create
        </button>
        { this._getError() }
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    error: state.error,
    creatingRepo: state.creatingRepo
  }
}

const CreateRepoComponent = connect(
  mapStateToProps
)(CreateRepo)

export default CreateRepoComponent
