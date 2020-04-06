import React, {Component} from 'react';
import {View, Text, StyleSheet, Image, Dimensions} from 'react-native';

import Animated, {Easing} from 'react-native-reanimated';
import {TapGestureHandler, State} from 'react-native-gesture-handler';
const {width, height} = Dimensions.get('window');

const {
  Value,
  event,
  block,
  cond,
  eq,
  set,
  Clock,
  startClock,
  stopClock,
  debug,
  timing,
  clockRunning,
  interpolate,
  Extrapolate,
} = Animated;

class MusicApp extends Component {
  constructor() {
    super();
    this._animatedValue = new Value(0);

    this.buttonOpacity = new Value(1);

    this.onStateChange = event([
      {
        nativeEvent: ({state}) =>
          block([
            cond(eq(state, State.END), set(this.buttonOpacity, 0.1, 1, 0)),
          ]),
      },
    ]);

    this.buttonY = interpolate(this.buttonOpacity, {
      inputRange: [0, 1],
      outputRange: [100, 0],
      extrapolate: Extrapolate.CLAMP,
    });

    this.bgY = interpolate(this.buttonOpacity, {
      inputRange: [0, 1],
      outputRange: [-height / 3, 0],
      extrapolate: Extrapolate.CLAMP,
    });
  }
  render() {
    return (
      <View
        // eslint-disable-next-line react-native/no-inline-styles
        style={{
          flex: 1,
          backgroundColor: 'white',
          justifyContent: 'flex-end',
        }}>
        <Animated.View
          style={{
            ...StyleSheet.absoluteFill,
            transform: [{translateY: this.bgY}],
          }}>
          <Image
            source={require('../../assets/bg.jpg')}
            // eslint-disable-next-line react-native/no-inline-styles
            style={{flex: 1, height: null, width: null}}
          />
        </Animated.View>
        <View style={{height: height / 3, justifyContent: 'center'}}>
          <TapGestureHandler onHandlerStateChange={this.onStateChange}>
            <Animated.View
              style={{
                ...styles.button,
                opacity: this.buttonOpacity,
                transform: [{translateY: this.buttonY}],
              }}>
              <Text style={{fontSize: 20, fontWeight: 'bold'}}>SIGN IN</Text>
            </Animated.View>
          </TapGestureHandler>
          <TapGestureHandler onHandlerStateChange={this.onStateChange}>
            <Animated.View
              style={{
                ...styles.button,
                backgroundColor: '#2E71DC',
                opacity: this.buttonOpacity,
                transform: [{translateY: this.buttonY}],
              }}>
              <Text style={{fontSize: 20, fontWeight: 'bold', color: 'white'}}>
                SIGN IN WITH FACEBOOK
              </Text>
            </Animated.View>
          </TapGestureHandler>
        </View>
      </View>
    );
  }
}
export default MusicApp;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    backgroundColor: 'white',
    height: 70,
    marginHorizontal: 20,
    borderRadius: 35,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 5,
  },
});
