/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Image,
  Alert,
} from 'react-native';

// importing common styles
import Styles from '../Styles';

// importing firebase
import * as firebase from 'firebase';

// importing firebase functions
import {addUserToDB, getUserObject} from '../utils/firebase';

const {width, height} = Dimensions.get('window');

class LoginScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      name: '',
      authMethod: '',
    };
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

  onSubmit = () => {
    if (this.state.authMethod === 'sign_up') {
      this.onSubmitSignUp();
    }

    if (this.state.authMethod === 'sign_in') {
      this.onSubmitSignIn();
    }
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
        const user = await getUserObject(userObject.user.uid);
        this.props.navigation.navigate('Main', {user});
      })
      .catch(function (error) {
        console.log(error);
        Alert.alert('Problem logging In', error.message, [{text: 'ok'}]);
        return;
      });
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
        this.props.navigation.navigate('Main', {user});
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
      <View style={styles.container} behavior={'height'}>
        {/* <Image
          source={require('../../assets/bg.jpg')}
          style={{
            height: height,
            width: width,
						zIndex: -100,
					}}
        /> */}

        {/* Different Login Options */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity>
            <View style={[Styles.buttonLogin]}>
              <Text style={styles.btnText}>SIGN IN</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity>
            <View
              style={[
                Styles.buttonLogin,
                {
                  backgroundColor: '#2e71dc',
                },
              ]}>
              <Text style={[styles.btnText, {color: 'white'}]}>SIGN UP</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'flex-end',
  },
  innerContainer: {
    ...StyleSheet.absoluteFill,
  },
  bgImage: {
    flex: 1,
    height: null,
    width: null,
  },
  buttonContainer: {
    height: height / 3,
    justifyContent: 'center',
  },
  btnText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  hiddenContainer: {
    height: height / 3,
    ...StyleSheet.absoluteFill,
    top: null,
    justifyContent: 'flex-end',
    backgroundColor: 'white',
  },
  closeBtn: {
    height: 40,
    width: 40,
    backgroundColor: 'white',
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    top: -20,
    left: width / 2 - 20,
  },
  textInput: {
    height: 50,
    borderRadius: 25,
    borderWidth: 0.5,
    marginHorizontal: 20,
    paddingHorizontal: 20,
    marginVertical: 5,
    borderColor: 'rgba(0,0,0,0.2)',
  },
});

export default LoginScreen;
