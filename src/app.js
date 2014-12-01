/** @jsx React.DOM */
var React = require('react');
var SiteList = require('./components/SiteList');
var SiteActions = require('./actions/SiteActions');


var App = React.createClass({
  displayName: 'App',
  getInitialState() {
    return {name: ''};
  },
  handleChange(e) {
    this.setState({name: e.target.value});
  },
  handleClick() {
    var value = this.state.name;
    if (!value) return;
    SiteActions.addSite({name: value});
    this.setState({name: ''}, () => this.refs.nameInput.getDOMNode().focus());
  },
  render() {
    return (
      <div>
        <input ref="nameInput" value={this.state.name} onChange={this.handleChange} />
        <button onClick={this.handleClick}>go!</button>
        <SiteList />
      </div>
    );
  }
});


React.render(<App />, document.body);