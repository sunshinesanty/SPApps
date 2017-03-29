import * as React from 'react';
import './App.css';
import Chat from './components/chat';

const logo = require('./logo.svg');

class App extends React.Component<null, null> {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <Chat chatsperpage={10} lastmodifieddate={(new Date()).toString()} />
      </div>
    );
  }
}

export default App;
