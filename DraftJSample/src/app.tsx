import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {CustomizableEditor} from './components/editor';
import {SuperSimpleEditor} from './components/superBasicEditor';
import {ControlledInput} from './components/controledInput';

ReactDOM.render(
  <div>
    <h3>Draft JS Editor sample</h3>
    <CustomizableEditor />

    <h3>Draft JS Super basic sample</h3>
    <SuperSimpleEditor />
  </div>,
  document.getElementById('editorApp')
);