import React, {Component} from 'react';
import {View, Dimensions, Animated, ToastAndroid} from 'react-native';
import {Text, Headline, Button} from 'react-native-paper';
import {GoogleSignin, statusCodes} from '@react-native-community/google-signin';
import auth from '@react-native-firebase/auth';

GoogleSignin.configure({
  webClientId:
    '340048764527-9nt30qgc4rj3p0hmhos5kkdfpb0cj8ta.apps.googleusercontent.com',
});

const {width} = Dimensions.get('screen');

// importing common styles
import styles from './styles.js';

class LandingScreen extends Component {
  constructor(props) {
    super(props);
    this.start = new Animated.Value(0);

    this.headlineTranslateX = this.start.interpolate({
      inputRange: [0, 0.8],
      outputRange: [-width, 0],
      extrapolate: 'clamp',
    });

    this.opacity = this.start.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 1],
      extrapolate: 'clamp',
    });
  }

  componentDidMount() {
    Animated.timing(this.start, {
      toValue: 1,
      duration: 2000,
      useNativeDriver: true,
    }).start();
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
    return (
      <View style={styles.landingContainer}>
        <Animated.View
          style={[
            {
              opacity: this.opacity,
              transform: [{translateX: this.headlineTranslateX}],
            },
          ]}>
          <Headline>Welcome to Cosmos</Headline>
        </Animated.View>
        <Animated.View
          style={[
            {
              opacity: this.opacity,
            },
          ]}>
          <Text>
            We are a open source project made and maintained by the community.
            The project is driven by the support of artists, photographers, etc
            throughout the world. Come be a part of our growing community 🙂
          </Text>
        </Animated.View>
        <Button
          mode="contained"
          style={styles.googleBtn}
          onPress={this.continueWithGoogle}>
          Continue With Google
        </Button>
      </View>
    );
  }
}

export default LandingScreen;
