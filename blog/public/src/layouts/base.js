/** @jsx React.DOM */
var React = require('react');
var constants = require('../../../constants');
var Link = require('../components/Link');

var Base = React.createClass({
  render() {
    return (
      <div className="base">
        <header><a href="/"><h1>{constants.BLOG_TITLE}</h1></a></header>
        <nav>
          <div>
            <a href="/">Top</a> | <a href="/about">About</a>
          </div>
        </nav>
        <main>{this.props.children}</main>
        <footer>See <a href="https://github.com/ukyo/ukyo-react-sample/tree/master/blog" target="_blank">ukyo-react-sample/blog at master · ukyo/ukyo-react-sample</a>.</footer>
      </div>
    );
  }
});

module.exports = Base;
