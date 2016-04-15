import React from 'react'
import { Router, Route, IndexRoute } from 'react-router'

import App from './components/App'
import Container from './components/Container'
import Repos from './components/Repos'
import Repo from './components/Repo'
import CreateRepo from './components/CreateRepo'
import DeleteRepo from './components/DeleteRepo'
import Login from './components/Login'

const Routes = ({ history }) => (
  <Router history={history}>
    <Route path="/" component={App}>
      <Route component={Container}>
        <IndexRoute component={Repos}/>
        <Route path="repo/:id" component={Repo}/>
        <Route path="new" component={CreateRepo}/>
        <Route path="delete/:id" component={DeleteRepo}/>
      </Route>
      <Route path="/login" component={Login}/>
    </Route>
  </Router>
)

export default Routes
