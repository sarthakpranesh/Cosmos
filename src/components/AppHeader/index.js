/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {Dimensions} from 'react-native';
import {Appbar} from 'react-native-paper';
import Icon from 'react-native-vector-icons/Feather';

import {IconSize} from '../../Constants.js';

// importing Styles
import Styles from '../../Styles.js';

const {width} = Dimensions.get('window');

const AppHeader = ({title, onPressRight, iconRight, onPressLeft, iconLeft}) => {
  return (
    <Appbar.Header
      style={{
        width: width,
        height: width * 0.14,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
      }}>
      {iconLeft !== null ? (
        <Appbar.Action
          size={IconSize}
          icon={({color, size}) => (
            <Icon name={iconLeft} size={size} color={color} />
          )}
          onPress={onPressLeft}
        />
      ) : null}
      {title !== null ? (
        <Appbar.Content
          title={title}
          titleStyle={Styles.fontLarge}
          onPress={() => {
            if (title !== '' && iconLeft === null) {
              onPressLeft();
            }
          }}
        />
      ) : null}
      {iconRight !== null ? (
        <Appbar.Action
          size={IconSize}
          style={{
            marginLeft: 'auto',
          }}
          icon={({color, size}) => (
            <Icon name={iconRight} size={size} color={color} />
          )}
          onPress={onPressRight}
        />
      ) : null}
    </Appbar.Header>
  );
};

AppHeader.defaultProps = {
  title: null,
  onPressLeft: () => {},
  iconLeft: null,
  onPressRight: () => {},
  iconRight: null,
};

export default AppHeader;
