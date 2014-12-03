var Reflux = require('reflux');
var MemoListActions = require('../actions/MemoListActions');
var $ = require('jquery');

var MemoListStore = Reflux.createStore({
  listenables: MemoListActions,

  onInit() {
    this.getAll().then(this.updateList.bind(this));
  },

  onAdd(memo) {
    $.ajax({
      type: 'POST',
      url: '/api/memos',
      dataType: 'json',
      data: memo
    })
    .then(this.getAll.bind(this))
    .then(this.updateList.bind(this));
  },

  onRemove(id) {
    $.ajax({
      type: 'DELETE',
      url: `/api/memos/${id}`
    })
    .then(this.getAll.bind(this))
    .then(this.updateList.bind(this));
  },

  updateList(list) {
    this.list = list;
    this.trigger(list);
  },

  getAll() {
    return $.getJSON('/api/memos');
  },

  get(id) {

  }
});


module.exports = MemoListStore;