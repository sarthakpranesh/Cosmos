import React, {Component} from 'react';
import {View, StyleSheet, Dimensions, Image} from 'react-native';

// importing common styles
import Styles from '../../Styles';

// importing firebase utils
import {isUserLoggedIn} from '../../utils/firebase';

// importing components
import ButtonLarge from '../../components/ButtonLarge';
import LoadingIndicator from '../../components/LoadingIndicator';

const height = Dimensions.get('window').height;

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
            title="SIGN IN"
          />
          <ButtonLarge
            onPress={() => this.props.navigation.navigate('SignUpScreen')}
            bigUglyBlue
            title="SIGN UP"
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  buttonContainer: {
    height: height / 3 - 20,
    justifyContent: 'flex-start',
    marginTop: 40,
  },
});

export default LandingScreen;
