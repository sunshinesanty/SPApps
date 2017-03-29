import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import {Provider} from 'react-redux'
import MyStore from './store'

const Storeinstance = new MyStore();

ReactDOM.render(
  <Provider store={Storeinstance}>
  <App />
  </Provider>,
  document.getElementById('root') as HTMLElement
);
