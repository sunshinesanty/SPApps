import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {Editor, Entity, CompositeDecorator, RichUtils} from 'draft-js';
import { EditorStyles } from './editorStyles';
import { ILinkProps, ILinkState } from '../interfaces/IEditorInterfaces';

export class EditorLink extends React.Component<ILinkProps, ILinkState>{
    constructor(props: ILinkProps) {
        super(props);
    }
    promptForLink = (e: React.FormEvent) => {
        e.preventDefault();
        if (this.props.IsSelectionActive()) {
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
        let {urlValue, showURLInput} = this.state;
        urlValue = (this.refs["url"] as HTMLInputElement).value;
        showURLInput = false;                
        this.setState({ urlValue, showURLInput });
        this.props.SetLink(urlValue, showURLInput);
    }
    onLinkInputKeyDown = (e: KeyboardEvent) => {
        if (e.which === 13) {
            this.confirmLink(e);
        }
    }
    removeLink = (e: React.FormEvent) => {
        e.preventDefault();
        this.props.RemoveLink();
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