import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import { store } from './configureStore.js';
import './assets/CSS/index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root'));

serviceWorker.unregister();
