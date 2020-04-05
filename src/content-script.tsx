import React from 'react'
import { render } from 'react-dom'
import { App } from './App'

import './css/overlay.css'

const root = document.createElement('div')
root.classList.add('crx-gh-keys-root')
document.body.append(root)

render(<App />, root)
