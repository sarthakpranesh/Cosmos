import React, {Component} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import auth from '@react-native-firebase/auth';
import {Provider as PaperProvider, DarkTheme} from 'react-native-paper';

// importing icons
import AddPictureIcon from './src/components/icons/AddPictureIcon/index.js';
import HomeIcon from './src/components/icons/HomeIcon/index.js';
import ProfileIcon from './src/components/icons/ProfileIcon/index.js';
import SettingsIcon from './src/components/icons/SettingsIcon/index.js';

// importing Screens
import LandingScreen from './src/screens/LandingScreen/index.js';
import AddImageScreen from './src/screens/AddImageScreen/index.js';
import Main from './src/screens/Main.js';
import ProfileScreen from './src/screens/ProfileScreen.js';
import MainSettingsScreen from './src/screens/MainSettingsScreen/index.js';
// import PostViewScreen from './src/screens/PostViewScreen';

const Stack = createStackNavigator();
const Tab = createMaterialBottomTabNavigator();

class MainAppStack extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: false,
    };
  }

  componentDidMount() {
    auth().onAuthStateChanged((user) => {
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
    }

    return (
      <Tab.Navigator
        initialRouteName="Main"
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
          name="Main"
          component={Main}
        />
        <Tab.Screen
          options={{
            tabBarIcon: ({focused}) => <ProfileIcon focused={focused} />,
          }}
          name="Profile"
          component={ProfileScreen}
        />
        <Tab.Screen
          options={{
            tabBarIcon: ({focused}) => <SettingsIcon focused={focused} />,
          }}
          name="Setting"
          component={MainSettingsScreen}
        />
      </Tab.Navigator>
    );
  }
}

export default function App() {
  return (
    <PaperProvider theme={DarkTheme}>
      <NavigationContainer>
        <MainAppStack />
      </NavigationContainer>
    </PaperProvider>
  );
}
