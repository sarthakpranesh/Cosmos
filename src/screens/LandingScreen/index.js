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
import Styles from '../../Styles';

// importing firebase
import * as firebase from 'firebase';

// importing firebase functions
import {addUserToDB, getUserObject} from '../../utils/firebase';

const {width, height} = Dimensions.get('window');

class LandingScreen extends Component {
  constructor(props) {
    super(props);
  }

  async UNSAFE_componentWillMount() {
    const user = await firebase.auth().currentUser;
    if (user) {
      console.log(user.uid);
      this.props.navigation.navigate('mainAppStack');
    } else {
      console.log('User not logged');
    }
  }

  render() {
    return (
      <View style={Styles.container} behavior={'height'}>
        <Image
          source={require('../../../assets/bg.jpg')}
          style={Styles.landingImage}
        />

        {/* Different Login Options */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate('SignInScreen')}>
            <View style={[Styles.buttonLogin, Styles.buttonShadow]}>
              <Text style={Styles.btnText}>SIGN IN</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate('SignUpScreen')}>
            <View
              style={[
                Styles.buttonLogin,
                Styles.buttonShadow,
                {
                  backgroundColor: '#2e71dc',
                },
              ]}>
              <Text style={[Styles.btnText, {color: 'white'}]}>SIGN UP</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
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
  hiddenContainer: {
    height: height / 3,
    ...StyleSheet.absoluteFill,
    top: null,
    justifyContent: 'flex-end',
    backgroundColor: 'white',
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

export default LandingScreen;
