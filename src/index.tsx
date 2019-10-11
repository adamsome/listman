import { ConnectedRouter } from 'connected-react-router'
import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import App from './App'
import './index.css'
import * as serviceWorker from './serviceWorker'
import configureStore from './store/configure-store'
import history from './store/history'

const global = globalThis as any
global.log = (msg: any, ...optionalParams: any[]) => {
  if (process.env.NODE_ENV !== 'production') {
    // tslint:disable-next-line: no-console
    console.log(msg, ...optionalParams)
  }
}

const store = configureStore({}, history)

const appRoot = (
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <App />
    </ConnectedRouter>
  </Provider>
)

ReactDOM.render(appRoot, document.getElementById('root'))

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
