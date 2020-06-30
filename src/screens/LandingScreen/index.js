/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {View, ToastAndroid, Image, FlatList, Dimensions} from 'react-native';
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

    this.state = {
      pageIndex: 0,
    };
  }

  setIndex(index) {
    this.setState({
      pageIndex: index,
    });
  }

  async continueWithGoogle() {
    try {
      await GoogleSignin.hasPlayServices();
      const {idToken} = await GoogleSignin.signIn();
      const googleCredential = auth.GoogleAuthProvider.credential(idToken);
      const resp = await auth().signInWithCredential(googleCredential);
      return resp.user.uid;
    } catch (error) {
      console.log('Error on Landing Screen');
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        ToastAndroid.showWithGravity(
          'You dont like OAuth? 🙁',
          ToastAndroid.SHORT,
          ToastAndroid.CENTER,
        );
      } else if (error.code === statusCodes.IN_PROGRESS) {
        ToastAndroid.showWithGravity(
          'Hey we are signing you in, chill 😅',
          ToastAndroid.SHORT,
          ToastAndroid.CENTER,
        );
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        ToastAndroid.showWithGravity(
          'Hey the Play Service was not found or is outdated 😱',
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

  renderScreen(item, index) {
    return (
      <View style={styles.innerView}>
        <Headline>{item.header}</Headline>
        <Image source={item.image} style={styles.illustration} />
        <Caption>{item.madeBy}</Caption>
        <Text style={{textAlign: 'justify', marginTop: 10}}>{item.body}</Text>
        {index === data.length - 1 ? (
          <Button
            mode="contained"
            style={styles.googleBtn}
            onPress={async () => {
              const {setUid} = this.context;
              const uid = await this.continueWithGoogle();
              setUid(uid);
            }}>
            Continue With Google
          </Button>
        ) : null}
      </View>
    );
  }

  render() {
    const {pageIndex} = this.state;
    return (
      <View style={styles.landingContainer}>
        <View style={styles.dotContainer}>
          {data.map((_, i) => {
            return (
              <View
                key={i}
                style={{
                  opacity: i === this.state.pageIndex ? 1 : 0.3,
                  height: 10,
                  width: 10,
                  backgroundColor: 'white',
                  margin: 6,
                  borderRadius: 5,
                }}
              />
            );
          })}
        </View>
        <FlatList
          style={{}}
          contentContainerStyle={{
            alignItems: 'stretch',
          }}
          data={data}
          keyExtractor={(_, index) => index}
          horizontal
          pagingEnabled
          scrollEnabled
          snapToAlignment="center"
          scrollEventThrottle={16}
          decelerationRate={'fast'}
          showsHorizontalScrollIndicator={false}
          renderItem={({item, index}) => this.renderScreen(item, index)}
          onScroll={({nativeEvent}) => {
            if (Math.round(nativeEvent.contentOffset.x / width) !== pageIndex) {
              this.setIndex(Math.round(nativeEvent.contentOffset.x / width));
            }
          }}
        />
      </View>
    );
  }
}

export default LandingScreen;
