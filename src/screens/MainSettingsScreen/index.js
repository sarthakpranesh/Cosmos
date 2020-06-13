/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {View, Text, ScrollView, TextInput, Image, Alert} from 'react-native';
import auth from '@react-native-firebase/auth';
import {GoogleSignin} from '@react-native-community/google-signin';

// importing styles
import styles from './styles';
import Styles from '../../Styles';

// importing firebase
// import * as firebase from 'firebase';

// importing firebase utils
import {updateDisplayName} from '../../utils/firebase';

// importing components
import Header from '../../components/Header';
import ButtonLarge from '../../components/ButtonLarge';
import LoadingIndicator from '../../components/LoadingIndicator';

// importing colors for default theme
import {colors} from '../../Constants';

class MainSettingsScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: auth().currentUser,
      username: auth().currentUser.displayName,
      isLoading: false,
      opacity: 1,
    };
  }

  componentDidMount() {
    const {user} = this.state;
    if (!user) {
      this.props.navigation.navigate('userStartingStack');
      return;
    }
    return;
  }

  setUsername = (username) => {
    this.setState({
      username,
    });
  };

  checkForChange = () => {
    const {username, user} = this.state;
    if (user.username !== username) {
      this.setState({
        opacity: 0.2,
      });
      return;
    }
    this.setState({
      opacity: 1,
    });
    return;
  };

  invalidInput = () => {
    const {username} = this.state.user;
    this.setState({
      username,
    });
    return;
  };

  onSubmit = async () => {
    const {username} = this.state;
    if (this.state.user.username === username) {
      return;
    }

    if (username === '') {
      Alert.alert(
        'Invalid Input',
        'Username/Name cannot be empty',
        [{text: 'ok', onPress: () => this.invalidInput()}],
        {cancelable: true},
      );
      return;
    }

    updateDisplayName(username)
      .then(() => {
        this.setState({
          opacity: 1,
        });
        Alert.alert(
          'Account Updated',
          'Your Username/Name was successfully updated',
          [{text: 'ok'}],
        );
        return;
      })
      .catch((err) => {
        Alert.alert('Account Error', err.message, [{text: 'ok'}]);
      });
  };

  onSignOut = () => {
    Alert.alert(
      'Log Out',
      'Are you sure, you want to log out?',
      [
        {text: 'Cancel'},
        {
          text: 'Sign Out',
          onPress: async () => {
            await GoogleSignin.revokeAccess();
            await GoogleSignin.signOut();
            auth().signOut();
          },
        },
      ],
      {cancelable: true},
    );
  };

  render() {
    const {username, user} = this.state;

    if (this.state.isLoading) {
      return (
        <View
          style={[
            Styles.container,
            {backgroundColor: colors.darkTheme.backgroundColor},
          ]}>
          <LoadingIndicator />
        </View>
      );
    }

    return (
      <View
        style={[
          Styles.container,
          {
            backgroundColor: colors.darkTheme.backgroundColor,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            paddingTop: 60,
          },
        ]}>
        <Header />
        <ScrollView>
          <Image
            source={{uri: auth().currentUser.photoURL}}
            style={styles.userImage}
          />
          <View style={{marginVertical: 2}}>
            <Text style={[styles.label, {color: colors.darkTheme.primaryText}]}>
              Username
            </Text>
            <TextInput
              value={username}
              style={Styles.inAppTextInput}
              onChangeText={(newUsername) => this.setUsername(newUsername)}
              onKeyPress={() => this.checkForChange()}
              placeholder="Username"
            />
          </View>
          <View style={{marginVertical: 2}}>
            <Text style={[styles.label, {color: colors.darkTheme.primaryText}]}>
              Email
            </Text>
            <TextInput
              value={user.email}
              style={[Styles.inAppTextInput, {opacity: 0.4}]}
              editable={false}
            />
          </View>
          <View style={styles.btnWrapper}>
            <ButtonLarge
              onPress={this.onSubmit}
              title="Update"
              opacity={this.state.opacity}
            />
            <ButtonLarge onPress={this.onSignOut} title="Sign Out" />
          </View>
        </ScrollView>
      </View>
    );
  }
}

export default MainSettingsScreen;
