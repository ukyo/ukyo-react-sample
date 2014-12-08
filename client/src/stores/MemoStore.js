var Reflux = require('reflux');
var MemoActions = require('../actions/MemoActions');
var $ = require('jquery');

var MemoAppConstants = require('../constants/MemoAppConstants');
var MemoAppDispatcher = require('../dispatcher/MemoAppDispatcher');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');

var ActionTypes = ChatConstants.ActionTypes;
var CHANGE_EVENT = 'change';

var _memos = {};

var MemoStore = assign({}, EventEmitter.prototype, {
  emitChange() {
    this.emit(CHANGE_EVENT);
  },

  addChangeListener(cb) {
    this.on(CHANGE_EVENT, cb);
  },

  removeChangeListener(cb) {
    this.removeChangeListener(CHANGE_EVENT, cb);
  },

  getMemo(id) {
    _memos[id];
  },

  getUserMemos(user) {

  },

  getPublicMemos() {

  },

  getMyMemos() {

  }
});

MemoStore.dispatchToken = MemoAppDispatcher.register(payload => {
  var action = payload.action;

  switch (action.type) {
    case ActionTypes.CLICK_
  }
});



module.exports = MemoListStore;