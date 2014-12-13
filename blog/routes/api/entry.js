var express = require('express');
var config = require('config');
var moment = require('moment');
var _ = require('lodash');
var Entry = require('../../models/entry');
var constants = require('../../constants');
var router = express.Router();

router.get('/', (req, res, next) => {
  Entry.paginate(
    req.query.page,
    constants.PER_PAGE,
    {},
    {
      title: 1,
      slug: 1,
      tags: 1,
      created: 1
    },
    {
      sort: {created: -1}
    },
    (err, result) => {
      if (err) {
        res.status(404);
        next();
      }
      res.send(result);
    }
  );
});

router.get('/:slug', (req, res) => {
  res.send(Entry.sync.findOne({slug: req.params.slug}));
});

router.post('/', (req, res) => {
  var memo = new Entry(req.body);
  memo.sync.save();
  return res.send(memo);
});

router.put('/:slug', (req, res) => {
  var memo = Entry.sync.findOne({slug: req.params.slug});
  memo.set(req.body);
  memo.sync.save();
  return res.send(memo);
});

router.delete('/:id', (req, res) => {
  var memo = Entry.sync.findById(req.params.id);
  memo.sync.remove();
  res.status(204).end();
});

module.exports = router;
