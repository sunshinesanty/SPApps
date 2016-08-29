import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {CustomizableEditor} from './components/editor'
import {ControlledInput} from './components/controledInput'

ReactDOM.render(
  <div>
    <h3>Draft JS Editor sample</h3>
    <CustomizableEditor />
  </div>,
  document.getElementById('editorApp')
);