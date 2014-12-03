var Reflux = require('reflux');

var MemoListActions = Reflux.createActions([
  'init',
  'create',
  'update',
  'updateClient',
  'remove'
]);

module.exports = MemoListActions;