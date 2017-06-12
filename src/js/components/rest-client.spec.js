const restClient = require('./rest-client.js');

let xhr, requests;

//Mock DOM - Events - HTML
const keyboard = {
  keydown: function (el, keyCode) {
    var ev = new Event("keydown", {
      bubbles: true,
      cancelable: true,
      view: window
    });

    Object.defineProperty(ev, 'keyCode', {
      get : function() {
        return keyCode;
      }
    });

    el.dispatchEvent(ev);
  }
};

describe('REST Client', function() {
  let restClientNode;
  let markup = '<div class="books-panel" data-component="restClient"><form id="books-panel-form"> <h1>Moonpig Bookshop</h1> <div class="form-group books-panel-url"> <input type="text" class="form-control" placeholder="Enter keyword to find your Book" required=""> </div> </form> <div class="response-body"> </div> </div>';
  
  before(function(){
    document.body.innerHTML =  markup;
    restClientNode = document.querySelector('.books-panel');
    restClient.init(restClientNode);

    xhr = sinon.useFakeXMLHttpRequest();
    requests = [];
    xhr.onCreate = function (req) { requests.push(req); };
  });

  after(function () {
    xhr.restore();
  });

  it('Initializes the component', function() {
    expect(restClientNode.hasAttribute('data-initialised')).to.be.true;
  });

  it('It will perform an ajax call on Enter keypress ', function() {
    // mock query on input field
    let query = 'javascript';
    let expected = 'https://www.googleapis.com/books/v1/volumes?q=javascript&maxResults=20&orderBy=newest';
    let input = restClientNode.querySelector('input');
    input.value = query;

    keyboard.keydown(input, 13);

    expect(requests.length).to.equal(1);
    expect(requests[0].url).to.equal(expected);
  });

});