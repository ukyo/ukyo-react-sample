/** @jsx React.DOM */
var React = require('react');
var Reflux = require('reflux');
var SiteActions = require('../actions/SiteActions');


var Site = React.createClass({
  displayName: 'Site',
  propTypes: {
    body: React.PropTypes.object.isRequired
  },
  handleClick() {
    SiteActions.removeSite(this.props.body);
  },
  render() {
    return (
      <li>{this.props.body.name} <button onClick={this.handleClick}>✖</button></li>
    );
  }
});


module.exports = Site;