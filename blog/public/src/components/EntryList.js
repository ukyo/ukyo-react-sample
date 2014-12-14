/** @jsx React.DOM */
var React = require('react');
var moment = require('moment');
var TagList = require('./TagList');
var Link = require('./Link');

var EntryList = React.createClass({
  propTypes: {
    entries: React.PropTypes.object.isRequired
  },

  render() {
    var entries = this.props.entries;

    return (
      <div>
        {entries.list.map(item => {
          var dateStr = moment(item.created).format('YYYY/MM/DD');
          return (
            <div key={item._id}>
              <h2 className="entry-title"><a href={`/entry/${dateStr}/${item.slug}`}>{item.title}</a></h2>
              <TagList list={item.tags}/>
            </div>
          )
        })}
        <div className="pagination">
          {entries.page > 1 ? <span className="newer"><Link query={{page: entries.page - 1}}>←newer</Link></span> : null}
          {entries.hasNext ? <span className="older"><Link query={{page: entries.page + 1}}>older→</Link></span> : null}
        </div>
      </div>
    );
  }
});

module.exports = EntryList;