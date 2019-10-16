import { routerMiddleware } from 'connected-react-router'
import { History } from 'history'
import { AnyAction, applyMiddleware, compose, createStore, Store } from 'redux'
import createReducer, { AppState } from './root'

const nonProd = () => process.env.NODE_ENV !== 'production'

export default function configureStore(
  initialState: Partial<AppState> = {},
  history: History<any>
): Store<AppState, AnyAction> {
  const middlewares = [routerMiddleware(history)]

  if (nonProd) {
    const { createLogger } = require(`redux-logger`)
    const logger = createLogger({
      collapsed: (_getState: any, _action: any, logEntry: any) =>
        !logEntry.error,
    })
    middlewares.push(logger)
  }

  const composeEnhancers = makeComposeEnhancers()
  const enhancers = [applyMiddleware(...middlewares)]

  return createStore(
    createReducer(),
    initialState,
    composeEnhancers(...enhancers)
  )
}

/**
 * If Redux Dev Tools installed, use its `compose` to enable.
 */
const makeComposeEnhancers = (): typeof compose =>
  nonProd &&
  typeof window === 'object' &&
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    : compose
