import { connect } from 'react-redux'

import { addTrailingGit } from '../utils'
import { createNewRepo } from '../actions'

import CreateRepo from '../components/CreateRepo'

const mapStateToProps = state => {
  return {
    error: state.error,
    creatingRepo: state.creatingRepo
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onCreate: text => dispatch(createNewRepo(addTrailingGit(text)))
  }
}

const CreateRepoPage = connect(
  mapStateToProps,
  mapDispatchToProps
)(CreateRepo)

export default CreateRepoPage
