var Reflux = require('reflux');

var UserActions = Reflux.createActions([
  'signup',
  'login',
  'logout'
]);


module.exports = UserActions;