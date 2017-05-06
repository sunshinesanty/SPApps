import * as React from 'react';
import './App.css';
import { observer, inject } from 'mobx-react';
import { observable, action } from 'mobx';
import DevTools from 'mobx-react-devtools';

const logo = require('./logo.svg');

@inject('storeName') @observer
class App extends React.Component<{}, {}> {
  @observable user = 'lax';
  @observable favGame = 'Cricket';

  @action('update details')
  upadeDetails = () => {
    if (this.user === 'lax') {
      this.user = 'laxmi';
      this.favGame = 'T20 Cricket';
    } else {
      this.user = 'lax';
      this.favGame = 'Cricket';
    }
  }

  render() {
    return (
      <div className="App">
        <DevTools />
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <p className="App-intro">
          My name is {this.user} and my fav game {this.favGame};
        </p>
        <button onClick={this.upadeDetails}>Update Me</button>
      </div>
    );
  }
}

export default App;
