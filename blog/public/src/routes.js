module.exports = {
  '/': require('./pages/index'),
  '/entry/:yyyy/:mm/:dd/:slug': require('./pages/entry'),
  '/tags/:tag': require('./pages/tag'),
  '/about': require('./pages/about')
};