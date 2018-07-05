export default function keyMirror (obj) {
  const ret = {}
  let key
  for (key in obj) {
    if (!obj.hasOwnProperty(key)) {
      continue
    }
    ret[key] = key
  }
  return ret
}
