function getClickable() {
  return (
    Array.from(document.querySelectorAll('a'))
      // https://stackoverflow.com/questions/19669786/check-if-element-is-visible-in-dom
      .filter((el) => el.offsetParent !== null)
      .filter((el) => !!el.textContent?.trim())
  )
}

export function createIndex() {
  const clickables = getClickable()
  const wordMap = new Map()
  const suffixCache = new Map()

  function getSuffix(token: string) {
    const index = suffixCache.get(token) || 0
    suffixCache.set(token, index + 1)
    return String.fromCharCode(97 + index + 1)
  }

  return clickables.map((el) => {
    const text = el.textContent!.trim().toLowerCase() || ''
    let token = text[0]
    while (wordMap.has(token)) {
      const suffix =
        text.slice(token.length, token.length + 1) || getSuffix(token)
      token += suffix
    }
    wordMap.set(token, 1)

    return {
      token: token.toLowerCase(),
      el,
      rect: el.getBoundingClientRect(),
    }
  })
}
