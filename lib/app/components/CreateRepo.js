import React, { Component, PropTypes } from 'react'

class CreateRepo extends Component {
  _getError() {
    if (this.props.error) {
      return <p style={{color: 'red'}}>Create failed.</p>
    }
  }

  _handleClick() {
    const text = this.refs.input.value.trim()
    if (text) {
      this.props.onCreate(text)
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
        <span>.git</span>
        <button
          onClick={this._handleClick.bind(this)}
          disabled={creatingRepo}
          style={{marginLeft: 10}}>
          Create
        </button>
        { this._getError() }
      </div>
    )
  }
}

CreateRepo.propTypes = {
  error: PropTypes.any,
  creatingRepo: PropTypes.bool.isRequired,
  onCreate: PropTypes.func.isRequired
}

export default CreateRepo
