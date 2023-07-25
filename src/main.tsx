import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import axios from 'axios'
import { AuthProvider } from './context/AuthContext'
import { BrowserRouter } from 'react-router-dom'

axios.defaults.baseURL = import.meta.env.VITE_API || 'http://localhost:3000'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <App />
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
)
