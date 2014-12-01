/** @jsx React.DOM */
var React = require('react');
var Reflux = require('reflux');
var SiteListStore = require('../stores/SiteListStore');
var Site = require('./Site');

var SiteList = React.createClass({
  displayName: 'SiteList',
  mixins: [Reflux.connect(SiteListStore, "list")],
  
  getInitialState() {
    return {
      list: SiteListStore.getDefaultData()
    };
  },

  render() {
    return (
      <ul>
        {this.state.list.map(site => <Site body={site} />)}
      </ul>
    );
  }
});

module.exports = SiteList;