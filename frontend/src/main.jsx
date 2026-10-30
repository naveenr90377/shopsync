// Import React and the tool to render it into the DOM (the HTML page)
import React from 'react'
import ReactDOM from 'react-dom/client'
// Import our main App component
import App from './App.jsx'
// Import our CSS (which loads Tailwind)
import './index.css'

// Find the <div id="root"> in index.html
const rootElement = document.getElementById('root')

// Render the App component inside that div
ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)