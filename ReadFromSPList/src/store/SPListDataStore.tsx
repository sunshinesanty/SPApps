import {observable, computed, action} from "mobx"

export class SPListDataStore{
    @observable public SPListData = [];
    constructor(){}
    @computed get fetchSPListRows = ()    =>{
        
    }
}
