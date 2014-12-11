/** @jsx React.DOM */
var React = require('react');
var page = require('page');
var qs = require('qs');
var _ = require('lodash');
var Promise = require('bluebird');

var Base = require('./layouts/base');
var errorPage = require('./pages/error');
var req = require('./common/req');
var constants = require('../../constants');


page('*', (ctx, next) => {
  ctx.query = qs.parse(location.search.slice(1));
  next();
});

var Empty = React.createClass({
  render() {
    return <div/>;
  }
});

var Main = React.createClass({
  getInitialState() {
    return {
      Page: Empty,
      props: {}
    };
  },

  setTitle(title) {
    document.title = constants.Blog_TITlE + (title ? ` | ${title}` : '');
  },

  setupRoute(handler, path) {
    page(path, (ctx, next) => {
      var props = {}, promises;
      promises = _.map(handler.resources, (resource, k) => {
        return req(resource(ctx)).then(data => props[k] = data);
      });
      Promise.all(promises)
      .then(() => {
        this.setTitle(handler.title(props));
        this.setState({
          Page: handler.Page,
          props: props
        });
      })
      .catch(next);
    });
  },

  setupErrorPage() {
    page('*', ctx => {
      var {Page} = errorPage;
      this.setTitle(errorPage.title());
      this.setState({
        Page: Page,
        props: {}
      });
    });
  },

  componentWillMount() {
    _.forEach(require('./routes'), this.setupRoute.bind(this));
    this.setupErrorPage();
    page();
  },

  render() {
    var {Page, props} = this.state;
    return (
      <Base><Page {...props}/></Base>
    );
  }
});

React.render(<Main/>, document.body);
