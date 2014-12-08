var Reflux = require('reflux');
var MemoListActions = require('../actions/MemoListActions');
var $ = require('jquery');

var MemoListStore = Reflux.createStore({
  listenables: MemoListActions,

  onInit(params) {
    this.getAll(params).then(this.updateList.bind(this));
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

  getAll(params) {
    console.log(params);
    return $.ajax({
      url: '/api/memos',
      dataType: 'json',
      data: params
    });
  },

  get(id) {

  }
});


module.exports = MemoListStore;