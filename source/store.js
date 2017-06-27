import {createStore, applyMiddleware} from 'redux';
import {createLogger} from 'redux-logger';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import reducer from './reducer';

// function logger(store){
//   return function(next){
//     return function(action){
//       //algo
//     }
//   }
// } Esto es lo mismo que lo de abajo

const logger = store => next =>(action) => {
  console.group('logger');
  console.debug('estado actual', store.getState());
  console.log('action ', action);
  const result= next(action);
  console.debug('estado Nuevo', store.getState());
  console.groupEnd('logger');
  return result;
}

const store = createStore(
  reducer,
  composeWithDevTools(
    applyMiddleware(
      createLogger(),
      thunk,
    ),
  ),
);

export default store;
