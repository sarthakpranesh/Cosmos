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
      uid: null,
      username: null,
      email: null,
      isLoading: true,
      opacity: 1,
    };

    this.user = null;
  }

  async UNSAFE_componentWillMount() {
    var user = firebase.auth().currentUser;
    this.user = user;
    this.setState({
      uid: user.uid,
      username: user.displayName,
      email: user.email,
      isLoading: false,
    });
  }

  setUsername = (username) => {
    this.setState({
      username,
    });
  };

  checkForChange = () => {
    const {username} = this.state;
    if (this.user.username !== username) {
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
    const {username} = this.user;
    this.setState({
      username,
    });
    return;
  };

  onSubmit = async () => {
    const {username} = this.state;
    if (this.user.username === username) {
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
                value={this.state.username}
                style={Styles.textInput}
                onChangeText={(username) => this.setUsername(username)}
                onKeyPress={() => this.checkForChange()}
                placeholder="Username"
              />
            </View>
            <View style={{marginVertical: 2}}>
              <Text style={styles.label}>Email</Text>
              <TextInput
                value={this.state.email}
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
