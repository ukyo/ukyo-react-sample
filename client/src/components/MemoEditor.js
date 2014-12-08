/** @jsx React.DOM */
var React = require('react');
var Reflux = require('reflux');
var MemoActions = require('../actions/MemoActions');

var Router = require('react-router');
var { Route, DefaultRoute, RouteHandler, Link } = Router;

var MemoEditor = React.createClass({
  displayName: 'MemoEditor',

  propTypes: {
    memo: React.PropTypes.object
  },

  handleSave(e) {
    e.preventDefault();
    var memo = this.props.memo;
    memo._id ?
      MemoActions.update(this.props.memo) :
      MemoActions.create(this.props.memo);
    console.log('saved!!');
  },

  handleChange(e) {
    e.preventDefault();
    this.props.memo.title = this.refs.titleInput.getDOMNode().value;
    this.props.memo.body = this.refs.bodyInput.getDOMNode().value;
    MemoActions.updateClient(this.props.memo);
  },

  render() {
    return (
      <form>
        <div><input ref="titleInput" type="text" value={this.props.memo.title} onChange={this.handleChange}/></div>
        <div><textarea ref="bodyInput" value={this.props.memo.body} onChange={this.handleChange}></textarea></div>
        <div><button onClick={this.handleSave}>Save</button></div>
      </form>
    );
  }
});

module.exports = MemoEditor;