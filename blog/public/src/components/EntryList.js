/** @jsx React.DOM */
var React = require('react');
var moment = require('moment');

var EntryList = React.createClass({
  propTypes: {
    list: React.PropTypes.array.isRequired
  },

  render() {
    return (
      <div>
        {this.props.list.map(item => {
          var dateStr = moment(item.created).format('YYYY/MM/DD');
          return (
            <div>
              <h2><a href={`/entry/${dateStr}/${item.slug}`}>{item.title}</a></h2>
              <div>{dateStr}</div>
            </div>
          )
        })}
      </div>
    );
  }
});

module.exports = EntryList;