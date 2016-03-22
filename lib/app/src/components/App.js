import React, { Component } from 'react'
import { Link } from 'react-router'

require('../../github.css')
import Status from './Status'

const App = ({ children }) => {
  return (
    <div>
      <h2><Link to="/">Repos</Link></h2>
      { children }
    </div>
  )
}

export default App
