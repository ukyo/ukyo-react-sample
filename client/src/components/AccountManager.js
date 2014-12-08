/** @jsx React.DOM */
var React = require('react');
var Reflux = require('reflux');
var UserActions = require('../actions/UserActions');
var _ = require('lodash');

var AccountManager = React.createClass({
  displayName: 'AccountManager',

  propTypes: {
    user: React.PropTypes.object
  },

  getValue(refName) {
    return this.refs[refName].getDOMNode().value;
  },

  cancel(e) {
    e.preventDefault();
  },

  getFormValues() {
    return {
      name: this.getValue('nameInput'),
      password: this.getValue('passwordInput')
    };
  },

  handleClickSignup(e) {
    this.cancel(e);
    UserActions.signup(this.getFormValues());
  },

  handleClickLogin(e) {
    this.cancel(e);
    UserActions.login(this.getFormValues());
  },

  handleClickLogout(e) {
    this.cancel(e);
    UserActions.logout();
  },

  render() {
    if (!_.isEmpty(this.props.user)) {
      return (
        <div>
          {this.props.user.name} <button onClick={this.handleClickLogout}>Logout</button>
        </div>
      );
    } else {
      return (
        <form>
          <input ref="nameInput" type="text" name="name" placeholder="username" required />
          <input ref="passwordInput" type="password" name="password" placeholder="password" required />
          <button type="submit" onClick={this.handleClickLogin}>Login</button>
          <button type="submit" onClick={this.handleClickSignup}>Signup</button>
        </form>
      );
    }
  }
});


module.exports = AccountManager;