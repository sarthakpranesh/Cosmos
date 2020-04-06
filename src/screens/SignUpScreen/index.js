/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {
  View,
  Text,
  TextInput,
  Alert,
  Image,
  TouchableOpacity,
} from 'react-native';

// importing styles
import styles from './styles';
import Styles from '../../Styles';

// importing firebase
import * as firebase from 'firebase';

// importing firebase functions
import {addUserToDB} from '../../utils/firebase';

// importing components
import ButtonLarge from '../../components/ButtonLarge';

class SignUpScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
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

  setName = (username) => {
    if (username === '') {
      this.setState({name: ''});
    }
    this.setState({name: username});
  };

  onSubmitSignUp = () => {
    const {email, password, name} = this.state;
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

    if (!name || name.length > 40 || name.length < 6) {
      Alert.alert(
        'Invalid Credentials',
        'Please make sure your username is in the range of 6 to 40 characters!',
        [{text: 'ok', onPress: () => this.nameInput.focus()}],
      );
      return;
    }

    firebase
      .auth()
      .setPersistence(firebase.per)
      .createUserWithEmailAndPassword(email, password)
      .then(async (userObject) => {
        var user = {
          username: userObject.user.displayName
            ? userObject.user.displayName
            : name,
          name: name,
          email: userObject.user.email,
          isEmailVerified: userObject.user.emailVerified,
          phoneNumber: userObject.user.phoneNumber
            ? userObject.user.phoneNumber
            : false,
          photoUrl: userObject.user.photoUrl ? userObject.user.photoURL : false,
          uid: userObject.user.uid,
        };
        await addUserToDB(user);
        this.props.navigation.navigate(' Home ');
      })
      .catch(function (error) {
        console.log(error.message);
        Alert.alert(
          'User Exists',
          'User with that Email already exists! Try Login instead',
          [{text: 'ok'}],
        );
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
          <View style={styles.signUpFormContainer}>
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate('LandingScreen')}
              style={[styles.closeBtn, Styles.buttonShadow]}>
              <Text>X</Text>
            </TouchableOpacity>
            <TextInput
              ref={(input) => {
                this.nameInput = input;
              }}
              placeholder="Username"
              style={Styles.textInput}
              placeholderTextColor="black"
              onChangeText={(name) => this.setName(name)}
              value={this.state.name}
            />
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
            <ButtonLarge onPress={this.onSubmitSignUp} title="Register" />
          </View>
        </View>
      </>
    );
  }
}

export default SignUpScreen;
