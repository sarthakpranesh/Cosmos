import React, {Component} from 'react';
import {StatusBar, Text} from 'react-native';
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
import AddPictureIcon from './src/components/Svg/AddPictureIcon/index.js';
import HomeIcon from './src/components/Svg/HomeIcon/index.js';
import ProfileIcon from './src/components/Svg/ProfileIcon/index.js';

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

// importing components
import AppHeader from './src/components/AppHeader';

// importing User provider
import {
  Provider as UserProvider,
  Context as UserContext,
} from './src/contexts/UserContext.js';

// importing async utils
import {getData} from './src/utils/asyncStorageHelper.js';

// listen for notifications
import startNotificationListening from './src/utils/Notifications/index.js';

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
                <AppHeader
                  iconRight="edit-2"
                  onPressRight={() => navigation.navigate('Setting')}
                />
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
                <AppHeader
                  iconLeft="arrow-left"
                  onPressLeft={() => navigation.goBack()}
                />
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
                <AppHeader
                  iconLeft="arrow-left"
                  onPressLeft={() => navigation.goBack()}
                />
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
                <AppHeader
                  iconLeft="arrow-left"
                  onPressLeft={() => navigation.goBack()}
                />
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
                <AppHeader
                  title={state.box === '' ? 'Cosmos' : state.box}
                  onPressLeft={() =>
                    navigation.navigate('BoxScreen', {boxName: state.box})
                  }
                  iconRight="box"
                  onPressRight={() => navigation.navigate('ListCircle')}
                />
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
                <AppHeader
                  iconLeft="arrow-left"
                  onPressLeft={() => navigation.goBack()}
                  title={state.box === '' ? 'Cosmos' : state.box}
                />
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
                <AppHeader
                  iconLeft="arrow-left"
                  onPressLeft={() => navigation.goBack()}
                />
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
                <AppHeader
                  iconLeft="arrow-left"
                  onPressLeft={() => navigation.goBack()}
                />
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
                <AppHeader
                  iconLeft="arrow-left"
                  onPressLeft={() => navigation.goBack()}
                />
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
                <AppHeader
                  iconLeft="arrow-left"
                  onPressLeft={() => navigation.goBack()}
                />
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

const linking = {
  prefixes: ['https://cosmosrn.now.sh'],
  enabled: true,
  config: {
    initialRouteName: 'HomeScreen',
    Postview: {
      path: 'link/post',
    },
  },
};

export default function App() {
  return (
    <PaperProvider theme={DarkTheme}>
      <UserProvider>
        <UserContext.Consumer>
          {(value) => {
            return (
              <NavigationContainer
                linking={linking}
                fallback={<Text>Loading...</Text>}>
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
