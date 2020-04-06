import React, {Component} from 'react';
import {View, StyleSheet, ActivityIndicator} from 'react-native';
import Styles from '../../Styles';

class LoadingIndicator extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={styles.activityContainer}>
        <ActivityIndicator size="large" color="#00ff00" />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  activityContainer: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default LoadingIndicator;
