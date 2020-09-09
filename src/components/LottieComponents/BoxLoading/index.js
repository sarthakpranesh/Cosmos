import React from 'react';
import {View, StyleSheet, Dimensions} from 'react-native';
import LottieView from 'lottie-react-native';

const {width} = Dimensions.get('window');

export default class BoxLoading extends React.Component {
  render() {
    return (
      <View style={styles.BoxLoadingContainer}>
        <LottieView
          source={require('../Animations/loading.json')}
          autoPlay
          loop
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  BoxLoadingContainer: {
    width: width / 10,
    height: width / 10,
  },
});
