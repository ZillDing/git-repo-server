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

import App from './App'
import Repos from './Repos'
import Repo from './Repo'
import CreateRepo from './CreateRepo'
import DeleteRepo from './DeleteRepo'

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
        <IndexRoute component={Repos}/>
        <Route path="repos" component={Repos}/>
        <Route path="repos/:id" component={Repo}/>
        <Route path="new" component={CreateRepo}/>
        <Route path="delete/:id" component={DeleteRepo}/>
      </Route>
    </Router>
  </Provider>,
  document.getElementById('root')
)
