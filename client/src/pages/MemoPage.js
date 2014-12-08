/** @jsx React.DOM */
var React = require('react');
var Reflux = require('reflux');
// var MemoStore = require('../stores/MemoStore');
var MemoViewer = require('../components/MemoViewer');
// var MemoActions = require('../actions/MemoActions');
var AppBase = require('../bases/AppBase');
var PageContextMixin = require('../mixins/PageContextMixin');
var UserStore = require('../stores/UserStore');

var MemoPage = React.createClass({
  displayName: 'MemoPage',
  mixins: [PageContextMixin('MemoPage')],

  getInitialState() {
    return {
      user: UserStore.user,
      memo: {}
    }
  },

  render() {
    return AppBase({
      blocks: {
        content: (
          <div>
            <h2>{this.state.memo.title}</h2>
            <MemoViewer memo={this.state.memo}/>
          </div>
        )
      },
      context: this.state
    });
  }
});

module.exports = MemoPage;