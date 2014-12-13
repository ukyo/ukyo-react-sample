var _ = require('lodash');

module.exports = function(page, perPage, conditions, fields, options, callback) {
  page = +page
  if (page < 1 || !_.isNumber(page)) return callback(new Error('invalid page'));
  page = page || 1
  page = Math.max(1, page)
  page -= 1
  skip = page * perPage
  limit = perPage + 1
  options = _.clone(options);
  _.merge(options, {skip, limit});

  return this.find(conditions, fields, options, function(err, list) {
    if (err) return callback(err);
    var result = {};
    if (list.length === limit) {
      result.list = list.slice(0, limit - 1);
      result.hasNext = true;
    } else {
      result.list = list;
      result.hasNext = false;
    }
    result.page = page + 1;
    callback(err, result);
  });
};