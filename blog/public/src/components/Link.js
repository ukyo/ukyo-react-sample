/** @jsx React.DOM */
var React = require('react');
var qs = require('qs');
var _ = require('lodash');

var Link = React.createClass({
  propTypes: {
    to: React.PropTypes.string,
    query: React.PropTypes.object
  },

  getDefaultProps() {
    return {
      to: '',
      query: {}
    };
  },

  render() {
    var url = this.props.to;
    if (!_.isEmpty(this.props.query)) {
      url += '?' + qs.stringify(this.props.query);
    }

    return (
      <a href={url}>{this.props.children}</a>
    );
  }
});

module.exports = Link;