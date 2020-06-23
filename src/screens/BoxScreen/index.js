/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {View, ToastAndroid, FlatList} from 'react-native';
import {
  Card,
  Headline,
  Caption,
  Text,
  Divider,
  Button,
  TextInput,
  ActivityIndicator,
} from 'react-native-paper';
import Icon from 'react-native-vector-icons/Feather';

// importing firebase utils
import {getBox, addUserToBox} from '../../utils/firebase.js';

// importing styles
import styles from './styles.js';

class BoxScreen extends Component {
  constructor(props) {
    super(props);
    this.boxName = props.route.params.boxName;

    this.state = {
      enrolledBy: [],
      auth: [],
      email: '',
    };
  }

  componentDidMount() {
    this.fetchEnrolledUsers();
  }

  fetchEnrolledUsers = () => {
    getBox(this.boxName)
      .then((box) => {
        this.setState({
          enrolledBy: box.enrolledBy,
          auth: box.author_name,
        });
      })
      .catch((err) => {
        ToastAndroid.showWithGravity(
          err.message,
          ToastAndroid.SHORT,
          ToastAndroid.CENTER,
        );
      });
  };

  setAddParticipant = (email) => {
    this.setState({
      email: email,
    });
  };

  handleAddUser = () => {
    const {email} = this.state;
    addUserToBox(email, this.boxName)
      .then(() => {
        this.fetchEnrolledUsers();
        ToastAndroid.showWithGravity(
          'User Added',
          ToastAndroid.SHORT,
          ToastAndroid.CENTER,
        );
        this.setState({email: ''});
      })
      .catch((err) => {
        ToastAndroid.showWithGravity(
          err.message,
          ToastAndroid.SHORT,
          ToastAndroid.CENTER,
        );
      });
  };

  render() {
    const {enrolledBy} = this.state;

    return (
      <View style={styles.boxScreenContainer}>
        <View style={styles.authorContainer}>
          <Caption>Author of Box</Caption>
          <Headline>{this.state.auth}</Headline>
        </View>
        <View style={styles.addPartConatiner}>
          <Text>Add Participant</Text>
          <TextInput
            style={styles.textInput}
            mode="outlined"
            label="Email"
            value={this.state.email}
            onChangeText={(email) => this.setAddParticipant(email)}
          />
          <Button onPress={() => this.handleAddUser()}>
            <Icon name="plus" size={24} color="white" />
          </Button>
        </View>
        <FlatList
          ListHeaderComponent={() => {
            return <Text>Enrolled Users: {enrolledBy.length}</Text>;
          }}
          ListHeaderComponentStyle={{margin: 10}}
          ListEmptyComponent={() => {
            return <ActivityIndicator />;
          }}
          data={enrolledBy}
          keyExtractor={(item) => item.uid}
          renderItem={({item}) => {
            return (
              <Card style={styles.card}>
                <Card.Title title={item.name} />
              </Card>
            );
          }}
          ItemSeparatorComponent={() => <Divider style={styles.Divider} />}
        />
      </View>
    );
  }
}

export default BoxScreen;
