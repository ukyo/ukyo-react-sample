/** @jsx React.DOM */
var React = require('react');
var Base = require('../layouts/base');
var EntryList = require('../components/EntryList');


var TagPage = React.createClass({
  render() {
    return (
      <div>
        <div className="tag-page-title"><i className="fa fa-tags"></i> {this.props.ctx.params.tag}</div>
        <EntryList entries={this.props.entries}/>
      </div>
    );
  }
});

var resources = {
  entries(ctx) {
    return {
      method: 'GET',
      url: `/tags/${ctx.params.tag}`
    }
  }
};

module.exports = {
  title(props) {
    return `tag | ${props.ctx.params.tag}`;
  },
  resources: resources,
  Page: TagPage
};