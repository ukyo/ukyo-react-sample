/** @jsx React.DOM */
var React = require('react');
var Reflux = require('reflux');
var MemoStore = require('../stores/MemoStore');
var MemoActions = require('../actions/MemoActions');
var MemoEditor = require('../components/MemoEditor');
var MemoViewer = require('../components/MemoViewer');
var AppBase = require('../bases/AppBase');
var UserStore = require('../stores/UserStore');


var MemoEditPage = React.createClass({
  displayName: 'MemoEditPage',
  mixins: [Reflux.connect(MemoStore, "memo")],

  getInitialState() {
    return {
      user: UserStore.user,
      memo: {}
    };
  },

  componentDidMount() {
    MemoActions.init(this.props.id);
  },

  render() {
    return AppBase({
      blocks: {
        content: (
          <div>
            <MemoEditor memo={this.state.memo}/>
            <MemoViewer memo={this.state.memo}/>
          </div>
        )
      },
      context: this.state
    });
  }
});

module.exports = MemoEditPage;