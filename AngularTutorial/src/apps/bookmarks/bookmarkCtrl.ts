import { IController } from 'angular';
import { IBookMarkScope } from './IBookmark';

export default class BookmarkCtrl implements IController {
    static $inject: Array<string> = ['$scope'];
    constructor(public $scope: IBookMarkScope) {
        this.$scope.greetingMessage = 'hello world';
    }
}
