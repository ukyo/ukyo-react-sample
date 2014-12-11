module.exports = {
  '/': require('./pages/index'),
  '/entry/:yyyy/:mm/:dd/:slug': require('./pages/entry'),
  '/about': require('./pages/about')
};