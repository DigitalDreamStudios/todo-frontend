import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import axios from 'axios'

axios.defaults.baseURL = import.meta.env.VITE_API || "https://todo-api.evildev.link/"

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
