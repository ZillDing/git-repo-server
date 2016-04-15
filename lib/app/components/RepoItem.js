import React from 'react'
import { Link } from 'react-router'

const RepoItem = ({ id, showDelete }) => (
  <li style={{margin: 5}}>
    <Link to={`/repo/${id}`}>{id}</Link>
    {
      showDelete ?
        <span>
          <span style={{marginLeft: 20}}>---</span>
          <Link to={`/delete/${id}`}>delete</Link>
        </span> :
        null
    }
  </li>
)

export default RepoItem
