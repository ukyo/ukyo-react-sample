/** @jsx React.DOM */
var React = require('react');
var Reflux = require('reflux');
var marked = require('marked');

marked.setOptions({
  renderer: new marked.Renderer(),
  gfm: true,
  tables: true,
  breaks: false,
  pedantic: false,
  sanitize: true,
  smartLists: true,
  smartypants: false
});

var MemoViewer = React.createClass({
  displayName: 'MemoViewer',

  propTypes: {
    memo: React.PropTypes.object
  },

  render() {
    return (
      <div dangerouslySetInnerHTML={{__html: marked(this.props.memo.body || '')}}></div>
    );
  }
});

module.exports = MemoViewer;