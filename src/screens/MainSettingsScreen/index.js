import React, {Component} from 'react';
import {View, ScrollView, Image, Alert} from 'react-native';
import {Text, Button, TextInput} from 'react-native-paper';
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';
import {GoogleSignin} from '@react-native-community/google-signin';

// importing User provider
import {Context as UserContext} from '../../contexts/UserContext.js';

// importing styles
import styles from './styles';
import Styles from '../../Styles.js';

// importing firebase utils
import {updateDisplayName} from '../../utils/firebase';

class MainSettingsScreen extends Component {
  static contextType = UserContext;
  constructor(props) {
    super(props);

    this.state = {
      user: auth().currentUser,
      username: auth().currentUser.displayName,
      isUpdateDisabled: true,
      loggingOut: false,
      updating: false,
    };
  }

  setBtnUpdate = (bool) => {
    this.setState({
      updating: bool,
    });
  };

  setBtnLogout = (bool) => {
    this.setState({
      loggingOut: bool,
    });
  };

  setUsername = (username) => {
    this.setState({
      username,
    });
  };

  checkForChange = () => {
    const {username, user} = this.state;
    return this.setState({
      isUpdateDisabled: user.displayName.trim() === username.trim(),
    });
  };

  invalidInput = () => {
    const {username} = this.state.user;
    this.setState({
      username,
    });
    return;
  };

  onSubmit = async () => {
    this.setBtnUpdate(true);
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
          isUpdateDisabled: true,
        });
        Alert.alert(
          'Account Updated',
          'Your Username/Name was successfully updated',
          [{text: 'ok'}],
        );
        this.setBtnUpdate(false);
      })
      .catch((err) => {
        Alert.alert('Account Error', err.message, [{text: 'ok'}]);
        this.setBtnUpdate(false);
      });
  };

  onSignOut = () => {
    this.setBtnLogout(true);
    const {currentBox, setUid, state} = this.context;
    Alert.alert(
      'Log Out',
      'Are you sure, you want to log out?',
      [
        {text: 'Cancel', onPress: () => this.setBtnLogout(false)},
        {
          text: 'Sign Out',
          onPress: async () => {
            database().ref(state.box).off();
            await GoogleSignin.revokeAccess();
            await Promise.all([
              GoogleSignin.signOut(),
              auth().signOut(),
              currentBox(''),
              setUid(''),
            ]);
          },
        },
      ],
      {cancelable: false},
    );
  };

  render() {
    const {username, user, loggingOut, updating: updating} = this.state;

    return (
      <View style={styles.settingContainer}>
        <ScrollView>
          <Image
            source={{uri: auth().currentUser.photoURL}}
            style={styles.userImage}
          />
          <View style={styles.inputChangeContainer}>
            <Text style={Styles.fontSmall}>Username</Text>
            <TextInput
              mode="outlined"
              placeholder="Username"
              maxLength={40}
              value={username}
              dense={true}
              style={[Styles.fontMedium, styles.inAppTextInput]}
              onChangeText={(newUsername) => this.setUsername(newUsername)}
              onKeyPress={() => this.checkForChange()}
            />
          </View>
          <View style={styles.inputChangeContainer}>
            <Text style={Styles.fontSmall}>Email</Text>
            <TextInput
              mode="outlined"
              disabled={true}
              placeholder="Email"
              value={user.email}
              dense={true}
              style={[Styles.fontMedium, styles.inAppTextInput]}
              editable={false}
            />
          </View>
          <View style={styles.btnWrapper}>
            <Button
              labelStyle={Styles.fontSmall}
              loading={updating}
              mode="contained"
              icon="update"
              onPress={this.onSubmit}
              disabled={this.state.isUpdateDisabled}>
              Update
            </Button>
            <Button
              labelStyle={Styles.fontSmall}
              loading={loggingOut}
              icon="logout"
              mode="contained"
              onPress={this.onSignOut}>
              Log Out
            </Button>
          </View>
        </ScrollView>
      </View>
    );
  }
}

export default MainSettingsScreen;
