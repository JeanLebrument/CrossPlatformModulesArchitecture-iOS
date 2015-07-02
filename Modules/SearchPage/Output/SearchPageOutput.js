'use strict';

var SearchResultsComponent = require('../../SearchResults/Component/SearchResultsComponent');

class SearchPageOutput {
  static goToNextModule(component, listings) {
    component.props.navigator.push({
      title: 'Results',
      component: SearchResultsComponent,
      passProps: {listings: listings}
    });
  }
}

module.exports = SearchPageOutput;
