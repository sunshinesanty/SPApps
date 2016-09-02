import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {Editor, EditorState, RichUtils} from 'draft-js';
import {IEditorState } from '../interfaces/IEditorInterfaces';

export class CustomizableEditor extends React.Component<{}, {}> {
  public state: IEditorState;
  constructor(props: any) {
    super(props);
    this.state = { editorState: EditorState.createEmpty() };
  }
  onChange = (editorState: EditorState) => this.setState({ editorState });
  onFocus = () => {
    (this.refs["editor"] as Editor).focus();
  }
  onLogState = () => {
    console.log(this.state.editorState.toJS());
  }
  handleKeyCommand = (command: string) => {
    const newState = RichUtils.handleKeyCommand(this.state.editorState, command);
    if (newState) {
      this.onChange(newState);
      return true;
    }
    return false;
  }
  onBoldClick = () => {
    this.onChange(RichUtils.toggleInlineStyle(this.state.editorState, 'BOLD'));
  }
  render() {
    const {editorState} = this.state;
    return <div style={this.EditorStyles.root}>
      <div style={this.EditorStyles.editor} onClick={this.onFocus}>
      <button onClick={this.onBoldClick}>B</button>
        <Editor
          editorState={editorState}
          onChange={this.onChange}
          handleKeyCommand={this.handleKeyCommand}
          placeholder="What's on your mind..."
          ref="editor" />
      </div>
      <input type="button" onClick={this.onLogState} value="Log State" />
    </div>;
  }

  public EditorStyles = {
    root: {
      fontFamily: '\'Helvetica\', sans-serif',
      padding: 20,
      width: 600,
    },
    editor: {
      border: '1px solid #ccc',
      cursor: 'text',
      minHeight: 80,
      padding: 10,
    },
    button: {
      marginTop: 10,
      textAlign: 'center',
    },
  };
}