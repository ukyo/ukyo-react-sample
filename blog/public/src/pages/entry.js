/** @jsx React.DOM */
var React = require('react');
var MarkdownViewer = require('../components/MarkdownViewer');
var Base = require('../layouts/base');
var req = require('../common/req');
var moment = require('moment');

var Page = React.createClass({
  render() {
    return (
        <div>
          <h2>{this.props.entry.title}</h2>
          <div>{moment(this.props.entry.date).format('YYYY-MM-DD')}</div>
          <MarkdownViewer text={this.props.entry.body}/>
        </div>
    );
  }
});

var resources = {
  entry(ctx) {
    return {
      method: 'GET',
      url: `/api/entries/${ctx.params.slug}`
    };
  }
};

module.exports = {
  title(props) {
    return props.entry.title;
  },
  resources: resources,
  Page: Page
};