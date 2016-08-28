import { EditorState } from 'draft-js';

export interface IEditorState {
    editorState: EditorState;
}

//Controlled input sample
export interface ICtrlInpState {
    value:string;
}