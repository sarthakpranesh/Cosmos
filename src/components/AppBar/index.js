import React from 'react';
import {StyleSheet} from 'react-native';
import {Appbar} from 'react-native-paper';
import Icon from 'react-native-vector-icons/Feather';

const AppHeader = ({navigation, routeName}) => {
  let IconName;
  let headerTitle;
  let navigate;
  switch (routeName) {
    case 'HomeScreen': {
      IconName = 'box';
      headerTitle = 'Circle Name';
      navigate = () => navigation.navigate('ListCircle');
      break;
    }
    case 'ListCircle': {
      IconName = 'corner-right-down';
      headerTitle = 'Cosmos';
      navigate = () => navigation.goBack();
      break;
    }
    default:
      IconName = 'box';
      headerTitle = 'Circle Name';
      navigate = () => navigation.navigate('ListCircle');
  }
  return (
    <Appbar.Header style={styles.headerContainer}>
      <Appbar.Content title={headerTitle} />
      <Appbar.Action
        icon={({color, size}) => (
          <Icon name={IconName} size={size} color={color} />
        )}
        onPress={navigate}
      />
    </Appbar.Header>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default AppHeader;
