import * as React from 'react';
import './App.css';
// import DWSlider from './components/sliderContainer';
// import Data from './store/data';

const logo = require('./logo.svg');
interface DataInt {
  a: number;
  b: number;
}

class Calc implements DataInt {
  a: number = 0;
  b: number = 0;
  constructor(data: DataInt) {
    Object.assign(this, data);
  }
  multiply = (): number => this.a * this.b;
}

const data: DataInt[] = [
  { a: 3, b: 4 },
  { a: 4, b: 5 }
];

class App extends React.Component<{}, null> {
  dataArray: Calc[] = [];
  constructor(props: any) {
    super(props);
    this.dataArray = data.map<Calc>((value: DataInt) => new Calc(value));
  }
  render() {
    const renderdata = this.dataArray.map((dataobj: Calc) =>
      <div>{dataobj.a} * {dataobj.b} = {dataobj.multiply()} </div>);
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
          {renderdata}
      </div>
    );
  }
}

export default App;
