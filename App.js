import {createSwitchNavigator, createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import {createBottomTabNavigator} from 'react-navigation-tabs';

import React from 'react';

// importing Firebase
import * as firebase from './src/configs/firebase';

// importing icons
import AddPictureIcon from './src/components/icons/AddPictureIcon';
import HomeIcon from './src/components/icons/HomeIcon';
import ProfileIcon from './src/components/icons/ProfileIcon';
import SettingsIcon from './src/components/icons/SettingsIcon';

// importing Screens
import SplashScreen from './src/screens/SpashScreen';
import LandingScreen from './src/screens/LandingScreen';
import SignUpScreen from './src/screens/SignUpScreen';
import SignInScreen from './src/screens/SignInScreen';
import AddImageScreen from './src/screens/AddImageScreen';
import Main from './src/screens/Main';
import ProfileScreen from './src/screens/ProfileScreen';
import MainSettingsScreen from './src/screens/MainSettingsScreen';
import PostViewScreen from './src/screens/PostViewScreen';

// importing default theme properties
import {colors} from './src/Constants';

const postViewStack = createStackNavigator(
  {
    ' Home ': {
      screen: Main,
    },
    PostViewScreen,
  },
  {
    initialRouteName: ' Home ',
    headerMode: 'none',
  },
);

const mainAppStack = createBottomTabNavigator(
  {
    ' Images ': {
      screen: AddImageScreen,
      navigationOptions: () => ({
        tabBarIcon: ({focused}) => <AddPictureIcon isFocused={focused} />,
      }),
    },
    postViewStack: {
      screen: postViewStack,
      navigationOptions: () => ({
        tabBarIcon: ({focused}) => <HomeIcon isFocused={focused} />,
      }),
    },
    ' Profile ': {
      screen: ProfileScreen,
      navigationOptions: () => ({
        tabBarIcon: ({focused}) => <ProfileIcon isFocused={focused} />,
      }),
    },
    ' Setting ': {
      screen: MainSettingsScreen,
      navigationOptions: () => ({
        tabBarIcon: ({focused}) => <SettingsIcon isFocused={focused} />,
      }),
    },
  },
  {
    initialRouteName: 'postViewStack',
    backBehavior: 'history',
    defaultNavigationOptions: {
      navigationOptions: {
        tabBarIcon: ({focused}) => {
          console.log(focused);
        },
      },
    },
    tabBarOptions: {
      showLabel: false,
      showIcon: true,
      keyboardHidesTabBar: true,
      style: {
        backgroundColor: colors.darkTheme.backgroundColor,
      },
    },
    lazy: true,
    animationEnabled: true,
    swipeEnabled: true,
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
