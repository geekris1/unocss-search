export function useHightlight() {

  function buildNext(pattern: string): number[] {
    const len = pattern.length
    const next = new Array(len).fill(0)
    let i = 1
    let j = 0
    while (i < len) {
      if (pattern[i] === pattern[j])
        next[i++] = ++j
      else if (j > 0)
        j = next[j - 1]
      else i++
    }
    return next
  }

  function kmp(text: string, pattern: string): number {
    const n = text.length
    const m = pattern.length
    if (m === 0)
      return -1
    const next = buildNext(pattern)
    let i = 0
    let j = 0
    while (i < n) {
      if (text[i] === pattern[j]) {
        i++
        j++
        if (j === m) return i - m
      }
      else if (j > 0)  j = next[j - 1]
      else i++
      
    }
    return -1
  }

  function highlight(text: string, pattern: string): string {
    const pos = kmp(text, pattern)
    if (pos === -1)
      return text
    const len = pattern.length
    return `
          ${text.slice(0, pos)}
          <span style="background-color: yellow">
          ${text.slice(pos, pos + len)}</span>
          ${highlight(text.slice(pos + len), pattern)}
         `
  }

  return {
    kmp,
    highlight
  }
}
