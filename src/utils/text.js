export function titleCase(str) {
  return str
    .split('-')
    .map(word => capitalize(word))
    .join(' ')
}

export function capitalize(str) {
  return str[0].toUpperCase() + str.slice(1)
}
