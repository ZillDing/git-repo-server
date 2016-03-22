import React from 'react'

import Status from './Status'

const Container = ({ children }) => {
  return (
    <div>
      <Status />
      { children }
    </div>
  )
}

export default Container
