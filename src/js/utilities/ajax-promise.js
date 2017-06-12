/**
 * Component architecture - Retrieve some content via AJAX. Returns a promise
 * @function ajaxPromise
 * @private
 * @param {string} url - The URL of the AJAX content
 * @param {Object} [options] - Additional options
 * @param {string} [options.method] - The http method to use for the request (defaults to 'get')
 * @param {boolean} [options.sync] - Make the request synchronous (defaults to false)
 */
function ajaxPromise(url, options){
  return new Promise(function(resolve, reject){
    if(!url) {
      reject('No url provided');
      return;
    }

    options = options || {};

    try {
      let xhr = new XMLHttpRequest();

      xhr.open(options.method || 'get', url, !options.sync);

      if (options.headers) {
        Object.keys(options.headers).forEach(function(key){
          xhr.setRequestHeader(key, options.headers[key]);
        });
      }

      xhr.send(options.data || null);

      // Process the AJAX having been successfully returned
      xhr.onload = function(){
        if(xhr.readyState === 4 && xhr.status === 200){
          resolve(xhr);
        } else {
          reject(xhr);
        }
      };
    } catch(err){
      reject(err);
    }
  });
}

module.exports = ajaxPromise;