
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';

const loggerMiddleware = createLogger();
// Centralized application state
// For more information visit http://redux.js.org/
const initialState = { count: 0 };

const store = createStore((state = initialState, action) => {
  // TODO: Add action handlers (aka "reducers")
  switch (action.type) {
    case 'COUNT':
      return { ...state, count: (state.count) + 1 };
    default:
      return state;
  }
}, compose(
  applyMiddleware(thunk, loggerMiddleware),
  window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__() : f => f
));

export default store;
