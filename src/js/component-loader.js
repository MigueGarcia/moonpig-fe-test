/**
 *  Component architecture - Find components in DOM using data-component attribute
 * Finds all elements with data-component attribute and attempts to execute associated component script
 * @function componentLoader
 * @param {Array} components - Array with DOM Elements with data-component attribute
 */

const component = require('./component');

function componentLoader(components) {
  const componentElements = Array.from(document.querySelectorAll('[data-component]:not([data-initialised])'));

  componentElements.forEach(function(element) {

    const componentNames = element.getAttribute('data-component').split(',');
    
    componentNames.forEach(function(componentName) {
      const component = components[componentName];

      if(!component) {
        return;
      }

      // Create and initialize component
      component.init(element);
    });

  });
}

module.exports = componentLoader;