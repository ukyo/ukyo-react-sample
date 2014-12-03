/** @jsx React.DOM */
var React = require('react');
var Reflux = require('reflux');
var MemoListStore = require('../stores/MemoListStore');
var MemoListActions = require('../actions/MemoListActions');

var Router = require('react-router');
var { Route, DefaultRoute, RouteHandler, Link } = Router;

var IndexPage = React.createClass({
  displayName: 'IndexPage',
  mixins: [Reflux.connect(MemoListStore, "list")],
  
  getInitialState() {
    return {
      list: []
    };
  },

  componentDidMount() {
    MemoListActions.init();
  },

  render() {
    return (
      <div>
        {this.state.list.map(memo => {
          return <div><Link to="memo" params={{id: memo._id}}>{memo.title}</Link> by {memo.user.name}</div>
        })}
      </div>
    );
  }
});

module.exports = IndexPage;