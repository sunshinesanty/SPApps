import * as React from 'react';
import './App.css';
import { AppState, Payload } from './common/interfaces';
import InputForm from './components/InputForm';
import { RenderString } from './components/StringCompare';
import dataApi from './api/fetchData';
import config from './common/config';

class App extends React.Component<{}, AppState> {
  constructor(props: any) {
    super(props);
    this.state = { isLoading: true, ResutIdx: [], data: { SourceString: '', SubString: '' } };
  }

  findSubstringIndices = async (inputData: Payload) => {
    try {
      const startIndices: number[] =
        await dataApi.postData(config.apiEndpoints.compareString, inputData);
      this.setState({ ResutIdx: startIndices, isLoading: false, data: inputData });
    } catch (e) {
      this.setState({ ResutIdx: [], isLoading: false, data: inputData });
    }
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2>Find Sub String Indices</h2>
        </div>
        <div className="Container">
          <InputForm onSubmitData={this.findSubstringIndices} />
        </div>
        <div>
          <RenderString dataCompared={this.state.data} startIndices={this.state.ResutIdx} />
        </div>
      </div>
    );
  }
}

export default App;
