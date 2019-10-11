import { routerMiddleware } from 'connected-react-router'
import { History } from 'history'
import { AnyAction, applyMiddleware, compose, createStore, Store } from 'redux'
import createReducer, { State } from './root'

export default function configureStore(
  initialState: Partial<State> = {},
  history: History<any>
): Store<State, AnyAction> {
  const composeEnhancers = getComposeEnhancers()
  const middlewares = [routerMiddleware(history)]
  const enhancers = [applyMiddleware(...middlewares)]

  return createStore(
    createReducer(),
    initialState,
    composeEnhancers(...enhancers)
  )
}

/**
 * If Redux Dev Tools installed, enable.
 */
const getComposeEnhancers = (): typeof compose =>
  process.env.NODE_ENV !== 'production' &&
  typeof window === 'object' &&
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    : compose
