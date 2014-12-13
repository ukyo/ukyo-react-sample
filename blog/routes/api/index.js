var express = require('express');
var config = require('config');
var moment = require('moment');
var _ = require('lodash');
var router = express.Router();

router.use('/entries', require('./entry'));
router.use('/tags', require('./tag'));

module.exports = router;
