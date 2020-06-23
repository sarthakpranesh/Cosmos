/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {StatusBar, ToastAndroid, Alert} from 'react-native';
import {Appbar} from 'react-native-paper';
import Icon from 'react-native-vector-icons/Feather';
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
import ListBoxesScreen from './src/screens/ListBoxesScreen/index.js';
import BoxScreen from './src/screens/BoxScreen/index.js';
import HomeScreen from './src/screens/HomeScreen/index.js';
import ProfileScreen from './src/screens/ProfileScreen/index.js';
import MainSettingsScreen from './src/screens/MainSettingsScreen/index.js';
import PostViewScreen from './src/screens/PostViewScreen';

// importing User provider
import {
  Provider as UserProvider,
  Context as UserContext,
} from './src/contexts/UserContext.js';

// importing firebase utils
import {getUserDetails} from './src/utils/firebase.js';

// importing async utils
import {getData} from './src/utils/asyncStorageHelper.js';

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
        headerMode="screen">
        <Stack.Screen
          options={{
            header: ({navigation}) => {
              return (
                <Appbar.Header style={{flexDirection: 'row-reverse'}}>
                  <Appbar.Action
                    icon={({color, size}) => (
                      <Icon name="edit-2" size={size} color={color} />
                    )}
                    onPress={() => navigation.navigate('Setting')}
                  />
                </Appbar.Header>
              );
            },
          }}
          name="ProfileScreen"
          component={ProfileScreen}
        />
        <Stack.Screen
          options={{
            header: ({navigation}) => {
              return (
                <Appbar.Header>
                  <Appbar.Action
                    icon={({color, size}) => (
                      <Icon name="arrow-left" size={size} color={color} />
                    )}
                    onPress={() => navigation.goBack()}
                  />
                </Appbar.Header>
              );
            },
          }}
          name="Postview"
          component={PostViewScreen}
        />
        <Stack.Screen
          options={{
            header: ({navigation}) => {
              return (
                <Appbar.Header>
                  <Appbar.Action
                    icon={({color, size}) => (
                      <Icon name="arrow-left" size={size} color={color} />
                    )}
                    onPress={() => navigation.goBack()}
                  />
                </Appbar.Header>
              );
            },
          }}
          name="Setting"
          component={MainSettingsScreen}
        />
      </Stack.Navigator>
    );
  }
}

class PostViewStack extends Component {
  static contextType = UserContext;
  constructor(props) {
    super(props);
  }

  render() {
    const {state} = this.context;
    return (
      <Stack.Navigator
        initialRouteName="HomeScreen"
        keyboardHandlingEnabled={true}
        lazy={true}
        headerMode="screen">
        <Stack.Screen
          options={{
            header: ({navigation}) => {
              return (
                <Appbar.Header>
                  <Appbar.Content
                    onPress={() => {
                      if (state.box !== '') {
                        navigation.navigate('BoxScreen', {boxName: state.box});
                      }
                    }}
                    title={state.box === '' ? 'Cosmos' : state.box}
                  />
                  <Appbar.Action
                    icon={({color, size}) => (
                      <Icon name="box" size={size} color={color} />
                    )}
                    onPress={() => navigation.navigate('ListCircle')}
                  />
                </Appbar.Header>
              );
            },
          }}
          name="HomeScreen"
          component={(props) => <HomeScreen {...props} boxName={state.box} />}
        />
        <Stack.Screen
          options={{
            header: ({navigation}) => {
              return (
                <Appbar.Header>
                  <Appbar.Action
                    icon={({color, size}) => (
                      <Icon name="arrow-left" size={size} color={color} />
                    )}
                    onPress={() => navigation.goBack()}
                  />
                  <Appbar.Content
                    title={state.box === '' ? 'Cosmos' : state.box}
                  />
                </Appbar.Header>
              );
            },
          }}
          name="BoxScreen"
          component={BoxScreen}
        />
        <Stack.Screen
          options={{
            header: ({navigation}) => {
              return (
                <Appbar.Header>
                  <Appbar.Action
                    icon={({color, size}) => (
                      <Icon name="arrow-left" size={size} color={color} />
                    )}
                    onPress={() => navigation.goBack()}
                  />
                </Appbar.Header>
              );
            },
          }}
          name="ListCircle"
          component={ListBoxesScreen}
        />
        <Stack.Screen
          options={{
            header: ({navigation}) => {
              return (
                <Appbar.Header>
                  <Appbar.Action
                    icon={({color, size}) => (
                      <Icon name="arrow-left" size={size} color={color} />
                    )}
                    onPress={() => navigation.goBack()}
                  />
                </Appbar.Header>
              );
            },
          }}
          name="Postview"
          component={PostViewScreen}
        />
      </Stack.Navigator>
    );
  }
}

class MainAppStack extends Component {
  static contextType = UserContext;
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: false,
      isStarting: true,
      box: '',
    };
  }

  componentDidMount() {
    const {isStarting} = this.state;
    auth().onAuthStateChanged(async (user) => {
      console.log('Auth change');

      if (isStarting && user) {
        const {currentBox} = this.context;
        const [userObj, box] = await Promise.all([
          getUserDetails(user.uid),
          getData('BOX'),
        ]);
        if (['', undefined, null].includes(box)) {
          if (userObj.enrolledBoxes.length !== 0) {
            await currentBox(userObj.enrolledBoxes[0]);
          } else {
            this.handleNoBoxSet();
          }
        } else {
          await currentBox(box);
        }
        SplashScreen.hide();
        return this.setState({
          isStarting: false,
          isLoggedIn: user ? true : false,
        });
      }

      if (isStarting) {
        SplashScreen.hide();
        return this.setState({
          isStarting: false,
          isLoggedIn: user ? true : false,
        });
      }
    });
  }

  handleNoBoxSet = () => {
    Alert.alert(
      'Join Box',
      'To get started you need to join a Box or create your own Box',
      [
        {
          text: 'Next',
          onPress: () => {
            this.props.navigation.navigate('ListCircle');
          },
        },
      ],
      {
        cancelable: false,
      },
    );
  };

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
      <UserProvider>
        <UserContext.Consumer>
          {(value) => {
            return (
              <NavigationContainer>
                <StatusBar
                  backgroundColor={DarkTheme.colors.background}
                  barStyle="light-content"
                />
                <MainAppStack />
              </NavigationContainer>
            );
          }}
        </UserContext.Consumer>
      </UserProvider>
    </PaperProvider>
  );
}
