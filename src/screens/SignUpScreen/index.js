/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {
  View,
  Text,
  TextInput,
  Alert,
  TouchableOpacity,
  Animated,
  Dimensions,
} from 'react-native';

// importing styles
import styles from './styles';
import Styles from '../../Styles';

// importing firebase
import * as firebase from 'firebase';

// importing firebase functions
import {addUserToDB, updateDisplayName} from '../../utils/firebase';

// importing components
import ButtonLarge from '../../components/ButtonLarge';
import LoadingIndicator from '../../components/LoadingIndicator';

const {height, width} = Dimensions.get('window');

class SignUpScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      password: '',
      isLoading: false,
    };
    this.signUpFormOpacity = new Animated.Value(0);
    this.formY = new Animated.Value(height / 3);

    this.openSignUp = () => {
      Animated.timing(this.formY, {
        toValue: 0,
        duration: 1000,
        useNativeDriver: true,
      }).start();
    };

    this.onCloseSignUp = () => {
      Animated.timing(this.formY, {
        toValue: height / 2,
        duration: 1000,
        useNativeDriver: true,
      }).start(() => {
        props.navigation.navigate('LandingScreen');
      });
    };

    this.signUpFormOpacity = this.formY.interpolate({
      inputRange: [0, height / 2],
      outputRange: [1, 0],
    });

    this.emailInput = null;
    this.passwordInput = null;
    this.nameInput = null;
  }

  componentDidMount() {
    this.openSignUp();
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

  setIsLoading = (isLoading) => {
    this.setState({
      isLoading,
    });
  };

  onSubmitSignUp = () => {
    this.setIsLoading(true);
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

    const setIsLoading = this.setIsLoading;
    const starting = this.openSignUp;
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(async (userObject) => {
        await updateDisplayName(name);
        var user = {
          name: name,
          uid: userObject.user.uid,
        };
        await addUserToDB(user);
        this.props.navigation.navigate(' Home ');
      })
      .catch(function (error) {
        console.log(error.message);
        setIsLoading(false);
        starting();
        Alert.alert(
          'User Exists',
          'User with that Email already exists! Try Login instead',
          [{text: 'ok'}],
        );
      });
  };

  render() {
    const {isLoading} = this.state;

    if (isLoading) {
      return (
        <View style={Styles.containerLoginSign}>
          <LoadingIndicator />
        </View>
      );
    }

    return (
      <>
        <View style={Styles.containerLoginSign}>
          <Animated.View
            style={[
              styles.signUpFormContainer,
              {
                transform: [
                  {
                    translateY: this.formY,
                  },
                ],
                opacity: this.signUpFormOpacity,
              },
            ]}>
            <TouchableOpacity
              onPress={() => this.onCloseSignUp()}
              style={[styles.closeBtn, Styles.buttonShadow]}>
              <Text>x</Text>
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
              secureTextEntry={true}
            />
            <ButtonLarge onPress={this.onSubmitSignUp} title="Register" />
          </Animated.View>
        </View>
      </>
    );
  }
}

export default SignUpScreen;
