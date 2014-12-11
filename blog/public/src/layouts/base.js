/** @jsx React.DOM */
var React = require('react');
var constants = require('../../../constants');

var Base = React.createClass({
  render() {
    return (
      <div>
        <header><a href="/"><h1>{constants.BLOG_TITLE}</h1></a></header>
        <nav>
          <div>
            <a href="/about">about</a>
          </div>
        </nav>
        {this.props.children}
    </div>
    );
  }
});

module.exports = Base;
