import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { ThemeProvider } from './context/ThemeContext.jsx'
import { SmoothScrollProvider } from './context/SmoothScrollContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeProvider>
      <SmoothScrollProvider>
        <App />
      </SmoothScrollProvider>
    </ThemeProvider>
  </StrictMode>,
)
