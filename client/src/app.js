/** @jsx React.DOM */
var React = require('react');
var AccountManager = require('./components/AccountManager');
var Reflux = require('reflux');

var IndexPage = require('./pages/IndexPage');
var MemoPage = require('./pages/MemoPage');
var MemoEditPage = require('./pages/MemoEditPage');
var UserStore = require('./stores/UserStore');

var Router = require('react-router');
var { Route, DefaultRoute, RouteHandler, Link } = Router;

require('../styles/style.css');


var App = React.createClass({
  displayName: 'App',
  mixins: [Reflux.connect(UserStore, 'user')],

  getInitialState() {
    return {user: null};
  },

  componentDidMount() {
    UserStore.init();
  },

  render() {
    return (
      <div>
        <AccountManager user={this.state.user}/>
        <Link to="new_memo" params={{memo: {}, user: this.state.user}}>new memo</Link>
        <RouteHandler/>
      </div>
    );
  }
});


var routes = (
  <Route handler={App} name="app" path="/">
    <DefaultRoute handler={IndexPage}/>
    <Route name="new_memo" handler={MemoEditPage}/>
    <Route name="memo" path="/memos/:id" handler={MemoPage}/>
  </Route>
);


Router.run(routes, Router.HistoryLocation, (Handler) => {
  React.render(<Handler/>, document.body);
});



