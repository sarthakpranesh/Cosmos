import React, {useRef, useEffect} from 'react';
import {View, Text, Image, StyleSheet, Animated} from 'react-native';

const {Value} = Animated;

// importing firebase utils
import {isUserLoggedIn} from '../../utils/firebase';

const SplashScreen = (props) => {
  const start = useRef(new Value(0)).current;

  useEffect(() => {
    start.setValue(0);
    Animated.timing(start, {
      toValue: 1,
      duration: 2000,
      useNativeDriver: true,
    }).start(() => {
      isUserLoggedIn()
        .then((user) => {
          if (!user) {
            Animated.timing(start, {
              toValue: 0,
              duration: 1000,
              useNativeDriver: true,
            }).start(() => {
              props.navigation.navigate('userStartingStack');
            });
            return;
          }
          Animated.timing(start, {
            toValue: 0,
            duration: 1000,
            useNativeDriver: true,
          }).start(() => {
            props.navigation.navigate('mainAppStack');
          });
          return;
        })
        .catch((err) => {
          console.log(err.message);
        });
    });
    console.log('Starting animation');
  }, [props.navigation, start]);

  return (
    <View style={styles.viewStyles}>
      {console.log()}
      <Animated.Image
        source={require('../../../assets/splashScreenLogo.png')}
        style={{opacity: start}}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  viewStyles: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#1b262c',
  },
  textStyles: {
    color: '#bbe1fa',
    fontSize: 40,
    fontWeight: 'bold',
  },
});

export default SplashScreen;
