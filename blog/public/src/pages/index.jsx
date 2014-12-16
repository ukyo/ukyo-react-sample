/** @jsx React.DOM */
var React = require('react');
var Base = require('../layouts/base');
var EntryList = require('../components/EntryList');


var IndexPage = React.createClass({
  render() {
    return (
      <EntryList entries={this.props.entries}/>
    );
  }
});

var resources = {
  entries() {
    return {
      method: 'GET',
      url: '/entries'
    }
  }
};

module.exports = {
  title() {
    return '';
  },
  resources: resources,
  Page: IndexPage
};