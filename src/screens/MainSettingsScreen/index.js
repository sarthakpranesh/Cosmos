/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {
  View,
  Text,
  ScrollView,
  TextInput,
  Image,
  TouchableOpacity,
  Alert,
  Button,
} from 'react-native';

// importing styles
import styles from './styles';
import Styles from '../../Styles';

// importing firebase
import * as firebase from 'firebase';

// importing firebase utils
import {updateUserObject, getUserObject} from '../../utils/firebase';

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
      name: null,
      email: null,
      isLoading: true,
      opacity: 0.2,
    };

    this.user = null;
  }

  async UNSAFE_componentWillMount() {
    var uid = firebase.auth().currentUser.uid;
    const user = await getUserObject(uid);
    this.user = user;
    this.setState({
      uid: uid,
      username: user.username,
      name: user.name,
      email: user.email,
      opacity: 1,
      isLoading: false,
    });
  }

  setUsername = (username) => {
    this.setState({
      username,
    });
  };

  setName = (name) => {
    this.setState({
      name,
    });
  };

  checkForChange = () => {
    const {username, name} = this.state;
    if (this.user.username !== username || this.user.name !== name) {
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
    const {username, name} = this.user;
    this.setState({
      username,
      name,
    });
    return;
  };

  onSubmit = async () => {
    const {username, name, uid} = this.state;
    if (this.user.username === username && this.user.name === name) {
      return;
    }

    if (username === '' || name === '') {
      Alert.alert(
        'Invalid Input',
        'Username/Name cannot be empty',
        [{text: 'ok', onPress: () => this.invalidInput()}],
        {cancelable: true},
      );
      return;
    }

    updateUserObject(uid, {username, name})
      .then(async () => {
        const user = await getUserObject(uid);
        console.log(user);
        this.user = user;
        this.setState({
          username: user.username,
          name: user.name,
          phoneNumber: user.phoneNumber,
          photoUrl: user.photoUrl,
          email: user.email,

          opacity: 1,
        });
        Alert.alert(
          'Account Updated',
          'Your Username/Name was successfully updated',
          [{text: 'ok'}],
        );
      })
      .catch((err) => {
        console.log(err);
      });
  };

  onSignOut = async () => {
    const user = firebase.auth().currentUser;
    user
      .delete()
      .then(() => {
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
              <Text style={styles.label}>Name</Text>
              <TextInput
                value={this.state.name}
                style={Styles.textInput}
                onChangeText={(name) => this.setName(name)}
                onKeyPress={() => this.checkForChange()}
                placeholder="Name"
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
