/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  Animated,
  Text,
  ToastAndroid,
} from 'react-native';
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from '@react-native-community/google-signin';
import auth from '@react-native-firebase/auth';

GoogleSignin.configure({
  webClientId:
    '340048764527-9nt30qgc4rj3p0hmhos5kkdfpb0cj8ta.apps.googleusercontent.com',
});

// importing common styles
import Styles from '../../Styles';

const height = Dimensions.get('window').height;

class LandingScreen extends Component {
  constructor(props) {
    super(props);
    this.start = new Animated.Value(0);
    this.opacity = new Animated.Value(0);

    this.starting = () => {
      Animated.timing(this.start, {
        toValue: height / 8,
        duration: 2000,
        useNativeDriver: true,
      }).start();
    };

    this.opacity = this.start.interpolate({
      inputRange: [0, height / 8],
      outputRange: [0, 1],
    });

    this.startBody = this.start.interpolate({
      inputRange: [0, height / 8],
      outputRange: [40, -40],
    });
  }

  async continueWithGoogle() {
    try {
      await GoogleSignin.hasPlayServices();
      const {idToken} = await GoogleSignin.signIn();
      const googleCredential = auth.GoogleAuthProvider.credential(idToken);
      return auth().signInWithCredential(googleCredential);
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        ToastAndroid.showWithGravity(
          'user cancelled the login flow',
          ToastAndroid.SHORT,
          ToastAndroid.CENTER,
        );
      } else if (error.code === statusCodes.IN_PROGRESS) {
        ToastAndroid.showWithGravity(
          'operation (e.g. sign in) is in progress already',
          ToastAndroid.SHORT,
          ToastAndroid.CENTER,
        );
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        ToastAndroid.showWithGravity(
          'play services not available or outdated',
          ToastAndroid.SHORT,
          ToastAndroid.CENTER,
        );
      } else {
        console.log(error);
        ToastAndroid.showWithGravity(
          error.message,
          ToastAndroid.SHORT,
          ToastAndroid.CENTER,
        );
      }
    }
  }

  render() {
    this.starting();
    return (
      <View style={[Styles.containerStarting]}>
        <Animated.View
          style={[
            {opacity: this.opacity, transform: [{translateY: this.start}]},
          ]}>
          <Text style={[Styles.textLarge]}>Welcome to Cosmos</Text>
        </Animated.View>
        <Animated.View
          style={[
            {
              opacity: Animated.multiply(0.6, this.opacity),
              transform: [{translateY: this.startBody}],
              marginHorizontal: 10,
            },
          ]}>
          <Text style={[Styles.textSmall]}>
            We are a open source project made and maintained by the community.
            The project is driven by the support of artists, photographers, etc
            throughout the world. Come be a part of our growing community 🙂
          </Text>
        </Animated.View>
        {/* Different Login Options */}
        <View style={styles.buttonContainer}>
          <GoogleSigninButton onPress={this.continueWithGoogle} />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  buttonContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default LandingScreen;
