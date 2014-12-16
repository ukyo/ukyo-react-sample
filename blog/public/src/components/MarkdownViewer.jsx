/** @jsx React.DOM */
var React = require('react');
var marked = require('marked');
var hljs = require('highlight.js');
var renderer = new marked.Renderer();
renderer.code = (code, language) => {
  return (
    `<pre><code class="hljs ${language}">${hljs.highlight(language, code).value}</code></pre>`
  );
};

marked.setOptions({
  renderer: renderer,
  gfm: true,
  tables: true,
  breaks: false,
  pedantic: false,
  sanitize: true,
  smartLists: true,
  smartypants: false
});

var MarkdownViewer = React.createClass({
  propTypes: {
    text: React.PropTypes.string.isRequired
  },

  render() {
    return (
      <div dangerouslySetInnerHTML={{__html: marked(this.props.text)}}></div>
    );
  }
});

module.exports = MarkdownViewer;