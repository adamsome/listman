import React from 'react'
import Starrate from 'react-minor-ui'
import './App.css'
import { ThemeProvider } from './common/theming'
import logo from './logo.svg'

const App: React.FC = () => {
  return (
    <ThemeProvider>
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.tsx</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
          <Starrate maxRating={4} />
        </header>
      </div>
    </ThemeProvider>
  )
}

export default App
