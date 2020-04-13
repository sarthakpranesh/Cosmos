/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {View, StyleSheet, Dimensions, Animated, Text} from 'react-native';

// importing common styles
import Styles from '../../Styles';

// importing components
import ButtonLarge from '../../components/ButtonLarge';

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
          <ButtonLarge
            onPress={() => this.props.navigation.navigate('SignInScreen')}
            title="Login"
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
  buttonContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default LandingScreen;
