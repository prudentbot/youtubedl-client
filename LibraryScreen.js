/**
 * The examples provided by Facebook are for non-commercial testing and
 * evaluation purposes only.
 *
 * Facebook reserves all rights not expressly granted.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
 * OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NON INFRINGEMENT. IN NO EVENT SHALL
 * FACEBOOK BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN
 * AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
 * CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 *
 * @flow
 */
'use strict';

var React = require('react-native');
var {
  ActivityIndicatorIOS,
  ListView,
  Platform,
  ProgressBarAndroid,
  StyleSheet,
  Text,
  View,
  Component,
} = React;

var SearchBar = require('./SearchBar');
var SearchScreen = require('./SearchScreen');
var AudioPlayer = require('react-native-audioplayer');

var LibraryScreen = React.createClass({

  getInitialState: function() {
    // AudioPlayer.play('6SUS4jIA7Z.mp3');

    return {
      isLoading: false,
    };
  },

  _urlForQueryAndPage: function(query: string): string {
    var base = "http://localhost:3000/resources/"
    return base + query;
  },

  onSubmitEditing: function(event: Object) {
    var searchText = event.nativeEvent.text.toLowerCase();
    this.setState({
      isLoading:true
    });

    // console.log("onSubmitEditing");

    fetch(this._urlForQueryAndPage(searchText))
      .then((response) => response.json())
      .catch((error) => {
        // LOADING[query] = false;
        // resultsCache.dataForQuery[query] = undefined;
        //
        // this.setState({
        //   dataSource: this.getDataSource([]),
        //   isLoading: false,
        // });
        this.setState({isLoading: false});
        console.log(error);
      })
      .then((responseData) => {
        // LOADING[query] = false;
        // resultsCache.totalForQuery[query] = responseData.total;
        // resultsCache.dataForQuery[query] = responseData.movies;
        // resultsCache.nextPageNumberForQuery[query] = 2;
        //
        // if (this.state.filter !== sear) {
        //   // do not update state if the query is stale
        //   return;
        // }

        this.setState({
          isLoading: false
        });

        // console.log("responseData:")
        // console.log(responseData);
        this.props.navigator.push({
          title:searchText,
          component: SearchScreen,
          passProps: responseData
        })
        // this.setState({
        //   isLoading: false,
        //   dataSource: this.getDataSource(responseData.movies),
        // });
      })
      .done();

    // this.props.navigator.push({
    //   title: searchText,
    //   component: SearchScreen,
    //   onLeftButtonPress: () => this.refs.nav.pop(),
    // });
  },

  render:function() {
    return (
      <View>
        <SearchBar
          onSubmitEditing={this.onSubmitEditing}
          isLoading={this.state.isLoading}
          onFocus={() =>
            this.refs.listview && this.refs.listview.getScrollResponder().scrollTo({ x: 0, y: 0 })}
        />

        <Text style={styles.noMoviesText}>Library View!</Text>
      </View>
    );
  }
});

// var NoMovies = React.createClass({
//   render: function() {
//     var text = '';
//     if (this.props.filter) {
//       text = `No results for "${this.props.filter}"`;
//     } else if (!this.props.isLoading) {
//       // If we're looking at the latest movies, aren't currently loading, and
//       // still have no results, show a message
//       text = 'No movies found';
//     }
//
//     return (
//       <View style={[styles.container, styles.centerText]}>
//         <Text style={styles.noMoviesText}>{text}</Text>
//       </View>
//     );
//   }
// });

var styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  centerText: {
    alignItems: 'center',
  },
  noMoviesText: {
    marginTop: 80,
    color: '#888888',
  }
  // separator: {
  //   height: 1,
  //   backgroundColor: '#eeeeee',
  // },
  // scrollSpinner: {
  //   marginVertical: 20,
  // },
  // rowSeparator: {
  //   backgroundColor: 'rgba(0, 0, 0, 0.1)',
  //   height: 1,
  //   marginLeft: 4,
  // },
  // rowSeparatorHide: {
  //   opacity: 0.0,
  // },
});

module.exports = LibraryScreen;
//;
