import React from 'react'
import { Router, Route, IndexRoute } from 'react-router'

import App from './components/App'
import Container from './components/Container'
import ReposPage from './containers/ReposPage'
import RepoPage from './containers/RepoPage'
import CreateRepoPage from './containers/CreateRepoPage'
import DeleteRepoPage from './containers/DeleteRepoPage'
import LoginPage from './containers/LoginPage'

const Routes = ({ history }) => (
  <Router history={history}>
    <Route path="/" component={App}>
      <Route component={Container}>
        <IndexRoute component={ReposPage}/>
        <Route path="repo/:id" component={RepoPage}/>
        <Route path="new" component={CreateRepoPage}/>
        <Route path="delete/:id" component={DeleteRepoPage}/>
      </Route>
      <Route path="/login" component={LoginPage}/>
    </Route>
  </Router>
)

export default Routes
