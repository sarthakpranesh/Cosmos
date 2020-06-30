/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {View, FlatList, ToastAndroid, Alert} from 'react-native';
import {Text, Card, TextInput, Divider, Button} from 'react-native-paper';
import Icon from 'react-native-vector-icons/Feather';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

// importing firebase utils
import {createBox} from '../../utils/firebase.js';

// importing context
import {Context as UserContext} from '../../contexts/UserContext.js';

// importing styles
import styles from './styles.js';
import BoxScreen from '../BoxScreen/index.js';

class ListBoxesScreen extends Component {
  static contextType = UserContext;
  constructor(props) {
    super(props);

    this.state = {
      user: auth().currentUser,
      enrolledBoxes: [],
      newBoxName: '',
      btnLoading: false,
    };
  }

  componentDidMount() {
    const {state} = this.context;

    firestore()
      .collection('Users')
      .doc(state.uid)
      .get()
      .then((snap) => {
        const u = snap.data();
        if (u.enrolledBoxes.length === 0) {
          Alert.alert(
            'Join Box',
            'Please start with either creating or asking a friend to add you in there box!',
            [{text: 'Ok'}],
            {cancelable: true},
          );
        }
        this.setState({
          enrolledBoxes: u.enrolledBoxes,
        });
      })
      .catch((err) => {
        console.log(err);
        ToastAndroid.showWithGravity(
          err.message,
          ToastAndroid.SHORT,
          ToastAndroid.CENTER,
        );
      });
  }

  setBtnLoading = (bool) => {
    this.setState({
      btnLoading: bool,
    });
  };

  setNewBoxName = (nb) => {
    this.setState({
      newBoxName: nb,
    });
  };

  handleCreateBox = () => {
    this.setBtnLoading(true);
    const {newBoxName} = this.state;
    createBox(newBoxName)
      .then(() => {
        this.handleSelectBox(newBoxName);
        this.setBtnLoading(false);
      })
      .catch((err) => {
        ToastAndroid.showWithGravity(
          err.message,
          ToastAndroid.LONG,
          ToastAndroid.CENTER,
        );
        this.setBtnLoading(false);
      });
  };

  handleSelectBox = (boxName) => {
    const {currentBox} = this.context;
    currentBox(boxName);
    this.props.navigation.navigate('HomeScreen', {boxName});
  };

  render() {
    const {enrolledBoxes, newBoxName, btnLoading} = this.state;
    return (
      <View style={styles.listCircleContainer}>
        <Text style={styles.helpText}>
          Boxes are your personal Friend/Family/Work groups where you share
          relevant posts which interest a perticular group. You can either join
          an existing group or create a new group.
        </Text>
        <View style={styles.addPartConatiner}>
          <Text>Create New Box</Text>
          <TextInput
            style={styles.textInput}
            mode="outlined"
            placeholder="Box Name"
            dense={true}
            value={newBoxName}
            onChangeText={(nb) => this.setNewBoxName(nb)}
          />
          <Button
            loading={btnLoading}
            icon="plus"
            onPress={() => this.handleCreateBox()}>
            Create Box
          </Button>
        </View>
        <Divider />
        <FlatList
          ListHeaderComponent={() => {
            return <Text>Your enrolled Boxes</Text>;
          }}
          ListHeaderComponentStyle={{margin: 10}}
          ListEmptyComponent={() => {
            return (
              <Text style={{marginHorizontal: 10}}>
                Please Ask a Friend to Enroll you in a Box or create a Box
              </Text>
            );
          }}
          style={styles.CardList}
          data={enrolledBoxes}
          keyExtractor={(item) => item}
          renderItem={({item, index}) => {
            return (
              <Card
                onPress={() => this.handleSelectBox(item)}
                style={styles.card}>
                <Card.Title title={item} />
              </Card>
            );
          }}
          ItemSeparatorComponent={() => <Divider style={styles.Divider} />}
        />
      </View>
    );
  }
}

export default ListBoxesScreen;
