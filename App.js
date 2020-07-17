/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {StatusBar, Dimensions} from 'react-native';
import {Appbar} from 'react-native-paper';
import Icon from 'react-native-vector-icons/Feather';
import SplashScreen from 'react-native-splash-screen';
import {NavigationContainer} from '@react-navigation/native';
import {
  createStackNavigator,
  TransitionSpecs,
  CardStyleInterpolators,
} from '@react-navigation/stack';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
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
import PostViewScreen from './src/screens/PostViewScreen/index.js';
import CommentScreen from './src/screens/CommentScreen/index.js';

// importing User provider
import {
  Provider as UserProvider,
  Context as UserContext,
} from './src/contexts/UserContext.js';

// importing async utils
import {getData} from './src/utils/asyncStorageHelper.js';

// listen for notifications
import startNotificationListening from './src/utils/Notifications/index.js';

// importing Styles
import Styles from './src/Styles.js';

const {width} = Dimensions.get('window');

const Stack = createStackNavigator();
const Tab = createMaterialBottomTabNavigator();

class PostViewProfileStack extends Component {
  static contextType = UserContext;
  constructor(props) {
    super(props);

    startNotificationListening();
  }

  render() {
    const {state} = this.context;
    return (
      <Stack.Navigator
        key={state.box}
        initialRouteName="ProfileScreen"
        keyboardHandlingEnabled={true}
        mode="modal"
        lazy={true}
        headerMode="screen">
        <Stack.Screen
          options={{
            header: ({navigation}) => {
              return (
                <Appbar.Header
                  style={{flexDirection: 'row-reverse', height: width * 0.14}}>
                  <Appbar.Action
                    size={width * 0.06}
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
            gestureDirection: 'horizontal',
            cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
            transitionSpec: {
              animation: 'spring',
              open: TransitionSpecs.TransitionIOSSpec,
              close: TransitionSpecs.TransitionIOSSpec,
            },
            header: ({navigation}) => {
              return (
                <Appbar.Header styles={{height: width * 0.14}}>
                  <Appbar.Action
                    size={width * 0.06}
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
            gestureDirection: 'horizontal',
            cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
            transitionSpec: {
              animation: 'spring',
              open: TransitionSpecs.TransitionIOSSpec,
              close: TransitionSpecs.TransitionIOSSpec,
            },
            header: ({navigation}) => {
              return (
                <Appbar.Header style={{height: width * 0.14}}>
                  <Appbar.Action
                    size={width * 0.06}
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
        <Stack.Screen
          options={{
            gestureDirection: 'horizontal',
            cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
            transitionSpec: {
              animation: 'spring',
              open: TransitionSpecs.TransitionIOSSpec,
              close: TransitionSpecs.TransitionIOSSpec,
            },
            header: ({navigation}) => {
              return (
                <Appbar.Header styles={{height: width * 0.14}}>
                  <Appbar.Action
                    size={width * 0.06}
                    icon={({color, size}) => (
                      <Icon name="arrow-left" size={size} color={color} />
                    )}
                    onPress={() => navigation.goBack()}
                  />
                </Appbar.Header>
              );
            },
          }}
          name="CommentScreen"
          component={CommentScreen}
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
        key={state.box}
        initialRouteName="HomeScreen"
        keyboardHandlingEnabled={true}
        lazy={true}
        headerMode="screen">
        <Stack.Screen
          options={{
            header: ({navigation}) => {
              return (
                <Appbar.Header style={{height: width * 0.14}}>
                  <Appbar.Content
                    onPress={() => {
                      if (state.box !== '') {
                        navigation.navigate('BoxScreen', {boxName: state.box});
                      }
                    }}
                    title={state.box === '' ? 'Cosmos' : state.box}
                    titleStyle={Styles.fontMedium}
                  />
                  <Appbar.Action
                    size={width * 0.06}
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
          component={HomeScreen}
        />
        <Stack.Screen
          options={{
            gestureDirection: 'horizontal',
            cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
            transitionSpec: {
              animation: 'spring',
              open: TransitionSpecs.TransitionIOSSpec,
              close: TransitionSpecs.TransitionIOSSpec,
            },
            header: ({navigation}) => {
              return (
                <Appbar.Header style={{height: width * 0.14}}>
                  <Appbar.Action
                    icon={({color, size}) => (
                      <Icon name="arrow-left" size={size} color={color} />
                    )}
                    onPress={() => navigation.goBack()}
                    size={width * 0.06}
                  />
                  <Appbar.Content
                    title={state.box === '' ? 'Cosmos' : state.box}
                    titleStyle={Styles.fontMedium}
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
            gestureDirection: 'horizontal',
            cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
            transitionSpec: {
              animation: 'spring',
              open: TransitionSpecs.TransitionIOSSpec,
              close: TransitionSpecs.TransitionIOSSpec,
            },
            header: ({navigation}) => {
              return (
                <Appbar.Header style={{height: width * 0.14}}>
                  <Appbar.Action
                    size={width * 0.06}
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
            gestureDirection: 'horizontal',
            cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
            transitionSpec: {
              animation: 'spring',
              open: TransitionSpecs.TransitionIOSSpec,
              close: TransitionSpecs.TransitionIOSSpec,
            },
            header: ({navigation}) => {
              return (
                <Appbar.Header style={{height: width * 0.14}}>
                  <Appbar.Action
                    size={width * 0.06}
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
            gestureDirection: 'horizontal',
            cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
            transitionSpec: {
              animation: 'spring',
              open: TransitionSpecs.TransitionIOSSpec,
              close: TransitionSpecs.TransitionIOSSpec,
            },
            header: ({navigation}) => {
              return (
                <Appbar.Header style={{height: width * 0.14}}>
                  <Appbar.Action
                    size={width * 0.06}
                    icon={({color, size}) => (
                      <Icon name="arrow-left" size={size} color={color} />
                    )}
                    onPress={() => navigation.goBack()}
                  />
                </Appbar.Header>
              );
            },
          }}
          name="CommentScreen"
          component={CommentScreen}
        />
        <Stack.Screen
          options={{
            gestureDirection: 'horizontal',
            cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
            transitionSpec: {
              animation: 'spring',
              open: TransitionSpecs.TransitionIOSSpec,
              close: TransitionSpecs.TransitionIOSSpec,
            },
            header: ({navigation}) => {
              return (
                <Appbar.Header style={{height: width * 0.14}}>
                  <Appbar.Action
                    size={width * 0.06}
                    icon={({color, size}) => (
                      <Icon name="arrow-left" size={size} color={color} />
                    )}
                    onPress={() => navigation.goBack()}
                  />
                </Appbar.Header>
              );
            },
          }}
          name="ProfileScreen"
          component={ProfileScreen}
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
      isStarting: true,
    };
  }

  async componentDidMount() {
    const {currentBox, setUid} = this.context;
    Promise.all([getData('BOX'), getData('UID')])
      .then(async ([boxName, userUid]) => {
        if (userUid !== '') {
          await Promise.all([currentBox(boxName), setUid(userUid)]);
        }
        setTimeout(() => {
          SplashScreen.hide();
        }, 100);
      })
      .catch((err) => console.log(err));
  }

  render() {
    const {state} = this.context;
    return state.uid === '' ? (
      <Stack.Navigator
        initialRouteName="Starting"
        keyboardHandlingEnabled={true}
        headerMode="none">
        <Stack.Screen name="Starting" component={LandingScreen} />
      </Stack.Navigator>
    ) : (
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
