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

// importing firebase utils
import {updateUserObject, getUserObject} from '../../utils/firebase';

// importing components
import Header from '../../components/Header';

class MainSettingsScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      uid: this.props.navigation.getParam('uid'),
      username: '',
      name: '',
      phoneNumber: '',
      photoUrl: '',
      email: '',
    };

    this.user = {};
  }

  async UNSAFE_componentWillMount() {
    var user = {
      username: 'fsdfs',
      name: 'ddc',
      phoneNumber: '234567',
      photoUrl: 'qwertyu',
      email: 'sarthakpdvf',
      uid: 'sfsdfsd',
    };
    this.user = user;
    this.setState({
      username: user.username,
      name: user.name,
      phoneNumber: user.phoneNumber,
      photoUrl: user.photoUrl,
      email: user.email,
      uid: user.uid,

      opacity: 1,
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
      console.log('sdkfdsbfudb');
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

    console.log(uid);
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

  render() {
    const {navigation} = this.props;

    return (
      <>
        <Header username="Settings" navigate={navigation.navigate} />
        <ScrollView>
          <View style={styles.mainContainer}>
            <Image
              source={require('../../../assets/bg.jpg')}
              style={styles.userImage}
            />
            <View style={styles.userValueInput}>
              <View style={{marginVertical: 10}}>
                <Text>Username:</Text>
                <TextInput
                  value={this.state.username}
                  style={styles.textInput}
                  onChangeText={(username) => this.setUsername(username)}
                  onKeyPress={() => this.checkForChange()}
                  placeholder="Username"
                />
              </View>
              <View style={{marginVertical: 10}}>
                <Text>Name:</Text>
                <TextInput
                  value={this.state.name}
                  style={styles.textInput}
                  onChangeText={(name) => this.setName(name)}
                  onKeyPress={() => this.checkForChange()}
                  placeholder="Name"
                />
              </View>
              <View style={{marginVertical: 10}}>
                <Text>Email:</Text>
                <TextInput
                  value={this.state.email}
                  style={[
                    styles.textInput,
                    {backgroundColor: 'rgba(0,0,0, 0.1)'},
                  ]}
                  editable={false}
                />
              </View>
              <TouchableOpacity
                onPress={() => this.onSubmit()}
                style={[Styles.buttonLogin, Styles.buttonShadow, styles.btn]}
                activeOpacity={this.state.opacity}>
                <Text style={Styles.textSmallBold}>Save</Text>
              </TouchableOpacity>
              <Button
                title="Sign out"
                onPress={async () => {
                  navigation.navigate('LoginScreenTemp');
                  return;
                }}
              />
            </View>
          </View>
        </ScrollView>
      </>
    );
  }
}

export default MainSettingsScreen;
