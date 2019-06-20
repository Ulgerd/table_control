// import {compose, createStore} from 'redux';
// import persistState from 'redux-sessionstorage'
// import { rootReducer } from './reducers/rootReducer.js';
//
// const createPersistentStore = compose(
//   persistState()
// )(createStore)
//
// export const store = createPersistentStore(rootReducer, {})

import { createStore } from 'redux';
import { rootReducer } from './reducers/rootReducer'

export const store = createStore( rootReducer );
