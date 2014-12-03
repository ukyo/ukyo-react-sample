var Reflux = require('reflux');

var MemoListActions = Reflux.createActions([
  'init',
  'add',
  'update',
  'remove'
]);


module.exports = MemoListActions;