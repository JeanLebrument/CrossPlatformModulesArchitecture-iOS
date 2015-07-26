'use strict';

var React = require('react-native');
var SearchResultOutput = require('../Output/SearchResultOutput');
var SearchResultsStore = require('../../../Core/Modules/SearchResults/Store/SearchResultsStore');
var SearchResultsAction = require('../../../Core/Modules/SearchResults/Action/SearchResultsActionNative');


var {
  StyleSheet,
  Image,
  View,
  TouchableHighlight,
  ListView,
  Text,
  Component,
  ActivityIndicatorIOS,
  AlertIOS
} = React;

var styles = StyleSheet.create({
  container: {
    padding: 30,
    marginTop: 65,
    alignItems: 'center'
  },
  thumb: {
    width: 80,
    height: 80,
    marginRight: 10
  },
  textContainer: {
    flex: 1
  },
  separator: {
    height: 1,
    backgroundColor: '#dddddd'
  },
  price: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#48BBEC'
  },
  title: {
    fontSize: 20,
    color: '#656565'
  },
  rowContainer: {
    flexDirection: 'row',
    padding: 10
  }
});

class SearchResultsComponent extends Component {
  constructor(props) {
    super(props);

    var dataSource = new ListView.DataSource(
      {rowHasChanged: (r1, r2) => r1.guid !== r2.guid});

    this.state = {
      isLoading: true,
      dataSource: dataSource.cloneWithRows([]),
      listings: null,
      resultError: null
    };
  }

  componentDidMount() {
    SearchResultsStore.addChangeListener(this.resultsFounds.bind(this));

    SearchResultsAction.searchResultsForLocation(this.props.location);
  }

  componentWillUnmount() {
    SearchResultsStore.removeChangeListener(this.resultsFounds.bind(this));
  }

  resultsFounds() {
    var results = SearchResultsStore.results;
    var formatedLocation = results && results.location ? results.location : '';
    var error = SearchResultsStore.resultError;

    if (error && error.message && error.message !== '') {
      AlertIOS.alert(
        'An error occured',
        error.message,
        [
          {text: 'Ok', onPress: () => this.props.navigator.pop()},
        ]
      )
    }

    this.setState({
      isLoading: false,
      dataSource: this.state.dataSource.cloneWithRows(results.listings),
      resultError: error,
      listings: results.listings,
    });
  }

  rowPressed(propertyGuid) {
    var property = this.state.listings.filter(prop => prop.guid === propertyGuid)[0];

    SearchResultOutput.goToNextModule(this, property);
  }

  renderRow(rowData, sectionID, rowID) {
    var price = rowData.price_formatted.split(' ')[0];

    return (
      <TouchableHighlight onPress={() => this.rowPressed(rowData.guid)}
          underlayColor='#dddddd'>
        <View>
          <View style={styles.rowContainer}>
            <Image style={styles.thumb} source={{ uri: rowData.img_url }} />
            <View style={styles.textContainer}>
              <Text style={styles.price}>£{price}</Text>
              <Text style={styles.title}
                    numberOfLines={1}>{rowData.title}</Text>
            </View>
          </View>
          <View style={styles.separator}/>
        </View>
      </TouchableHighlight>
    );
  }

  render() {
    if (this.state.isLoading) {
      return (
        <View style={styles.container}>
          <ActivityIndicatorIOS size='large' />
        </View>
      );
    }

    return (
      <ListView dataSource={this.state.dataSource}
        renderRow={this.renderRow.bind(this)} />
    );
  }
}


module.exports = SearchResultsComponent;
