import fuzzy from 'fuzzy'

export function addTrailingGit(str) {
  if (str.endsWith('.git')) {
    return str
  } else {
    return `${str}.git`
  }
}

export function trimTrailingGit(str) {
  if (str.endsWith('.git')) {
    return str.substr(0, str.length - 4)
  } else {
    return str
  }
}

export function getFilteredResult(array, searchTerm) {
  const list = array.map(el => trimTrailingGit(el))
  const results = fuzzy.filter(searchTerm, list)
  return results.map(el => el.string)
}
