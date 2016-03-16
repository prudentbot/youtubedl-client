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
  TouchableHighlight,
  Text,
  View,
} = React;

var Icon = require('react-native-vector-icons/FontAwesome');

// var TimerMixin = require('react-timer-mixin');
//
// var invariant = require('fbjs/lib/invariant');
// var dismissKeyboard = require('dismissKeyboard');
//
// var MovieCell = require('./MovieCell');
// var MovieScreen = require('./MovieScreen');
// var SearchBar = require('SearchBar');

/**
 * This is for demo purposes only, and rate limited.
 * In case you want to use the Rotten Tomatoes' API on a real app you should
 * create an account at http://developer.rottentomatoes.com/
 */
var SearchScreen = React.createClass({

  getInitialState: function() {
    console.log(this.props.items);
    var dataSource = (new ListView.DataSource({
      rowHasChanged: (row1, row2) => row1 !== row2,
    })).cloneWithRows(this.props.items);

    return {
      dataSource: dataSource
    };
  },

  onSelect: function(searchResult: Object) {
    console.log(searchResult);
  },

  renderRow: function(
    searchResult: Object,
    sectionID: number | string,
    rowID: number | string,
    highlightRowFunc: (sectionID: ?number | string, rowID: ?number | string) => void,
    ) {

    return (
      <View style={styles.container}>
        <Text> Result: {searchResult.snippet.title} </Text>
        <View style={styles.rightContainer}>
          <TouchableHighlight
            onPress={() => this.onSelect(searchResult)}>
              <Icon name="play" size={30} color="#900"/>
          </TouchableHighlight>
        </View>
      </View>

      // <MovieCell
      //   key={movie.id}
      //   onSelect={() => this.selectMovie(movie)}
      //   onHighlight={() => highlightRowFunc(sectionID, rowID)}
      //   onUnhighlight={() => highlightRowFunc(null, null)}
      //   movie={movie}
      // />
      //<
    );
  },

  renderSeparator: function(
    sectionID: number | string,
    rowID: number | string,
    adjacentRowHighlighted: boolean
  ) {
    var style = styles.rowSeparator;
    if (adjacentRowHighlighted) {
        style = [style, styles.rowSeparatorHide];
    }
    return (
      <View key={'SEP_' + sectionID + '_' + rowID}  style={style}/>
    );
  },

  getDataSource: function(searchResults: Array<any>): ListView.DataSource {
    return this.state.dataSource.cloneWithRows(searchResults);
  },

  render: function() {

    return (
      <ListView
        ref="listview"
        renderSeparator={this.renderSeparator}
        dataSource={this.state.dataSource}
        renderRow={this.renderRow}
        keyboardDismissMode="on-drag"
        keyboardShouldPersistTaps={true}
      />
    );
  }
});

var NoMovies = React.createClass({
  render: function() {
    var text = '';
    if (this.props.filter) {
      text = `No results for "${this.props.filter}"`;
    } else if (!this.props.isLoading) {
      // If we're looking at the latest movies, aren't currently loading, and
      // still have no results, show a message
      text = 'No movies found';
    }

    return (
      <View style={[styles.container, styles.centerText]}>
        <Text style={styles.noMoviesText}>{text}</Text>
      </View>
    );
  }
});

var styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    flexDirection: 'row'
  },
  rightContainer: {
    flex:1,
    justifyContent: 'flex-end',
  },
  centerText: {
    alignItems: 'center',
  },
  noMoviesText: {
    marginTop: 80,
    color: '#888888',
  },
  separator: {
    height: 1,
    backgroundColor: '#eeeeee',
  },
  scrollSpinner: {
    marginVertical: 20,
  },
  rowSeparator: {
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    height: 1,
    marginLeft: 4,
  },
  rowSeparatorHide: {
    opacity: 0.0,
  }
});

module.exports = SearchScreen;
