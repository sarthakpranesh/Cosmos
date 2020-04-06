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

// importing components
import ButtonLarge from '../../components/ButtonLarge';

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
          <ButtonLarge
            onPress={() => this.props.navigation.navigate('SignInScreen')}
            title="Sign In"
          />
          <ButtonLarge
            onPress={() => this.props.navigation.navigate('SignUpScreen')}
            bigUglyBlue
            title="Sign Up"
          />
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
