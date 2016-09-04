import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {Editor, EditorState, Entity, RichUtils, convertFromRaw, convertToRaw} from 'draft-js';
import {IEditorState } from '../interfaces/IEditorInterfaces';
import { EditorLink } from './addLink';
import { EditorStyles } from './editorStyles';
import { CommonHelperFunction } from './commonHelper';

export class CustomizableEditor extends React.Component<any, IEditorState> {
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
    if (newState) {
      console.log(convertToRaw(newState.getCurrentContent()))
      this.onChange(newState);
      return true;
    }
    return false;
  }
  setEditorState = (editorState: EditorState) => {
    this.onChange(editorState);
  }
  onBoldClick = (e: React.FormEvent) => {
    this.onChange(RichUtils.toggleInlineStyle(this.state.editorState, 'BOLD'));
  }
  SetLink = (urlValue: string) => {
    let {editorState} = this.state;
    const entityKey = Entity.create('LINK', 'MUTABLE', { url: urlValue });
    this.onChange(RichUtils.toggleLink(editorState, editorState.getSelection(), entityKey));
  }
  removeLink = () => {
    let {editorState} = this.state;
    const selection = editorState.getSelection();
    if (!selection.isCollapsed()) {
      this.onChange(RichUtils.toggleLink(editorState, selection, null));
    }
  }
  isSelectionActive = (): boolean => {
    const {editorState} = this.state;
    const selection = editorState.getSelection();
    if (!selection.isCollapsed()) {
      return true;
    }
    return false;
  }
  render() {
    const {editorState} = this.state;

    return <div style={EditorStyles.EditorContainerStyle.root}>
      <button onClick={this.onBoldClick}>B</button>
      <EditorLink SetEditorState={this.setEditorState} IsSelectionActive={this.isSelectionActive} SetLink={this.SetLink} RemoveLink={this.removeLink} />
      <div style={EditorStyles.EditorContainerStyle.editor} onClick={this.onFocus}>
        <Editor
          editorState={editorState}
          onChange={this.onChange}
          handleKeyCommand={this.handleKeyCommand}
          placeholder="What's on your mind..."
          ref="editor"
          />
      </div>
      <input type="button" onClick={this.onLogState} value="Log State" />
    </div>;
  }
}
