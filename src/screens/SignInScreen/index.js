/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {
  View,
  Text,
  TextInput,
  Alert,
  Image,
  TouchableOpacity,
  Dimensions,
} from 'react-native';

// importing styles
import styles from './styles';
import Styles from '../../Styles';

// importing firebase
import * as firebase from 'firebase';

class SignInScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
    };

    this.emailInput = null;
    this.passwordInput = null;
    this.nameInput = null;
  }

  setEmail = (userEmail) => {
    if (userEmail === '') {
      this.setState({email: ''});
    }
    this.setState({email: userEmail});
  };

  setPassword = (userPassword) => {
    if (userPassword === '') {
      this.setState({password: ''});
    }
    this.setState({password: userPassword});
  };

  onSubmitSignIn = () => {
    const {email, password} = this.state;
    if (!email) {
      Alert.alert('Invalid Credentials', 'Please Provide an Email!', [
        {text: 'ok', onPress: () => this.emailInput.focus()},
      ]);
      return;
    }

    if (!password || password.length > 40 || password.length < 6) {
      Alert.alert(
        'Invalid Credentials',
        'Please make sure your password is in the range of 6 to 40 characters!',
        [{text: 'ok', onPress: () => this.passwordInput.focus()}],
      );
      return;
    }

    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(async (userObject) => {
        this.props.navigation.navigate(' Home ');
      })
      .catch(function (error) {
        console.log(error);
        Alert.alert('Problem logging In', error.message, [{text: 'ok'}]);
        return;
      });
  };

  render() {
    return (
      <>
        <View style={Styles.container}>
          <Image
            source={require('../../../assets/bg.jpg')}
            style={Styles.landingImage}
          />
          <View style={[styles.signInFormContainer]}>
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate('LandingScreen')}
              style={[styles.closeBtn, Styles.buttonShadow]}>
              <Text>X</Text>
            </TouchableOpacity>
            <TextInput
              ref={(input) => {
                this.emailInput = input;
              }}
              placeholder="Email"
              style={Styles.textInput}
              placeholderTextColor="black"
              onChangeText={(email) => this.setEmail(email)}
              value={this.state.email}
            />
            <TextInput
              ref={(input) => {
                this.passwordInput = input;
              }}
              placeholder="Password"
              style={Styles.textInput}
              placeholderTextColor="black"
              onChangeText={(password) => this.setPassword(password)}
              value={this.state.password}
            />
            <TouchableOpacity onPress={() => this.onSubmitSignIn()}>
              <View
                style={[
                  Styles.buttonLogin,
                  Styles.buttonShadow,
                  {
                    backgroundColor: '#2e71dc',
                  },
                ]}>
                <Text style={[Styles.btnText, {color: 'white'}]}>LOGIN</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </>
    );
  }
}

export default SignInScreen;
