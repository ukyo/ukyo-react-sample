var {API_PATH} = require('./constants');
var _ = require('lodash');
var Promise = require('bluebird');
var qs = require('qs');
var constants = require('./constants');

module.exports = {
  loadPageData(params) {
    var {ctx, handler, loadFn} = params;
    var promises, props = {ctx: ctx};

    promises = _.map(handler.resources, (resource, k) => {
      var o = resource(ctx);
      o.url = constants.API_PATH + o.url;
      if (o.method === 'GET' && !_.isEmpty(ctx.query)) {
        o.url += `?${qs.stringify(ctx.query)}`;
      }
      return loadFn(o).then(data => props[k] = data);
    });

    return Promise.all(promises).then(() => props);
  }
};