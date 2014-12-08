var Reflux = require('reflux');

var UserActions = Reflux.createActions([
  'init',
  'signup',
  'login',
  'logout'
]);


module.exports = UserActions;