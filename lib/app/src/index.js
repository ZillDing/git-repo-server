import React from 'react'
import { render } from 'react-dom'
import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import createLogger from 'redux-logger'
import { Provider } from 'react-redux'
import { Router, Route, browserHistory, IndexRoute } from 'react-router'
import { syncHistory } from 'react-router-redux'
import reducers from './reducers'

const logger = createLogger()

import App from './components/App'
import Container from './components/Container'
import Repos from './components/Repos'
import Repo from './components/Repo'
import CreateRepo from './components/CreateRepo'
import DeleteRepo from './components/DeleteRepo'
import Login from './components/Login'

// Sync dispatched route actions to the history
const reduxRouterMiddleware = syncHistory(browserHistory)
const store = createStore(
  reducers,
  applyMiddleware(reduxRouterMiddleware, thunk, logger)
)

// Required for replaying actions from devtools to work
reduxRouterMiddleware.listenForReplays(store)

render(
  <Provider store={store}>
    <Router history={browserHistory}>
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
  </Provider>,
  document.getElementById('root')
)
