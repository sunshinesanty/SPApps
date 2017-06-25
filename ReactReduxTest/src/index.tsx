import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Store, createStore } from 'redux';
import { Provider } from 'react-redux';
import rootReducer from './main/reducer';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import './index.css';

const initialState = {};

const store: Store<any> = createStore(rootReducer, initialState);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root') as HTMLElement
);
registerServiceWorker();
