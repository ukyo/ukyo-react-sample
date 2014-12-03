/** @jsx React.DOM */
var React = require('react');
var Reflux = require('reflux');
var MemoStore = require('../stores/MemoStore');
var MemoViewer = require('../components/MemoViewer');
var MemoActions = require('../actions/MemoActions');

var Router = require('react-router');
var { Route, DefaultRoute, RouteHandler, Link } = Router;

var MemoPage = React.createClass({
  displayName: 'MemoPage',
  mixins: [Reflux.connect(MemoStore, "memo"), Router.Navigation, Router.State],

  getInitialState() {
    return {
      memo: {}
    }
  },

  componentDidMount() {
    MemoActions.init(this.getParams().id);
  },

  render() {
    return (
      <div>
        <h2>{this.state.memo.title}</h2>
        <MemoViewer memo={this.state.memo}/>
      </div>
    );
  }
});

module.exports = MemoPage;