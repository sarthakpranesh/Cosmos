import React, {Component} from 'react';
import {View, ScrollView, Image, Alert, TouchableOpacity} from 'react-native';
import {Text, Button, TextInput} from 'react-native-paper';
import Icon from 'react-native-vector-icons/Feather';
import auth from '@react-native-firebase/auth';
import {GoogleSignin} from '@react-native-community/google-signin';

// importing styles
import styles from './styles';

// importing firebase utils
import {updateDisplayName} from '../../utils/firebase';

class MainSettingsScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: auth().currentUser,
      username: auth().currentUser.displayName,
      isUpdateDisabled: true,
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

    return (
      <View style={styles.settingContainer}>
        <ScrollView>
          <Image
            source={{uri: auth().currentUser.photoURL}}
            style={styles.userImage}
          />
          <View style={styles.inputChangeContainer}>
            <Text style={styles.label}>Username</Text>
            <TextInput
              mode="outlined"
              placeholder="Username"
              value={username}
              style={styles.inAppTextInput}
              onChangeText={(newUsername) => this.setUsername(newUsername)}
              onKeyPress={() => this.checkForChange()}
            />
          </View>
          <View style={styles.inputChangeContainer}>
            <Text style={styles.label}>Email</Text>
            <TextInput
              mode="outlined"
              disabled={true}
              placeholder="Email"
              value={user.email}
              style={styles.inAppTextInput}
              editable={false}
            />
          </View>
          <View style={styles.btnWrapper}>
            <Button
              mode="contained"
              onPress={this.onSubmit}
              disabled={this.state.isUpdateDisabled}>
              Update
            </Button>
            <Button mode="contained" onPress={this.onSignOut}>
              Log Out
            </Button>
          </View>
        </ScrollView>
      </View>
    );
  }
}

export default MainSettingsScreen;
