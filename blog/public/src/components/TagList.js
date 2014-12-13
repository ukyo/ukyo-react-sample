/** @jsx React.DOM */
var React = require('react');

var TagList = React.createClass({
  propTypes: {
    list: React.PropTypes.array.isRequired
  },

  render() {
    return (
      <div className="tags">
        {this.props.list.map(item => {
          return (
            <a href={`/tags/${item}`}><i className="fa fa-tag"></i> {item}</a>
          )
        })}
      </div>
    );
  }
});

module.exports = TagList;