import React, { PropTypes } from 'react'

import { trimTrailingGit } from '../utils'

const DeleteRepo = ({ id, error, deletingRepo, onDelete, onCancel }) => (
  <div>
    <h3>Delete repository</h3>
    <h2>{trimTrailingGit(id)}</h2>
    <p>Are you sure about deleting this repo?</p>
    <button
      onClick={() => onDelete(id)}
      disabled={deletingRepo}
      style={{marginRight: 10}}>
      Delete
    </button>
    <button
      onClick={onCancel}
      disabled={deletingRepo}>
      Oh no! Change mind!
    </button>
    {
      error ?
        <p style={{color: 'red'}}>Delete failed.</p> :
        null
    }
  </div>
)

DeleteRepo.propTypes = {
  id: PropTypes.string.isRequired,
  error: PropTypes.any,
  deletingRepo: PropTypes.bool.isRequired,
  onDelete: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired
}

export default DeleteRepo
