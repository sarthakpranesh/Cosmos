import {createSwitchNavigator, createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import {createBottomTabNavigator} from 'react-navigation-tabs';

// importing Firebase
import * as firebase from './src/configs/firebase';

// importing local db
// import {getUserDataAsync} from './src/utils/localDb';

// importing Screens
import LandingScreen from './src/screens/LandingScreen';
import SignUpScreen from './src/screens/SignUpScreen';
import SignInScreen from './src/screens/SignInScreen';
import Main from './src/screens/Main';
import ProfileScreen from './src/screens/ProfileScreen';
import MainSettingsScreen from './src/screens/MainSettingsScreen';

const profileStack = createStackNavigator(
  {
    ProfileScreen,
    MainSettingsScreen,
  },
  {
    initialRouteName: 'ProfileScreen',
    backBehavior: 'initialRoute',
    headerMode: 'none',
  },
);

const mainAppStack = createBottomTabNavigator(
  {
    ' Home ': {
      screen: Main,
    },
    ' Profile ': {
      screen: profileStack,
    },
  },
  {
    initialRouteName: ' Home ',
    backBehavior: 'initialRoute',
    headerMode: 'none',
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
    userStartingStack,
    mainAppStack,
  },
  {
    initialRouteName: 'userStartingStack',
  },
);

export default createAppContainer(defaultApp);
