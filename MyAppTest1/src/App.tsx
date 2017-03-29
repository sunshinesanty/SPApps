import * as React from 'react';
import './App.css';
import Shelf from './components/shelf'
//import Cart from './components/cartContainer'

const logo = require('./logo.svg');

class App extends React.Component<null, null> {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <p className="App-intro">
          <Shelf />
        </p>
      </div>
    );
  }
}

export default App;
