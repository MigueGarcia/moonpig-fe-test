var Promise = require('promise-polyfill'); 

// To add to window
if (!window.Promise) {
  window.Promise = Promise;
}