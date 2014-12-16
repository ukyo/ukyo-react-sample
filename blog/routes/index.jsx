var express = require('express');
var router = express.Router();
var _ = require('lodash');
var config = require('config');
var constants = require('../constants');

router.get('/*', (req, res, next) => {
  var ua = req.get('User-Agent').toLowerCase();
  // ie ~9 and bot
  if (/msie\s[6-9]|bot|crawler|baiduspider|80legs|ia_archiver|voyager|curl|wget|yahoo! slurp|mediapartners-google/.test(ua)) {
    return next();
  }
  res.render('index', { title: constants.BLOG_TITLE });
});



module.exports = router;
