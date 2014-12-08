var Reflux = require('reflux');
var UserActions = require('../actions/UserActions');
var $ = require('jquery');

var UserStore = Reflux.createStore({
  listenables: UserActions,

  getUser() {
    if(this.user) {
      return $.Deferred().resolve(this.user);
    } else {
      return $.getJSON('/api/users/me').then(user => {
        this.user = user;
        return user;
      });
    }
  },

  onInit() {
    this.getUser().then(this.updateUser.bind(this));
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
    return
  },

  onLogout() {
    $.get('/api/users/logout').then(() => {
      this.updateUser(null);      
    });
  }

});


module.exports = UserStore;