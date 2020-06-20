import React, {Component} from 'react';
import {StatusBar} from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import auth from '@react-native-firebase/auth';
import {Provider as PaperProvider, DarkTheme} from 'react-native-paper';

// importing icons
import AddPictureIcon from './src/components/icons/AddPictureIcon/index.js';
import HomeIcon from './src/components/icons/HomeIcon/index.js';
import ProfileIcon from './src/components/icons/ProfileIcon/index.js';

// importing Screens
import LandingScreen from './src/screens/LandingScreen/index.js';
import AddImageScreen from './src/screens/AddImageScreen/index.js';
import ListCirclesScreen from './src/screens/ListCirclesScreen/index.js';
import HomeScreen from './src/screens/HomeScreen/index.js';
import ProfileScreen from './src/screens/ProfileScreen/index.js';
import MainSettingsScreen from './src/screens/MainSettingsScreen/index.js';
import PostViewScreen from './src/screens/PostViewScreen';

import AppHeader from './src/components/AppBar/index.js';

const Stack = createStackNavigator();
const Tab = createMaterialBottomTabNavigator();

class PostViewProfileStack extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Stack.Navigator
        initialRouteName="ProfileScreen"
        keyboardHandlingEnabled={true}
        mode="modal"
        lazy={true}
        headerMode="none">
        <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
        <Stack.Screen name="Postview" component={PostViewScreen} />
        <Stack.Screen name="Setting" component={MainSettingsScreen} />
      </Stack.Navigator>
    );
  }
}

class PostViewStack extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Stack.Navigator
        initialRouteName="HomeScreen"
        keyboardHandlingEnabled={true}
        lazy={true}
        headerMode="float">
        <Stack.Screen
          options={{
            header: ({navigation}) => {
              return (
                <AppHeader navigation={navigation} routeName="HomeScreen" />
              );
            },
          }}
          name="HomeScreen"
          component={HomeScreen}
        />
        <Stack.Screen
          options={{
            header: ({navigation}) => {
              return (
                <AppHeader navigation={navigation} routeName="ListCircle" />
              );
            },
          }}
          name="ListCircle"
          component={ListCirclesScreen}
        />
        <Stack.Screen
          options={{header: null}}
          name="Postview"
          component={PostViewScreen}
        />
      </Stack.Navigator>
    );
  }
}

class MainAppStack extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: false,
      isStarting: true,
    };
  }

  componentDidMount() {
    auth().onAuthStateChanged((user) => {
      if (this.state.isStarting) {
        SplashScreen.hide();
        this.setState({
          isStarting: false,
        });
      }
      this.setState({
        isLoggedIn: user ? true : false,
      });
    });
  }

  render() {
    if (!this.state.isLoggedIn) {
      return (
        <Stack.Navigator
          initialRouteName="Starting"
          keyboardHandlingEnabled={true}
          headerMode="none">
          <Stack.Screen name="Starting" component={LandingScreen} />
        </Stack.Navigator>
      );
    } else {
      return (
        <Tab.Navigator
          initialRouteName="HomeScreen"
          backBehavior="initialRoute"
          labeled={false}
          shifting={false}
          barStyle={{backgroundColor: DarkTheme.colors.background}}
          lazy={false}>
          <Tab.Screen
            options={{
              tabBarIcon: ({focused}) => <AddPictureIcon focused={focused} />,
            }}
            name="Add"
            component={AddImageScreen}
          />
          <Tab.Screen
            options={{
              tabBarIcon: ({focused}) => <HomeIcon focused={focused} />,
            }}
            name="HomeScreen"
            component={PostViewStack}
          />
          <Tab.Screen
            options={{
              tabBarIcon: ({focused}) => <ProfileIcon focused={focused} />,
            }}
            name="Profile"
            component={PostViewProfileStack}
          />
        </Tab.Navigator>
      );
    }
  }
}

export default function App() {
  return (
    <PaperProvider theme={DarkTheme}>
      <NavigationContainer>
        <StatusBar
          backgroundColor={DarkTheme.colors.background}
          barStyle="light-content"
        />
        <MainAppStack />
      </NavigationContainer>
    </PaperProvider>
  );
}
