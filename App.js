import {createSwitchNavigator, createAppContainer} from 'react-navigation';
import {createBottomTabNavigator} from 'react-navigation-tabs';

import React from 'react';
import Svg, {Image} from 'react-native-svg';

// importing Firebase
import * as firebase from './src/configs/firebase';

// importing local db
// import {getUserDataAsync} from './src/utils/localDb';

// importing Screens
import SplashScreen from './src/screens/SpashScreen';
import LandingScreen from './src/screens/LandingScreen';
import SignUpScreen from './src/screens/SignUpScreen';
import SignInScreen from './src/screens/SignInScreen';
import Main from './src/screens/Main';
import ProfileScreen from './src/screens/ProfileScreen';
import MainSettingsScreen from './src/screens/MainSettingsScreen';

const mainAppStack = createBottomTabNavigator(
  {
    ' Home ': {
      screen: Main,
    },
    ' Profile ': {
      screen: ProfileScreen,
    },
    ' Setting ': {
      screen: MainSettingsScreen,
    },
  },
  {
    initialRouteName: ' Home ',
    backBehavior: 'initialRoute',
    activeTintColor: 'green',
    defaultNavigationOptions: ({navigation}) => ({
      tabBarIcon: ({focused, horizontal, tintColor}) => {
        const {routeName} = navigation.state;
        if (routeName === ' Home ') {
          return (
            <Svg height={24} width={24}>
              <Image
                height={24}
                width={24}
                href={require('./assets/icons/home.png')}
              />
            </Svg>
          );
        }

        if (routeName === ' Setting ') {
          return (
            <Svg height={24} width={24}>
              <Image
                height={24}
                width={24}
                href={require('./assets/icons/settings.png')}
              />
            </Svg>
          );
        }

        return (
          <Svg height={24} width={24}>
            <Image
              height={24}
              width={24}
              href={require('./assets/icons/profile.png')}
            />
          </Svg>
        );
      },
    }),
    tabBarOptions: {
      showLabel: false,
      showIcon: true,
      activeBackgroundColor: 'rgba(0,0,0, 0.1)',
      activeTintColor: 'red',
      inactiveTintColor: 'gray',
      keyboardHidesTabBar: true,
    },
    animationEnabled: true,
    swipeEnabled: false,
  },
);

const userStartingStack = createSwitchNavigator(
  {
    LandingScreen,
    SignUpScreen,
    SignInScreen,
  },
  {
    initialRouteName: 'LandingScreen',
  },
);

const defaultApp = createSwitchNavigator(
  {
    SplashScreen,
    userStartingStack,
    mainAppStack,
  },
  {
    initialRouteName: 'SplashScreen',
  },
);

export default createAppContainer(defaultApp);
