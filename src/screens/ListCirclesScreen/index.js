import React, {Component} from 'react';
import {View} from 'react-native';
import {Text} from 'react-native-paper';

// importing styles
import styles from './styles.js';

class ListCircleScreen extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={styles.listCircleContainer}>
        <Text>THis is circles screen</Text>
      </View>
    );
  }
}

export default ListCircleScreen;
