import React, { Component } from 'react';
import { Asset } from 'expo-asset'; // for preloading assets
import { AppLoading } from 'expo'; // till the time assets and other things are being loaded show the loading indicator


import LoginScreen from './src/LoginScreen';

function cacheImages(images) {
  return images.map(image => {
    if (typeof image === 'string') {
      return Image.prefetch(image);
    } else {
      return Asset.fromModule(image).downloadAsync();
    }
  });
}

export default class App extends Component {
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
