/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {View, Text, ScrollView, TextInput, Image, Alert} from 'react-native';

// importing styles
import styles from './styles';
import Styles from '../../Styles';

// importing firebase
import * as firebase from 'firebase';

// importing firebase utils
import {updateDisplayName} from '../../utils/firebase';

// importing components
import Header from '../../components/Header';
import ButtonLarge from '../../components/ButtonLarge';
import LoadingIndicator from '../../components/LoadingIndicator';

class MainSettingsScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: firebase.auth().currentUser,
      username: firebase.auth().currentUser.displayName,
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

  onSignOut = async () => {
    firebase
      .auth()
      .signOut()
      .then(() => {
        Alert.alert(
          'Logged Out',
          'You have been successfully logged out',
          [{text: 'ok'}],
          {cancelable: false},
        );
        this.props.navigation.navigate('LandingScreen');
      })
      .catch((err) => {
        console.log(err);
      });
  };

  render() {
    const {navigation} = this.props;
    const {username, user} = this.state;

    if (this.state.isLoading) {
      return <LoadingIndicator />;
    }

    return (
      <>
        <Header username="Settings" navigate={navigation.navigate} />
        <ScrollView style={{backgroundColor: 'white'}}>
          <View style={[Styles.container, styles.inputWrapper]}>
            <Image
              source={require('../../../assets/bg.jpg')}
              style={styles.userImage}
            />
            <View style={{marginVertical: 2}}>
              <Text style={styles.label}>Username</Text>
              <TextInput
                value={username}
                style={Styles.textInput}
                onChangeText={(newUsername) => this.setUsername(newUsername)}
                onKeyPress={() => this.checkForChange()}
                placeholder="Username"
              />
            </View>
            <View style={{marginVertical: 2}}>
              <Text style={styles.label}>Email</Text>
              <TextInput
                value={user.email}
                style={[
                  Styles.textInput,
                  {backgroundColor: 'rgba(0,0,0, 0.1)'},
                ]}
                editable={false}
              />
            </View>

            <ButtonLarge
              onPress={this.onSubmit}
              title="Update Account"
              opacity={this.state.opacity}
            />
            <ButtonLarge onPress={this.onSignOut} title="Sign Out" />
          </View>
        </ScrollView>
      </>
    );
  }
}

export default MainSettingsScreen;
