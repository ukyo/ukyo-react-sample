/** @jsx React.DOM */
var React = require('react');
var marked = require('marked');
var hljs = require('highlight.js');

marked.setOptions({
  renderer: new marked.Renderer(),
  gfm: true,
  tables: true,
  breaks: false,
  pedantic: false,
  sanitize: true,
  smartLists: true,
  smartypants: false,
  highlight(code) {
    return hljs.highlightAuto(code).value;
  } 
});

var MarkdownViewer = React.createClass({
  propTypes: {
    text: React.PropTypes.object.isRequired
  },

  render() {
    return (
      <div dangerouslySetInnerHTML={{__html: marked(this.props.text)}}></div>
    );
  }
});

module.exports = MarkdownViewer;