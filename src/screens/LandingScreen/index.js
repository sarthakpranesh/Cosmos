/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {
  View,
  ToastAndroid,
  FlatList,
  Dimensions,
  Animated,
  Vibration,
  TouchableWithoutFeedback,
} from 'react-native';
import {Text, Headline, Button, Caption} from 'react-native-paper';
import LottieView from 'lottie-react-native';
import {GoogleSignin, statusCodes} from '@react-native-community/google-signin';
import auth from '@react-native-firebase/auth';

// importing context
import {Context as UserContext} from '../../contexts/UserContext.js';

// importing common styles
import styles from './styles.js';
import Styles from '../../Styles.js';

const {width} = Dimensions.get('screen');

GoogleSignin.configure({
  webClientId:
    '340048764527-9nt30qgc4rj3p0hmhos5kkdfpb0cj8ta.apps.googleusercontent.com',
});

const data = [
  {
    source: require('../../components/LottieComponents/Animations/welcome.json'),
    madeBy: 'Animation by Abdul Latif from lottiefiles',
    header: 'Welcome to Cosmos',
    body:
      'We are a Young Open Source project made and maintained by the community. Our focus is to provide you a professional social media 😉',
  },
  {
    source: require('../../components/LottieComponents/Animations/groups.json'),
    madeBy: 'Animation by Usama Razzaq from lottiefiles',
    header: 'Its All About Boxes',
    body:
      'Control what you share and where you share. Boxes allows you to group people of similar interests, organizations and niche 📦',
  },
  {
    source: require('../../components/LottieComponents/Animations/box.json'),
    madeBy: 'Animation by John Romeio Icons 8 from lottiefiles',
    header: 'Here is a Box',
    body:
      "You can add your friends by their emails and have full control on your box. Each box is a separate private space for it's members to share content with each other",
  },
  {
    source: require('../../components/LottieComponents/Animations/clock.json'),
    madeBy: 'Animation by Auttapon Nakharaj Icons 8 from lottiefiles',
    header: 'Clean slate each day',
    body:
      'Each post has a count down clock set for 24 hours before it is removed. Hence we aim to give you a clean slate each day to work with. So why wait, Come Join Us!',
  },
];

class LandingScreen extends Component {
  static contextType = UserContext;
  constructor(props) {
    super(props);

    this.flatList = null;
    this.index = new Animated.Value(0);
  }

  async continueWithGoogle() {
    const {setUid} = this.context;
    try {
      await GoogleSignin.hasPlayServices();
      const {idToken} = await GoogleSignin.signIn();
      const googleCredential = auth.GoogleAuthProvider.credential(idToken);
      const resp = await auth().signInWithCredential(googleCredential);
      return setUid(resp.user.uid);
    } catch (error) {
      console.log('Error while user clicked Continue With Google Button');
      switch (error.code) {
        case statusCodes.SIGN_IN_CANCELLED: {
          ToastAndroid.showWithGravity(
            'You dont like OAuth? 🙁',
            ToastAndroid.SHORT,
            ToastAndroid.CENTER,
          );
          break;
        }
        case statusCodes.IN_PROGRESS: {
          ToastAndroid.showWithGravity(
            'Hey we are signing you in, chill 😅',
            ToastAndroid.SHORT,
            ToastAndroid.CENTER,
          );
          break;
        }
        case statusCodes.PLAY_SERVICES_NOT_AVAILABLE: {
          ToastAndroid.showWithGravity(
            'Hey the Play Service was not found or is outdated 😱',
            ToastAndroid.SHORT,
            ToastAndroid.CENTER,
          );
          break;
        }
        default: {
          console.log(error.code);
          ToastAndroid.showWithGravity(
            error.message,
            ToastAndroid.SHORT,
            ToastAndroid.CENTER,
          );
        }
      }
    }
  }

  renderScreen(item, index) {
    return (
      <View style={styles.innerView}>
        <View style={{width: width, height: width / 1.5}}>
          <LottieView source={item.source} autoPlay />
        </View>
        <Caption style={Styles.fontSmall}>{item.madeBy}</Caption>
        <Headline style={Styles.fontLarge}>{item.header}</Headline>
        <Text
          style={[{textAlign: 'justify', marginTop: 10}, Styles.fontMedium]}>
          {item.body}
        </Text>
        <Button
          mode="contained"
          labelStyle={Styles.fontSmall}
          style={styles.googleBtn}
          onPress={
            index === data.length - 1
              ? () => this.continueWithGoogle()
              : () =>
                  this.flatList.scrollToIndex({
                    animated: true,
                    index: index + 1,
                  })
          }>
          {index === data.length - 1 ? 'Continue With Google' : 'Next'}
        </Button>
      </View>
    );
  }

  render() {
    return (
      <View style={styles.landingContainer}>
        <View style={styles.dotContainer}>
          {data.map((_, i) => {
            return (
              <TouchableWithoutFeedback
                key={i}
                onPress={() =>
                  this.flatList.scrollToIndex({animated: true, index: i})
                }>
                <Animated.View
                  style={{
                    opacity: this.index.interpolate({
                      inputRange: [i - 1, i, i + 1],
                      outputRange: [0.3, 1, 0.3],
                      extrapolate: 'clamp',
                    }),
                    height: 10,
                    width: 10,
                    backgroundColor: 'white',
                    margin: 6,
                    borderRadius: 5,
                  }}
                />
              </TouchableWithoutFeedback>
            );
          })}
        </View>
        <FlatList
          ref={(r) => (this.flatList = r)}
          style={{}}
          contentContainerStyle={{
            alignItems: 'stretch',
          }}
          data={data}
          keyExtractor={(item) => item.header}
          horizontal
          pagingEnabled
          scrollEnabled
          snapToAlignment="center"
          scrollEventThrottle={16}
          decelerationRate={'fast'}
          showsHorizontalScrollIndicator={false}
          renderItem={({item, index}) => this.renderScreen(item, index)}
          onScroll={({nativeEvent}) => {
            this.index.setValue(nativeEvent.contentOffset.x / width);
          }}
        />
      </View>
    );
  }
}

export default LandingScreen;
