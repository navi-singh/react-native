/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View
} from 'react-native';
import * as firebase from 'firebase';
import { Provider} from 'react-redux';
import { createStore } from 'redux';
import Login from './src/components/Login';
import Loader from './src/components/Loader';
import Navigation from './src/components/Navigation';
import reducers from './src/reducers/PeopleReducer';

const store = createStore(
  reducers,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
export default class App extends Component {
  state = {
    loggedIn: null,
  };

  componentWillMount() {
    firebase.initializeApp({
      apiKey: "AIzaSyDy0-ZATRyA6Ct3cG3xh5k-ZGHNZipF69w",
      authDomain: "crmlinkedin-78523.firebaseapp.com",
      databaseURL: "https://crmlinkedin-78523.firebaseio.com",
      projectId: "crmlinkedin-78523",
      storageBucket: "",
      messagingSenderId: "648539977174"
    });

    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({ loggedIn: true });
      } else {
        this.setState({ loggedIn: false });
      }
    });
  }

  renderInitialView() {
    switch (this.state.loggedIn) {
      case true:
        return <Navigation />;
      case false:
        return <Login />;
      default:
        return <Loader size="large" />
    }
  }

  render() {
    return (
      <Provider store={store}>
        <View style={styles.container}>
          {this.renderInitialView()}
        </View>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
});
