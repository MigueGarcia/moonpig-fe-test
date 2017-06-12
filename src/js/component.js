/**
 * Component architecture - Create a new module
 * Create a new component
 * @function create
 * @param {Object} config - config parameters
 */
function createComponent(config) {

  config = config || {};

  function init(el) {
    if(config.init) {
      config.init(el);
    }
    el.setAttribute('data-initialised', true);
  }

  return {
    init: init
  };
}

module.exports = {
  createComponent: createComponent
};