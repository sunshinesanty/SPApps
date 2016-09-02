import { EditorState } from 'draft-js';

export interface IEditorState {
    editorState: EditorState;
}

//Controlled input sample
export interface ICtrlInpState {
    value:string;
}

export interface ILinkProps {
    setEditorState: (editorState: EditorState) => void;  
    editorState: EditorState;  
} 

export interface ILinkState {
    urlValue: string;    
    showURLInput: boolean;
} 