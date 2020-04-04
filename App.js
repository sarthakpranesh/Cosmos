import React, { Component } from 'react';
import { createSwitchNavigator, createAppContainer } from 'react-navigation';
import { Asset } from 'expo-asset'; // for preloading assets
import { AppLoading } from 'expo'; // till the time assets and other things are being loaded show the loading indicator

// importing Firebase
import * as firebase from './src/configs/firebase';

// importing local db
import { getUserDataAsync } from './src/utils/localDb';

// importing Screens
import LoginScreen from './src/screens/LoginScreen';
import Main from './src/screens/Main';

function cacheImages(images) {
  return images.map(image => {
    if (typeof image === 'string') {
      return Image.prefetch(image);
    } else {
      return Asset.fromModule(image).downloadAsync();
    }
  });
}

class UserStarting extends Component {
  constructor(props) {
    super(props);
    this.state={
      isReady: false,
    }
  }

  isUserLoggedIn = async () => {
    const user = await getUserDataAsync();
    console.log(user);
    return user;
  }

  componentDidMount() {
    this.isUserLoggedIn()
      .then((user) => {
        if(!!user.uid) {
          this.props.navigation.navigate("Main", { user })
        }
      })
  }

  async _loadAssetsAsync() {
    const imageAssets = cacheImages([
      require('./assets/bg.jpg'),
    ]);
    await Promise.all([...imageAssets]);
  }

  render() {
    if (!this.state.isReady) {
      return (
        <AppLoading
          startAsync={this._loadAssetsAsync}
          onFinish={() => this.setState({ isReady: true })}
          onError={console.warn}
        />
      );
    }
    return (
      <LoginScreen {...this.props} />
    );
  }
}

const defaultApp = createSwitchNavigator({
  UserStarting,
  Main,
}, {
  initialRouteName: "UserStarting",
})

export default createAppContainer(defaultApp);
