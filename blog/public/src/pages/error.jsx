/** @jsx React.DOM */
var React = require('react');
var Base = require('../layouts/base');

var Page = React.createClass({
  render() {
    return (
        <div>Not found.</div>
    );
  }
});

var resources = {};

module.exports = {
  title() {return 'error'},
  resources: resources,
  Page: Page
};