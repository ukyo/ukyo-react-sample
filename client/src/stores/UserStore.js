var Reflux = require('reflux');
var UserActions = require('../actions/UserActions');
var $ = require('jquery');


var UserStore = Reflux.createStore({
  listenables: UserActions,

  init() {
    return $.getJSON('/api/users/me').then(this.updateUser.bind(this));
  },

  onSignup(user) {
    $.ajax({
      type: 'POST',
      url: '/api/users/signup',
      dataType: 'json',
      data: user
    }).then(this.updateUser.bind(this));
  },

  onLogin(user) {
    $.ajax({
      type: 'POST',
      url: '/api/users/login',
      dataType: 'json',
      data: user
    }).then(this.updateUser.bind(this));
  },

  updateUser(user) {
    this.user = user;
    this.trigger(user);
  },

  onLogout() {
    this.updateUser(null);
  },

  get() {
    return this.user;
  }

});


module.exports = UserStore;