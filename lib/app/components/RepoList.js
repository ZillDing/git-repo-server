import React, { Component } from 'react'

import RepoItem from './RepoItem'

const RepoList = ({ repos, isLoggedIn }) => (
  <ul>
    {
      repos.map(id =>
        <RepoItem
          key={id}
          id={id}
          showDelete={isLoggedIn} />
      )
    }
  </ul>
)

export default RepoList
