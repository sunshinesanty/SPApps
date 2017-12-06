import * as React from 'react';
import './App.css';
import { SliderData } from './interfaces';
import Slider from './slider';

const logo = require('./logo.svg');
const data: SliderData[] = [];
class App extends React.Component<{}, null> {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <p className="App-intro">
          <Slider data={data} />
        </p>
      </div>
    );
  }
}

export default App;
