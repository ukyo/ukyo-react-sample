/** @jsx React.DOM */
var React = require('react');
var Reflux = require('reflux');

var Router = require('react-router');
var { Route, DefaultRoute, RouteHandler, Link } = Router;

var MemoViewer = React.createClass({
  displayName: 'MemoViewer',

  propTypes: {
    memo: React.PropTypes.object
  },

  render() {
    return (
      <div><pre>{this.props.memo.body}</pre></div>
    );
  }
});

module.exports = MemoViewer;