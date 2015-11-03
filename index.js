/*
 * Integrate the Socket.io server and the Redux
 * state container (store)
 */

import makeStore from './src/store';
import startServer from './src/server';

const initialData = require('./entries.json');

export const store = makeStore();

//  Pass the store to the server
startServer(store);

// Load initial data
store.dispatch({
  type    : 'SET_ENTRIES',
  entries : initialData
});

// Away we go!
store.dispatch({type : 'NEXT'});
