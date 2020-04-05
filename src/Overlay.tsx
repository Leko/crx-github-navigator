import React from 'react'
import { KeyAnnotation } from './KeyAnnotation'
import { Index } from './types'

export function Overlay(props: {
  show: boolean
  indexes: Index[] | null
  typed: string
}) {
  const { show, indexes, typed } = props
  if (!show || !indexes) {
    return null
  }
  return (
    <div style={{ display: show ? 'block' : 'none' }}>
      {indexes.map(({ rect, token }) => (
        <KeyAnnotation
          key={token}
          targetRect={rect}
          token={token}
          highlight={token.startsWith(typed) ? typed : ''}
        />
      ))}
    </div>
  )
}
