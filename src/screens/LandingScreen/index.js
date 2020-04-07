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
import {isUserLoggedIn} from '../../utils/firebase';

// importing components
import ButtonLarge from '../../components/ButtonLarge';
import LoadingIndicator from '../../components/LoadingIndicator';

const {width, height} = Dimensions.get('window');

class LandingScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
    };
  }

  async UNSAFE_componentWillMount() {
    try {
      const isLogged = await isUserLoggedIn();
      if (isLogged) {
        this.props.navigation.navigate('mainAppStack');
        this.setState({
          isLoading: false,
        });
      } else {
        console.log('User not logged');
        this.setState({
          isLoading: false,
        });
      }
    } catch (err) {
      console.log(err.message);
    }
  }

  render() {
    const {isLoading} = this.state;

    if (isLoading) {
      return <LoadingIndicator />;
    }
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
