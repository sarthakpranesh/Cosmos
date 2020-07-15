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
import {GoogleSignin, statusCodes} from '@react-native-community/google-signin';
import auth from '@react-native-firebase/auth';

// importing context
import {Context as UserContext} from '../../contexts/UserContext.js';

// importing common styles
import styles from './styles.js';

const {width} = Dimensions.get('screen');

GoogleSignin.configure({
  webClientId:
    '340048764527-9nt30qgc4rj3p0hmhos5kkdfpb0cj8ta.apps.googleusercontent.com',
});

const data = [
  {
    image: require('../../../assets/newBorn.png'),
    madeBy: 'Illustration by Olga Nesnova from Icons8',
    header: 'Welcome to Cosmos',
    body:
      'We are a Young Open Source project made and maintained by the community. Our focus is to provide you a professional social media 😉',
  },
  {
    image: require('../../../assets/boxes.png'),
    madeBy: 'Illustration by  Anna Golde from  Icons8',
    header: 'Its All About Boxes',
    body:
      'Control what you share and where you share. Boxes allows you to group people of similar interests, organizations and niche 📦',
  },
  {
    image: require('../../../assets/box.png'),
    madeBy: 'Illustration by  Icons 8 from  Icons8',
    header: 'Here is a Box',
    body:
      'You can add your friends by their emails and have full control on your box. So why wait come join us!',
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
    const opacity = this.index.interpolate({
      inputRange: [index - 1, index, index + 1],
      outputRange: [0, 1, 0],
      extrapolate: 'clamp',
    });
    const rotate = this.index.interpolate({
      inputRange: [index - 1, index, index + 1],
      outputRange: ['-30deg', '0deg', '30deg'],
      extrapolate: 'clamp',
    });
    const scale = this.index.interpolate({
      inputRange: [index - 1, index, index + 1],
      outputRange: [0.5, 1, 0.5],
      extrapolate: 'clamp',
    });
    return (
      <View style={styles.innerView}>
        <Headline>{item.header}</Headline>
        <Animated.Image
          source={item.image}
          style={[
            styles.illustration,
            {opacity, transform: [{rotate}, {scale}]},
          ]}
        />
        <Caption>{item.madeBy}</Caption>
        <Text style={{textAlign: 'justify', marginTop: 10}}>{item.body}</Text>
        <Button
          mode="contained"
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
            Vibration.vibrate(6);
          }}
        />
      </View>
    );
  }
}

export default LandingScreen;
