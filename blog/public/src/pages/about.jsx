/** @jsx React.DOM */
var React = require('react');
var Base = require('../layouts/base');
var MarkdownViewer = require('../components/MarkdownViewer');

var about = `
## about

hello about.

* foo
* bar
* baz

1. hoge
1. fuga

> text
`;

var Page = React.createClass({
  render() {
    return (
        <MarkdownViewer text={about}/>
    );
  }
});

var resources = {};

module.exports = {
  title() {return 'about'},
  resources: resources,
  Page: Page
};