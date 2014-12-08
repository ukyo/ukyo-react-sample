/** @jsx React.DOM */
var React = require('react');
var Reflux = require('reflux');
// var MemoListStore = require('../stores/MemoListStore');
// var MemoListActions = require('../actions/MemoListActions');
var PageContextStore = require('../stores/PageContextStore');
var AppBase = require('../bases/AppBase');
var MemoList = require('../components/MemoList');
var UserStore = require('../stores/UserStore');
var req = require('../common/req');
var ServerActionCreators = require('../actions/ServerActionCreators');
var getIndexPageState = () => {
  return {
    user: UserStore.get(),
    memos: MemoStore.getPublics()
  };
};

var IndexPage = React.createClass({
  getInitialState() {
    return getIndexPageState();
  },

  render() {
    return AppBase({
      blocks: {
        content: (
          <MemoList list={this.state.memos}/>
        )
      },
      context: this.state
    });
  },

  _onChange() {
    this.setState(getIndexPageState());
  },

  componentDidMount() {
    UserStore.addChangeListener(this._onChange);
    MemoStore.addChangeListener(this._onChange);
  },

  componentWillMount() {
    UserStore.removeChangeListener(this._onChange);
    MemoStore.removeChangeListener(this._onChange);
  }
});

var resolve = () => {
  var ps = [];
  ps[ps.length] = req({
    type: 'GET',
    url: '/api/memos'
  });
  ps[ps.length] = req({
    type: 'GET',
    url: '/api/users/me'
  });
  Promise.all(([memos, user]) => {
    ServerActionCreators.receiveMemos(memos);
    ServerActuibCreators.receiveUser(user);
  });
};

module.exports = IndexPage;