/** @jsx React.DOM */
var React = require('react');
var MarkdownViewer = require('../components/MarkdownViewer');
var Base = require('../layouts/base');
var req = require('../common/req');
var TagList = require('../components/TagList');
var moment = require('moment');

var Page = React.createClass({
  render() {
    var entry = this.props.entry;

    return (
      <div className="entry">
        <h2 className="entry-title">{entry.title}</h2>
        <TagList list={entry.tags}/>
        <div className="entry-body">
          <MarkdownViewer text={entry.body}/>
        </div>
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