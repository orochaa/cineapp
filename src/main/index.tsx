import React from 'react'
import ReactDOM from 'react-dom/client'
import { Router } from './routes/router'
import './global.css'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Router />
  </React.StrictMode>
)
