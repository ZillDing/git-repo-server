import { connect } from 'react-redux'
import { push } from 'react-router-redux'

import { deleteRepo } from '../actions'

import DeleteRepo from '../components/DeleteRepo'

const mapStateToProps = (state, ownProps) => {
  return {
    id: ownProps.params.id,
    error: state.error,
    deletingRepo: state.deletingRepo
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onDelete: id => dispatch(deleteRepo(id)),
    onCancel: () => dispatch(push('/'))
  }
}

const DeleteRepoPage = connect(
  mapStateToProps,
  mapDispatchToProps
)(DeleteRepo)

export default DeleteRepoPage
