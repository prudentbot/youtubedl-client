/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */

'use strict';
import React, {
  AppRegistry,
  Component,
  StyleSheet,
  Text,
  View,
  Image,
  ListView,
  NavigatorIOS
} from 'react-native';

var MOCKED_MOVIES_DATA = [
  {title: 'Title', year: '2015', posters: {thumbnail: 'http://i.imgur.com/UePbdph.jpg'}},
];

var REQUEST_URL = 'https://raw.githubusercontent.com/facebook/react-native/master/docs/MoviesExample.json';

var LibraryScreen = require('./LibraryScreen');
var dismissKeyboard = require('dismissKeyboard');
var AudioPlayer = require('react-native-audioplayer');

class AwesomeProject extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
      }),
      loaded: false,
      isLoading: false,
      isSearching: false,
      searchText: ""
    }
    // this.onSubmitEditing = this.onSubmitEditing.bind(this)
    console.log(this.refs);

  }

  fetchData() {
    fetch(REQUEST_URL)
      .then((response) => response.json())
      .then((responseData) => {
        this.setState({
          dataSource: this.state.dataSource.cloneWithRows(responseData.movies),
          loaded: true,
          isSearching: false
        });
      })
      .done();
  }

  componentDidMount() {
    this.fetchData();
  }

  // onSearchChange: function(event: Object) {
  //   var filter = event.nativeEvent.text.toLowerCase();
  //
  //   this.clearTimeout(this.timeoutID);
  //   this.timeoutID = this.setTimeout(() => this.searchMovies(filter), 100);
  // }



  render() {

    //
    // if (!this.state.loaded) {
    //   return this.renderLoadingView();
    // }
    // return (
    //   <ListView
    //     dataSource={this.state.dataSource}
    //     renderRow={this.renderMovie}
    //     style={styles.listView}
    //   />
    // );

    return (
      <NavigatorIOS
        style={styles.container}
        initialRoute={{
          title: 'Library',
          component: LibraryScreen
        }}
      />
    );
  }

  renderLoadingView() {
    return (
      <View style={styles.container}>
        <Text>
          Loading movies...
        </Text>
      </View>
    );
  }

  renderMovie(movie) {
    return (
      <View style={styles.container}>
        <Image
          source={{uri: movie.posters.thumbnail}}
          style={styles.thumbnail}
        />
        <View style={styles.rightContainer}>
          <Text style={styles.title}>{movie.title}</Text>
          <Text style={styles.year}>{movie.year}</Text>
        </View>
      </View>
    );
  }

}

const styles = StyleSheet.create({
  // container: {
  //   flex: 1,
  //   flexDirection: 'row',
  //   justifyContent: 'center',
  //   alignItems: 'center',
  //   backgroundColor: '#F5FCFF',
  // },
  // thumbnail: {
  //   width: 53,
  //   height: 81,
  // },
  // rightContainer: {
  //   flex: 1,
  // },
  title: {
    fontSize: 20,
    marginBottom: 8,
    textAlign: 'center',
  },
  // year: {
  //   textAlign: 'center',
  // },
  // listView: {
  //   paddingTop: 20,
  //   backgroundColor: '#F5FCFF',
  // },
  container: {
    flex: 1,
    backgroundColor: 'white',
  },

});

AppRegistry.registerComponent('AwesomeProject', () => AwesomeProject);
