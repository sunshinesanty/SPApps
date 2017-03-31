import {Dispatcher} from 'flux';

const AppDispatcher = new Dispatcher();

AppDispatcher.handleViewAction = function(action: any) {
  this.dispatch({
    source: 'VIEW_ACTION',
    action: action
  });
}

module.exports = AppDispatcher;