const component = require('./../component');
const ajaxPromise = require('./../utilities/ajax-promise');

let form;
let input;
let responseBody;

/**
 * Handle successful request
 * @function onSuccess
 * @param {Object} xhr - XMLHttpRequest API
 * @private
 */
function onSuccess(xhr) {
  let data = JSON.parse(xhr.responseText),
    list = data.items,
    teaser = '';

  responseBody.innerHTML = '';

  list.forEach(function(obj) {
    teaser += teaserBook(obj);
  });

  responseBody.innerHTML = teaser;
}

/**
 * Shorten a string to less than max characters without truncating words
 * @param {String} str - The input string
 * @param {Number }max - The max length of characters
 * @returns {String} - The shortened string
 * @private
 */
function shorten(str, max) {
  if (str.length <= max) return str;
  return str.substr(0, str.lastIndexOf(' ', max));
}

/**
 * Compile template for each element in the list of items
 * @function teaserBook
 * @param {Object} obj - List of book from XMLHttpRequest API
 * @return {String} Panel Template compiled
 * @private
 */
function teaserBook(obj) {
  let innerTeaser = `
    <div class="panel">
      <div class="panel-heading">
        <h4 class="panel-title">${obj.volumeInfo.title}</h4>
      </div>
      <div class="panel-body">
        <figure><img src=${obj.volumeInfo.imageLinks.thumbnail} alt=${obj.volumeInfo.title}></figure>
        <p class="description">${shorten(obj.volumeInfo.description, 200)}...</p>
        <p class="info">
          <span>Author: ${obj.volumeInfo.authors[0]}</span>
          <span>Publisher: ${obj.volumeInfo.publisher}</span>
          <span>Published: ${obj.volumeInfo.publishedDate}</span>
        </p>
      </div>
    </div>
    `;

  return innerTeaser;
}

/**
 * Handle failed request
 * @function onError
 * @private
 */
function onError(){
  responseBody.innerHTML =  'Sorry. We did not find any results for your search' ;
}

/**
 * Bind necessary event handlers - form / input
 * @function bindEvents
 * @private
 */
function bindEvents() {
  form.addEventListener('keydown', function(e){
    if (e.keyCode === 13) {
      e.preventDefault();
    }
  });

  input.addEventListener('keydown', function(e) {
    let query = e.target.value,
      APIUrl = 'https://www.googleapis.com/books/v1/volumes',
      numberResults = 20,
      order =  "newest";

    if (!query) {
      return;
    }

    const URL = APIUrl + '?q=' + query + '&maxResults=' + numberResults + '&orderBy=' + order;

    if (e.keyCode === 13) {
      ajaxPromise(URL)
        .then(onSuccess)
        .catch(onError);
    }
  });
}

/**
 * Initialise the component
 * @function init
 * @public
 * @param {Object} el - dom element
 */
function init(el) {
  form = el.querySelector('form');
  input = form.querySelector('input');
  responseBody = el.querySelector('.response-body');

  bindEvents();
}

module.exports = component.createComponent({init: init});

