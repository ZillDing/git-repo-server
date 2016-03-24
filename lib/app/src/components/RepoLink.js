import React, { Component, PropTypes } from 'react'

const getRepoLink = type => {
  return id => {
    switch (type) {
      case 'ssh':
        return `git@zubuntu.ddns.net:/opt/git/${id}`
      default:
        return `http://zubuntu.ddns.net/git/${id}`
    }
  }
}

class RepoLink extends Component {
  render() {
    const { id, displayLinkType, onLinkTypeChange } = this.props
    const repoLink = getRepoLink(displayLinkType)(id)

    return (
      <div>
        <select
          value={displayLinkType}
          onChange={e => onLinkTypeChange(e.target.value)}>
          <option value="http">http</option>
          <option value="ssh">ssh</option>
        </select>
        <span style={{margin: 5}}>:</span>
        <input
          type="text"
          value={repoLink}
          readOnly
          onFocus={e => e.target.select()} />
      </div>
    )
  }
}

RepoLink.propTypes = {
  id: PropTypes.string.isRequired,
  displayLinkType: PropTypes.oneOf(['http', 'ssh']).isRequired,
  onLinkTypeChange: PropTypes.func.isRequired
}

export default RepoLink
