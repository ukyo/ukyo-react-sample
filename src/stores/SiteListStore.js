var Reflux = require('reflux');
var SiteActions = require('../actions/SiteActions');

var list = [
  {name: 'foo'},
  {name: 'bar'}
];

var SiteListStore = Reflux.createStore({
  listenables: SiteActions,

  onAddSite(site) {
    list.push(site);
    this.updateList(list);
  },

  onRemoveSite(site) {
    var i = list.indexOf(site);
    if (i == -1) return;
    list.splice(i, 1);
    this.updateList(list);
  },

  updateList(list) {
    this.list = list;
    this.trigger(list);
  },

  getDefaultData() {
    console.log(1);
    this.list = list;
    return this.list;
  }
});


module.exports = SiteListStore;