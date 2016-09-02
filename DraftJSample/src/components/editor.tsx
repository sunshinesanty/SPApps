import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {Editor, EditorState, RichUtils, convertFromRaw, convertToRaw} from 'draft-js';
import {IEditorState } from '../interfaces/IEditorInterfaces';
import { EditorStyles } from './editorStyles';
import { CommonHelperFunction } from './commonHelper';

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
    console.log(convertToRaw(this.state.editorState.getCurrentContent()));
    const newState = RichUtils.handleKeyCommand(this.state.editorState, command);
    console.log(convertToRaw(newState.getCurrentContent()))
    if (newState) {
      this.onChange(newState);
      return true;
    }
    return false;
  }
<<<<<<< HEAD
  onBoldClick = () => {
    this.onChange(RichUtils.toggleInlineStyle(this.state.editorState, 'BOLD'));
=======
  onBoldClick = (e: React.FormEvent) => {
    e.preventDefault();
    const {editorState} = this.state;
    console.log(convertToRaw(editorState.getCurrentContent()));
    const newState = RichUtils.toggleInlineStyle(editorState, 'UNDERLINE');
    console.log(convertToRaw(newState.getCurrentContent()))
    this.onChange(newState);
>>>>>>> ead2838bcaf036cf68f640f393628b143ee9d680
  }
  enableMutableEntity = (e: React.FormEvent) => {
    e.preventDefault();
    const {editorState} = this.state;
    const currentContent = convertToRaw(editorState.getCurrentContent());
    currentContent.blocks[0].entityRanges.
    //EditorState.forceSelection(editorState, new Selection().addRange(new Range().setStart))
  }
  render() {
    const {editorState} = this.state;
<<<<<<< HEAD
    return <div style={this.EditorStyles.root}>
      <div style={this.EditorStyles.editor} onClick={this.onFocus}>
      <button onClick={this.onBoldClick}>B</button>
=======
    return <div style={EditorStyles.EditorContainerStyle.root}>
      <div style={EditorStyles.EditorContainerStyle.editor} onClick={this.onFocus}>
        <button onClick={this.onBoldClick}>U</button>
        <button>Mutable Entity for first 2 chars</button>
>>>>>>> ead2838bcaf036cf68f640f393628b143ee9d680
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
}
