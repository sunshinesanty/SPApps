// app.ts
import { module, element, bootstrap, ILogService } from 'angular';
import './apps/apps.less';
import BookmarkCtrl from './apps/bookmarks/bookmarkCtrl';

const bookmarkApp = module('bookmarkApp', [])
    .controller('bookmarkCtrl', ['$scope', BookmarkCtrl]);

element(document).ready(() => {
    bootstrap(document.getElementById('myApp'), ['bookmarkApp']);
});
