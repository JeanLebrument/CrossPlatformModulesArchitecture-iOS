'use strict';

var SearchResultsComponent = require('../../SearchResults/Component/SearchResultsComponent');

class SearchPageOutput {
  static goToNextModule(component, location) {
    component.props.navigator.push({
      title: 'Results',
      component: SearchResultsComponent,
      passProps: {location: location}
    });
  }
}

module.exports = SearchPageOutput;
