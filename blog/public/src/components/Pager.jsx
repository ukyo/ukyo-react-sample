/** @jsx React.DOM */
var React = require('react');
var Link = require('./Link');


var Pager = React.createClass({
  propTypes: {
    currentPage: React.PropTypes.number,
    count: React.PropTypes.number,
    perPage: React.PropTypes.number,
    basePath: React.PropTypes.string,
    numPages: React.PropTypes.number
  },

  componentWillMount() {
    this.props.perPage = this.props.perPage || 10;
    this.props.basePath = this.props.basePath || '';
    this.props.numPages = this.props.numPages || 10;

    var lastPage = Math.ceil(this.props.count / this.props.perPage);
    var pageIndex = this.props.currentPage;
    var mid = Math.floor(this.props.numPages / 2);
    pageIndex -= mid;
    pageIndex = Math.min(pageIndex, lastPage - this.props.numPages);
    pageIndex = Math.max(pageIndex, 1);
    this.props.pageIndex = pageIndex;
    this.props.lastPage = lastPage;
  },

  render() {
    var backLink, nextLink, pagerLinks = [];
    var props = this.props;
    var {numPages, pageIndex, lastPage, basePath, currentPage} = props;
    if (currentPage > 1) {
      backLink = <li><Link to={basePath} query={{page: currentPage - 1}}>&laquo;</Link></li>
    } else {
      backLink = <li className="disabled"><a href="#">&laquo;</a></li>
    }
    for (var i = 1; i <= numPages && pageIndex <= lastPage; ++i, pageIndex++) {
      if (pageIndex === currentPage) {
        pagerLinks.push(<li className="active"><Link to={basePath} query={{page: pageIndex}}>{pageIndex}</Link></li>);
      } else {
        pagerLinks.push(<li><Link to={basePath} query={{page: pageIndex}}>{pageIndex}</Link></li>);
      }
    }
    if (currentPage < lastPage) {
      nextLink = <li><Link to={basePath} query={{page: currentPage + 1}}>&raquo;</Link></li>
    } else {
      nextLink = <li className="disabled"><a href="#">&raquo;</a></li>
    }

    return (
      <ul className="pagenation">
        {backLink}
        {pagerLinks}
        {nextLink}
      </ul>
    );
  }
});

module.exports = Pager;