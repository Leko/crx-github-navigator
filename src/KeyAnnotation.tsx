import React from 'react'

export function KeyAnnotation(props: {
  targetRect: DOMRect
  token: string
  highlight: string
}) {
  const { targetRect, token, highlight } = props
  const { top: offsetTop, left: offsetLeft } = targetRect
  const top = Math.max(offsetTop - 10, 0)
  const left = Math.max(offsetLeft - 10, 0)
  if (highlight) {
    return (
      <span
        key={`${token},${highlight}`}
        className={
          `crx-gh-keys-key shake-vertical ` +
          (highlight === token ? 'exact-match' : 'partial-match')
        }
        style={{ top, left }}
      >
        <span className="crx-gh-keys-highlight">{highlight}</span>
        {token.slice(highlight.length)}
      </span>
    )
  } else {
    return (
      <span className="crx-gh-keys-key" style={{ top, left }}>
        {token}
      </span>
    )
  }
}
