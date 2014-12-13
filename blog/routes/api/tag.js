var express = require('express');
var config = require('config');
var moment = require('moment');
var _ = require('lodash');
var Entry = require('../../models/entry');
var constants = require('../../constants');
var router = express.Router();

router.get('/:tag', (req, res) => {
  Entry.paginate(
    req.query.page,
    constants.PER_PAGE,
    {tags: {$in: [req.params.tag]}},
    {
      title: 1,
      slug: 1,
      tags: 1,
      created: 1
    },
    {sort: {created: -1}},
    (err, result) => {
      if (err) {
        res.status(404);
        next();
      }
      res.send(result);
    }
  );
});

module.exports = router;
