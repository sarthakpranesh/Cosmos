import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

// importing firebase utils
import {isUserLoggedIn} from '../../utils/firebase';

class SplashScreen extends React.Component {
  async componentDidMount() {
    // Preload data from an external API
    // Preload data using AsyncStorage
    const loggedIn = await isUserLoggedIn();
    if (loggedIn) {
      this.props.navigation.navigate('mainAppStack');
    }
    this.props.navigation.navigate('userStartingStack');
  }

  render() {
    return (
      <View style={styles.viewStyles}>
        <Text style={styles.textStyles}>COSMOS</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  viewStyles: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'orange',
  },
  textStyles: {
    color: 'white',
    fontSize: 40,
    fontWeight: 'bold',
  },
});

export default SplashScreen;
