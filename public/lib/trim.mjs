export default function trim(path='') {
  return path === '/'
    ? '/'
    : path.replace(/^\/|\/$/g, '')
}