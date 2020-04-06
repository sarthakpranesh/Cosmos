import React, {Component} from 'react';
import {View, Text, StatusBar, TouchableOpacity} from 'react-native';

// importing styles
import styles from './styles';

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: props.username ? props.username : 'User1234',
      uid: props.uid ? props.uid : 'gfVVMvXZ3DQgHOZ4cc6coD50Pys1',
    };
  }

  renderLeftButton = () => {
    const {username, uid} = this.state;
    const {navigate} = this.props;
    if (username === 'Profile') {
      return (
        <TouchableOpacity onPress={() => navigate('Main')}>
          <Text>Back</Text>
        </TouchableOpacity>
      );
    }

    if (username === 'Settings') {
      return (
        <TouchableOpacity
          onPress={() => navigate('ProfileScreen', {username, uid})}>
          <Text>Back</Text>
        </TouchableOpacity>
      );
    }
    return (
      <TouchableOpacity
        onPress={() => navigate('ProfileScreen', {username, uid})}>
        <Text>Profile</Text>
      </TouchableOpacity>
    );
  };

  renderRightButton = () => {
    const {username, uid} = this.state;
    const {navigate} = this.props;
    var screen = 'NotificationScreen';
    if (username === 'Profile') {
      return (
        <TouchableOpacity onPress={() => navigate('MainSettingsScreen', {uid})}>
          <Text>Settings</Text>
        </TouchableOpacity>
      );
    }

    if (username === 'Settings') {
      return;
    }

    return (
      <TouchableOpacity onPress={() => navigate('NotificationScreen', {uid})}>
        <Text>Inbox</Text>
      </TouchableOpacity>
    );
  };

  render() {
    const {username, uid} = this.state;
    return (
      <>
        <StatusBar
          animated={true}
          backgroundColor={'green'}
          barStyle={'light-content'}
          networkActivityIndicatorVisible={false}
          translucent={false}
        />
        <View style={styles.headerWrapper}>
          <View style={styles.innerContainer}>
            {this.renderLeftButton()}
            <Text>{username}</Text>
          </View>
          {this.renderRightButton()}
        </View>
      </>
    );
  }
}

export default Header;
