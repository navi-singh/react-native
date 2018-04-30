/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';
import { MKTextField, MKColor, MKButton } from 'react-native-material-kit';
import Loader from './Loader';
import firebase from 'firebase';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  form: {
    paddingBottom: 10,
    width: 200,
  },
  fieldStyles: {
    height: 40,
    color: MKColor.Orange,
    width: 200,
  },
  loginButtonArea: {
    marginTop: 20,
  },
  errorMessage: {
    marginTop: 15,
    fontSize: 15,
    color: 'red',
    alignSelf: 'center',
  },
});

const LoginButton = MKButton.coloredButton()
  .withText('LOGIN')
  .build();

export default class Login extends Component {
  state = {
    email: '',
    password: '',
    error: '',
    loading: false,
  };

  onButtonPress() {
    const {email, password} = this.state;
    this.setState({error:'', loading: true});

    firebase.auth().signInWithEmailAndPassword(email, password)
      .then(this.onAuthSuccess.bind(this))
      .catch(() => {
        firebase.auth().createUserWithEmailAndPassword(email, password)
          .then(this.onAuthSuccess.bind(this))
          .catch(this.onAuthFailed.bind(this));
      });
  }

  onAuthSuccess() {
    this.setState({
      email: '',
      password: '',
      error: '',
      loading: false,
    });
  }

  onAuthFailed() {
    this.setState({
      error: 'Authentication failed',
      loading: false,
    });
  }

  renderLoader() {
      if(this.state.loading) {
        return <Loader size="large"/>;
      } else {
        return <LoginButton onPress={this.onButtonPress.bind(this)} />
      }
  }

  render() {
    return (
      <View style={styles.container}>
        <View style = {styles.form}>
          <Text>
            Login or create an account
          </Text>
          <MKTextField
            text={this.state.email}
            onTextChange={email => this.setState({ email })}
            textInputStyle={styles.fieldStyles}
            placeholder={'Email....'}
            tintColor={MKColor.Teal}
          />
          <MKTextField
            text={this.state.password}
            onTextChange={password => this.setState({ password })}
            textInputStyle={styles.fieldStyles}
            placeholder={'password....'}
            tintColor={MKColor.Teal}
            password={true}
          />
          <Text style = {styles.errorMessage}>
            {this.state.error}
          </Text>
          <View style={styles.loginButtonArea}>
            {this.renderLoader()}
          </View>
        </View>
      </View>
    );
  }
}
