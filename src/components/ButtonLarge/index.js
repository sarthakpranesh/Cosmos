/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';

// importing styles
import Styles from '../../Styles';

class ButtonLarge extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <>
        <TouchableOpacity
          onPress={() => this.props.onPress()}
          activeOpacity={this.props.opacity ? this.props.opacity : 0.8}>
          <View
            style={[
              Styles.buttonLogin,
              Styles.buttonShadow,
              {
                backgroundColor: this.props.bigUglyBlue ? '#865f34' : 'white',
              },
            ]}>
            <Text
              style={[
                Styles.btnText,
                {color: this.props.bigUglyBlue ? 'white' : 'black'},
              ]}>
              {this.props.title ? this.props.title : 'Default'}
            </Text>
          </View>
        </TouchableOpacity>
      </>
    );
  }
}

export default ButtonLarge;
