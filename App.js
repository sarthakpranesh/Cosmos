import {createSwitchNavigator, createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';

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

const settingsStack = createStackNavigator(
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

const mainAppStack = createStackNavigator(
  {
    Main,
    settingsStack,
  },
  {
    initialRouteName: 'Main',
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
