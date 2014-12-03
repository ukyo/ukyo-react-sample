/** @jsx React.DOM */
var React = require('react');
var Reflux = require('reflux');
var MemoStore = require('../stores/MemoStore');
var MemoActions = require('../actions/MemoActions');
var MemoEditor = require('../components/MemoEditor');
var MemoViewer = require('../components/MemoViewer');

var Router = require('react-router');
var { Route, DefaultRoute, RouteHandler, Link } = Router;

var MemoEditPage = React.createClass({
  displayName: 'MemoEditPage',
  mixins: [Reflux.connect(MemoStore, "memo")],

  propTypes: {
    user: React.PropTypes.object,
    id: React.PropTypes.string
  },

  getInitialState() {
    return {
      memo: {}
    };
  },

  componentDidMount() {
    MemoActions.init(this.props.id);
  },

  render() {
    return (
      <div>
        <MemoEditor memo={this.state.memo} user={this.props.user}/>
        <MemoViewer memo={this.state.memo}/>
      </div>
    );
  }
});

module.exports = MemoEditPage;