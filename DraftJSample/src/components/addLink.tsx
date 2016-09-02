import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {Editor, Entity, CompositeDecorator, RichUtils} from 'draft-js';
import { EditorStyles } from './editorStyles';
import { ILinkProps, ILinkState } from '../interfaces/IEditorInterfaces';

export class EditorLink extends React.Component<ILinkProps, ILinkState>{
    constructor(props: ILinkProps) {
        super(props);
        this.state = { urlValue: "", showURLInput: false };
    }
    promptForLink = (e: React.FormEvent) => {
        e.preventDefault();
        const {editorState} = this.props;
        const selection = editorState.getSelection();
        if (!selection.isCollapsed()) {
            this.setState({
                showURLInput: true,
                urlValue: '',
            }, () => {
                setTimeout(() => (this.refs["url"] as HTMLInputElement).focus(), 0);
            });
        }
    }
    onURLChange = (e: React.FormEvent) => {
        let {urlValue, showURLInput} = this.state;
        urlValue = (e.target.value as string);
        this.setState({ urlValue, showURLInput });
    }
    confirmLink = (e: KeyboardEvent) => {
        e.preventDefault();
        let {editorState} = this.props;
        let {urlValue, showURLInput} = this.state;
        urlValue = (this.refs["url"] as HTMLInputElement).value;
        showURLInput = false;
        const entityKey = Entity.create('LINK', 'MUTABLE', { url: urlValue });
        editorState = RichUtils.toggleLink(editorState, editorState.getSelection(), entityKey);
        this.props.setEditorState(editorState);
        this.setState({ urlValue, showURLInput });
    }
    onLinkInputKeyDown = (e: KeyboardEvent) => {
        if (e.which === 13) {
            this.confirmLink(e);
        }
    }
    removeLink = (e: React.FormEvent) => {
        e.preventDefault();
        let {editorState} = this.props;
        const selection = editorState.getSelection();
        if (!selection.isCollapsed()) {
            editorState = RichUtils.toggleLink(editorState, selection, null);
            this.props.setEditorState(editorState);
        }
    }
    render() {
        let urlInput: any;
        if (this.state.showURLInput) {
            urlInput =
                <div style={EditorStyles.EditorLinkstyles.urlInputContainer}>
                    <input
                        onChange={this.onURLChange}
                        ref="url"
                        style={EditorStyles.EditorLinkstyles.urlInput}
                        type="text"
                        value={this.state.urlValue}
                        onKeyDown={this.onLinkInputKeyDown}
                        />
                    <button onMouseDown={this.confirmLink}>
                        Confirm
                    </button>
                </div>;
        }
        return <div>
            <div style={EditorStyles.EditorLinkstyles.buttons}>
                <button
                    onMouseDown={this.promptForLink}
                    style={{ marginRight: 10 }}>
                    Add Link
                </button>
                <button onMouseDown={this.removeLink}>
                    Remove Link
                </button>
            </div>
            { urlInput }
        </div>;
    }
}