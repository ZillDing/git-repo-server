import React from 'react'
import ReactMarkdown from 'react-markdown'

const Readme = ({ content }) => (
  content.trim() ?
    <div>
      <p>README.md:</p>
      <ReactMarkdown source={content} />
    </div> :
    <p>Cannot find `README.md` file.</p>
)

export default Readme
