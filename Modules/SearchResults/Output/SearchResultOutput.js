'use strict';

var PropertyViewComponent = require('../../PropertyView/Component/PropertyViewComponent');

class SearchResultOutput {
  static goToNextModule(component, property) {
    component.props.navigator.push({
      title: 'Property',
      component: PropertyViewComponent,
      passProps: {property: property}
    });
  }
}

module.exports = SearchResultOutput;
