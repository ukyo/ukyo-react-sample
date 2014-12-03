var Reflux = require('reflux');
var MemoActions = require('../actions/MemoActions');
var $ = require('jquery');

var MemoListStore = Reflux.createStore({
  listenables: MemoActions,

  onInit(id) {
    this.get(id).then(this.updateMemo.bind(this));
  },

  onCreate(memo) {
    $.ajax({
      type: 'POST',
      url: '/api/memos',
      dataType: 'json',
      data: memo
    })
    .then(this.updateMemo.bind(this));
  },

  onUpdate(memo) {
    $.ajax({
      type: 'PUT',
      url: '/api/memos/${memo._id}',
      dataType: 'json',
      data: memo
    })
    .then(this.updateMemo.bind(this));
  },

  onUpdateClient(memo) {
    this.updateMemo(memo);
  },

  onRemove(id) {
    $.ajax({
      type: 'DELETE',
      url: `/api/memos/${id}`
    })
    .then(this.updateMemo.bind(this));
  },

  updateMemo(memo) {
    this.memo = memo;
    this.trigger(memo);
  },

  get(id) {
    return $.getJSON(`/api/memos/${id}`);
  }
});


module.exports = MemoListStore;