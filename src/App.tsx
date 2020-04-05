import React, { useLayoutEffect, useState } from 'react'
import { createIndex } from './dom'
import { Overlay } from './Overlay'
import { Index } from './types'

export function App() {
  const [showOverlay, setShowOverlay] = useState(false)
  const [indexes, setIndexes] = useState<Index[] | null>(null)
  const [typed, setTyped] = useState('')

  useLayoutEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === '?' && e.altKey && e.shiftKey) {
        setIndexes(createIndex())
        setTyped('')
        setShowOverlay(true)
      } else if (e.key.length === 1) {
        setTyped(typed + e.key.toLowerCase())
      } else if (e.key === 'Backspace') {
        setTyped(typed.slice(0, -1))
      } else if (e.key === 'Escape') {
        setShowOverlay(false)
      }
    }
    function onKeyUp(e: KeyboardEvent) {
      if (typed.length >= 0 && e.key === 'Enter') {
        const exactMatch = indexes?.find((idx) => idx.token === typed)
        if (!exactMatch) {
          console.log('TODO: Show help', typed)
          return
        }

        exactMatch.el.dispatchEvent(new MouseEvent('click'))
      }
    }
    function onBlur() {
      setShowOverlay(false)
    }
    document.addEventListener('keydown', onKeyDown, true)
    document.addEventListener('keyup', onKeyUp, true)
    document.addEventListener('blur', onBlur, true)

    return () => {
      document.removeEventListener('keydown', onKeyDown)
      document.removeEventListener('keyup', onKeyUp)
      document.removeEventListener('blur', onBlur)
    }
  }, [typed])

  return <Overlay show={showOverlay} indexes={indexes} typed={typed} />
}
