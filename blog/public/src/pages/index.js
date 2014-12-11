/** @jsx React.DOM */
var React = require('react');
var Base = require('../layouts/base');
var EntryList = require('../components/EntryList');


var IndexPage = React.createClass({
  render() {
    return (
      <EntryList list={this.props.entries}/>
    );
  }
});

var resources = {
  entries() {
    return {
      method: 'GET',
      url: '/api/entries'
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