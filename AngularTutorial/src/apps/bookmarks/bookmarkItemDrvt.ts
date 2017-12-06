import { IDirective, IScope, IAugmentedJQuery, IAttributes } from 'angular';
var template  = require('./bookmark.html');
export default class BookMarkItem implements IDirective {
    public template: string;
    public replace: boolean;
    public link: (scope: IScope, element: IAugmentedJQuery, attrs: IAttributes) => void;
    public bindToController: boolean | { [boundProperty: string]: string };
    constructor() {
        this.template = template.toString();
        this.bindToController = { 'bookmark': '=' };
    }
}
