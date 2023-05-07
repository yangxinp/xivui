function padString (string: string | number, length: number, padString: string) {
  length >> 0
  string = String(string)
  if (string.length > length) return string
  
  length = length - string.length
  if (length > padString.length) {
    padString += padString.repeat(length / padString.length)
  }
  return padString.slice(0, length) + string
}

export default (n: string | number, length = 2) => padString(n, length, '0')