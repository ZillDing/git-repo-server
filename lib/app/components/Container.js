import React from 'react'

import Status from '../containers/Status'

const Container = ({ children }) => {
  return (
    <div>
      <Status/>
      { children }
    </div>
  )
}

export default Container
