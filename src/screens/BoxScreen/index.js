/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {View, ToastAndroid, FlatList} from 'react-native';
import {
  Card,
  Headline,
  Subheading,
  Text,
  Divider,
  Button,
  TextInput,
  ActivityIndicator,
} from 'react-native-paper';

// importing components
import BottomSheet from '../../components/BottomSheet/index.js';

// importing firebase utils
import {getBox, addUserToBox, removeUserFromBox} from '../../utils/firebase.js';

// importing context
import {Context as UserContext} from '../../contexts/UserContext.js';

// importing styles
import styles from './styles.js';
import Styles from '../../Styles.js';

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
      isBottomSheetOpen: false,
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

  setBottomSheet = (bool, postIndex) => {
    this.setState({
      isBottomSheetOpen: bool,
      actionSheetIndex: postIndex,
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

  handleOptions = (postIndex) => {
    this.setBottomSheet(true, postIndex);
  };

  handleRemoveUser = () => {
    const {actionSheetIndex, enrolledBy, auth} = this.state;
    const {state} = this.context;
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
      })
      .finally(() => this.fetchEnrolledUsers());
    this.setBottomSheet(false, -1);
  };

  render() {
    const {enrolledBy, btnLoading, isBottomSheetOpen} = this.state;

    return (
      <View style={styles.boxScreenContainer}>
        <View style={styles.authorContainer}>
          <Headline style={Styles.fontMedium}>
            Author: {this.state.auth[0]}
          </Headline>
        </View>
        <View style={styles.addPartConatiner}>
          <Text style={Styles.fontSmall}>Add Participant</Text>
          <TextInput
            style={[Styles.fontMedium, styles.textInput]}
            mode="outlined"
            placeholder="Email"
            maxLength={50}
            value={this.state.email}
            dense={true}
            onChangeText={(email) => this.setAddParticipant(email)}
          />
          <Button
            labelStyle={Styles.fontSmall}
            loading={btnLoading}
            icon="plus"
            onPress={() => this.handleAddUser()}>
            Add Member
          </Button>
        </View>
        <FlatList
          ListHeaderComponent={() => {
            return (
              <Text style={Styles.fontSmall}>
                Enrolled Users: {enrolledBy.length}
              </Text>
            );
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
                onPress={() => this.handleOptions(index)}>
                <Card.Content>
                  <Subheading style={Styles.fontMedium}>{item.name}</Subheading>
                </Card.Content>
              </Card>
            );
          }}
          ItemSeparatorComponent={() => <Divider style={styles.Divider} />}
        />
        <BottomSheet
          isOpen={isBottomSheetOpen}
          closeBottomSheet={() => this.setBottomSheet(false)}
          options={[{text: 'Remove User', onPress: this.handleRemoveUser}]}
        />
      </View>
    );
  }
}

export default BoxScreen;
