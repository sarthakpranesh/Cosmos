import React, {Component} from 'react';
import {View, Text, StatusBar, TouchableOpacity} from 'react-native';
import Svg, {Image} from 'react-native-svg';

// importing styles
import styles from './styles';
import Styles from '../../Styles';

class Header extends Component {
  constructor(props) {
    super(props);
  }

  renderHeaderText = () => {
    const {username} = this.props;

    if (username === 'Profile') {
      return <Text style={Styles.textMedium}>{'Profile'}</Text>;
    }

    if (username === 'Settings') {
      return <Text style={Styles.textMedium}>{'Setting'}</Text>;
    }

    return <Text style={Styles.textMedium}>{`Welcome, ${username}`}</Text>;
  };

  render() {
    return (
      <>
        <StatusBar
          animated={true}
          backgroundColor={'white'}
          barStyle={'dark-content'}
          networkActivityIndicatorVisible={false}
          translucent={false}
        />
        {/* <View style={styles.headerWrapper}>
          <Text style={Styles.textMedium}>{this.renderHeaderText()}</Text>
        </View> */}
      </>
    );
  }
}

export default Header;
