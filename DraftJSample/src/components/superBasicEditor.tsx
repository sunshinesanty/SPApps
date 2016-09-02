import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {Editor, EditorState, convertToRaw, convertFromRaw, RichUtils} from 'draft-js';
import { IEditorState } from '../interfaces/IEditorInterfaces';
import { EditorStyles } from './editorStyles';
import { CommonHelperFunction } from './commonHelper';

export class SuperSimpleEditor extends React.Component<any, IEditorState>{
    constructor(props: any) {
        super(props);
        this.state = { editorState: EditorState.createEmpty() };
    }
    onChange = (sseState: EditorState) => {
        this.setState({ editorState: sseState })
    };
    onHandleKeyCommand = (command: string) => {
        const newState = RichUtils.handleKeyCommand(this.state.editorState, command);
        if (newState) {
            this.onChange(newState);
            return true;
        }
        return false;
    }
    onBold = () => {
        this.onChange(RichUtils.toggleInlineStyle(this.state.editorState, 'BOLD'));
    };
    onFocus = () => {
        (this.refs["sseEditor"] as Editor).focus();
    }
    onLogState = () => {
        console.log(this.state.editorState.toJS());
    }
    render() {
        return <div style={EditorStyles.EditorContainerStyle.root}>
            <button onClick={this.onBold}>B</button>
            <div style={EditorStyles.EditorContainerStyle.editor} onClick={this.onFocus}>
                <Editor placeholder="What's On your mind..." 
                        editorState={this.state.editorState} 
                        onChange={this.onChange} 
                        handleKeyCommand={this.onHandleKeyCommand}
                        ref="sseEditor">
                </Editor>
            </div>
            <input type="button" onClick={this.onLogState} value="Log State" />
        </div>
    }
}