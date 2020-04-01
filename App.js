import React, { Component } from 'react';
import { createSwitchNavigator, createAppContainer } from 'react-navigation';
import { Asset } from 'expo-asset'; // for preloading assets
import { AppLoading } from 'expo'; // till the time assets and other things are being loaded show the loading indicator

// importing Firebase
import * as firebase from './src/configs/firebase';

// importing Screens
import LoginScreen from './src/LoginScreen';

// importing different context
import { Provider } from './src/context/UserContext';

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
  constructor() {
    super();
    this.state={
      isReady: false,
    }
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
    return <LoginScreen />
  }
}

const defaultApp = createSwitchNavigator({
  UserStarting,
}, {
  initialRouteName: 'UserStarting'
})

const App = createAppContainer(defaultApp);

export default () => {
  return (
    <Provider>
      <App />
    </Provider>
  );
}
