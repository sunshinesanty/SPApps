import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {AppState} from './store/ScoreState'
import {TimerView} from './components/timerView'

const appState =  new AppState();
ReactDOM.render(<TimerView appState={appState} />, document.getElementById('root'));

