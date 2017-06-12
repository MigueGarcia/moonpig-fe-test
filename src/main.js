/**
 * Component architecture - Bundle all JS on application
 * Finds all elements with data-component attribute
 * Initialized and execute associated component script
 */

// Polyfills
require('./js/polyfills/array-from');
require('./js/polyfills/promise');

const componentLoader = require('./js/component-loader');

const components = {
  restClient: require('./js/components/rest-client')
};

componentLoader(components);
