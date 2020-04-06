import React, {Component} from 'react';
import {View, Text, StatusBar, TouchableOpacity} from 'react-native';
import Svg, {Image} from 'react-native-svg';

// importing styles
import styles from './styles';
import Styles from '../../Styles';

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: props.username ? props.username : 'User1234',
      uid: props.uid ? props.uid : 'gfVVMvXZ3DQgHOZ4cc6coD50Pys1',
    };
  }

  renderRightButton = () => {
    const {username, uid} = this.state;
    const {navigate} = this.props;
    var screen = 'NotificationScreen';
    if (username === 'Profile') {
      return (
        <TouchableOpacity onPress={() => navigate('MainSettingsScreen', {uid})}>
          <Svg height={24} width={24} style={styles.headerIcon}>
            <Image
              height={24}
              width={24}
              href={require('../../../assets/icons/settings.png')}
            />
          </Svg>
        </TouchableOpacity>
      );
    }

    if (username === 'Settings') {
      return (
        <TouchableOpacity onPress={() => navigate('ProfileScreen', {uid})}>
          <Svg height={24} width={24} style={styles.headerIcon}>
            <Image
              height={24}
              width={24}
              href={require('../../../assets/icons/back.png')}
            />
          </Svg>
        </TouchableOpacity>
      );
    }

    return (
      <TouchableOpacity onPress={() => navigate('NotificationScreen', {uid})}>
        <Svg height={24} width={24} style={styles.headerIcon}>
          <Image
            height={24}
            width={24}
            href={require('../../../assets/icons/home.png')}
          />
        </Svg>
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
          {username === 'Settings' ? (
            <>
              <View style={styles.innerContainer}>
                {this.renderRightButton()}
                <Text styles={Styles.textSmallBold}>{username}</Text>
              </View>
            </>
          ) : (
            <>
              <View style={styles.innerContainer}>
                <Text styles={Styles.textSmallBold}>{username}</Text>
              </View>
              {this.renderRightButton()}
            </>
          )}
        </View>
      </>
    );
  }
}

export default Header;
