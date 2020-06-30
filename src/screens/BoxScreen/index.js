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
import ActionSheet from 'react-native-actionsheet';

// importing firebase utils
import {getBox, addUserToBox, removeUserFromBox} from '../../utils/firebase.js';

// importing context
import {Context as UserContext} from '../../contexts/UserContext.js';

// importing styles
import styles from './styles.js';

class BoxScreen extends Component {
  static contextType = UserContext;
  constructor(props) {
    super(props);
    this.state = {
      enrolledBy: [],
      auth: [],
      email: '',
      actionSheetIndex: -1,
      btnLoading: false,
    };
  }

  componentDidMount() {
    this.fetchEnrolledUsers();
  }

  fetchEnrolledUsers = () => {
    const {state} = this.context;
    getBox(state.box)
      .then((box) => {
        this.setState({
          enrolledBy: box.enrolledBy,
          auth: [box.author_name, box.author_uid],
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

  setBtnLoading = (bool) => {
    this.setState({
      btnLoading: bool,
    });
  };

  setAddParticipant = (email) => {
    this.setState({
      email: email,
    });
  };

  handleAddUser = () => {
    const {email} = this.state;
    if (email.trim() === '') {
      return ToastAndroid.showWithGravity(
        "You didn't type an email!!! 🤣",
        ToastAndroid.SHORT,
        ToastAndroid.CENTER,
      );
    }
    this.setBtnLoading(true);
    const {state} = this.context;
    addUserToBox(email, state.box)
      .then(() => {
        this.fetchEnrolledUsers();
        ToastAndroid.showWithGravity(
          'User Added',
          ToastAndroid.SHORT,
          ToastAndroid.CENTER,
        );
        this.setState({email: ''});
        this.setBtnLoading(false);
      })
      .catch((err) => {
        ToastAndroid.showWithGravity(
          err.message,
          ToastAndroid.SHORT,
          ToastAndroid.CENTER,
        );
        this.setBtnLoading(false);
      });
  };

  handleUserClick = (userIndex) => {
    this.setState({
      actionSheetIndex: userIndex,
    });
    this.ActionSheet.show();
  };

  handleActionPress = async (index) => {
    const {actionSheetIndex, enrolledBy, auth} = this.state;
    const {state} = this.context;
    // if index is 0 - handle remove user from box
    if (index === 0) {
      if (enrolledBy[actionSheetIndex].uid === auth[1]) {
        return ToastAndroid.showWithGravity(
          "You serious? Author can't leave group 😬",
          ToastAndroid.LONG,
          ToastAndroid.CENTER,
        );
      }
      removeUserFromBox(enrolledBy[actionSheetIndex].uid, state.box)
        .then(() => {
          this.fetchEnrolledUsers();
          ToastAndroid.showWithGravity(
            'User removed from the box 😖',
            ToastAndroid.SHORT,
            ToastAndroid.CENTER,
          );
        })
        .catch((err) => {
          ToastAndroid.showWithGravity(
            err.message,
            ToastAndroid.SHORT,
            ToastAndroid.CENTER,
          );
        });
    }

    // if index is 1 - handle cancel
    if (index === 1) {
      console.log('Cancelling the Action Sheet');
    }

    this.setState({
      actionSheetIndex: -1,
    });
    return;
  };

  render() {
    const {enrolledBy, btnLoading} = this.state;

    return (
      <View style={styles.boxScreenContainer}>
        <View style={styles.authorContainer}>
          <Caption>Author of Box</Caption>
          <Headline>{this.state.auth[0]}</Headline>
        </View>
        <View style={styles.addPartConatiner}>
          <Text>Add Participant</Text>
          <TextInput
            style={styles.textInput}
            mode="outlined"
            placeholder="Email"
            value={this.state.email}
            dense={true}
            onChangeText={(email) => this.setAddParticipant(email)}
          />
          <Button
            loading={btnLoading}
            icon="plus"
            onPress={() => this.handleAddUser()}>
            Add Member
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
          renderItem={({item, index}) => {
            return (
              <Card
                style={styles.card}
                onPress={() => this.handleUserClick(index)}>
                <Card.Title title={item.name} />
              </Card>
            );
          }}
          ItemSeparatorComponent={() => <Divider style={styles.Divider} />}
        />
        <ActionSheet
          ref={(o) => (this.ActionSheet = o)}
          title={'What do you wanna do?'}
          options={['Remove User', 'Cancel']}
          cancelButtonIndex={1}
          destructiveButtonIndex={1}
          onPress={(index) => this.handleActionPress(index)}
        />
      </View>
    );
  }
}

export default BoxScreen;
