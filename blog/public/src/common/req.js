var cache = {};
var qs = require('qs');

module.exports = o => {
  if (o.method === 'GET' && cache[o.url]) {
    return Promise.resolve(cache[o.url]);
  }

  return new Promise((resolve, reject) => {
    var xhr = new XMLHttpRequest;
    console.log(o.url);
    xhr.open(o.method, o.url);
    xhr.responseType = 'json';
    xhr.onloadend = () => {
      cache[o.url] = xhr.response;
      resolve(xhr.response);
    };
    xhr.onerror = reject;
    xhr.send();
  });
};