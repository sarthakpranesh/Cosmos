import {createSwitchNavigator, createAppContainer} from 'react-navigation';
import {createBottomTabNavigator} from 'react-navigation-tabs';

import React from 'react';

// importing Firebase
import * as firebase from './src/configs/firebase';

// importing icons
import HomeIcon from './src/components/icons/HomeIcon';
import ProfileIcon from './src/components/icons/ProfileIcon';
import SettingsIcon from './src/components/icons/SettingsIcon';

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
          return <HomeIcon />;
        }

        if (routeName === ' Setting ') {
          return <SettingsIcon />;
        }

        return <ProfileIcon />;
      },
    }),
    tabBarOptions: {
      showLabel: false,
      showIcon: true,
      activeBackgroundColor: false,
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
