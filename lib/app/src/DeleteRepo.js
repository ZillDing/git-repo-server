import React from 'react'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'

import { deleteRepo } from './actions'

class DeleteRepo extends React.Component {
  constructor(props) {
    super(props)
    this._handleClick = this._handleClick.bind(this)
    this._handleCancelClick = this._handleCancelClick.bind(this)
  }

  _getError() {
    if (this.props.error) {
      return <p style={{color: 'red'}}>Delete failed.</p>
    }
  }

  _handleClick() {
    const { dispatch, id } = this.props
    dispatch(deleteRepo(id))
  }

  _handleCancelClick() {
    const { dispatch } = this.props
    dispatch(push('/repos'))
  }

  render() {
    const { id, deletingRepo } = this.props

    return (
      <div>
        <h3>Delete repository</h3>
        <h2>{id}</h2>
        <p>Are you sure about deleting this repo?</p>
        <button
          onClick={this._handleClick}
          disabled={deletingRepo}
          style={{marginRight: 10}}>
          Delete
        </button>
        <button
          onClick={this._handleCancelClick}
          disabled={deletingRepo}>
          Oh no! Change mind!
        </button>
        { this._getError() }
      </div>
    )
  }
}

function mapStateToProps(state, ownProps) {
  return {
    id: ownProps.params.id,
    error: state.error,
    deletingRepo: state.deletingRepo
  }
}

const DeleteRepoComponent = connect(
  mapStateToProps
)(DeleteRepo)

export default DeleteRepoComponent
