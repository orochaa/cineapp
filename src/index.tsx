import React from 'react'
import ReactDOM from 'react-dom/client'
import './global.css'
import { Router } from './router'

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
ReactDOM.createRoot(document.querySelector('#root')!).render(
  <React.StrictMode>
    <Router />
  </React.StrictMode>
)
