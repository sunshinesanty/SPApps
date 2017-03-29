import { createStore } from 'redux'
import rootReducer from './reducers'
export default class MyStore{
    constructor(){
        const initialState: any = {};
        return createStore(rootReducer, initialState);
    }
}
