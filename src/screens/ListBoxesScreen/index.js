/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {View, FlatList, ToastAndroid, Dimensions} from 'react-native';
import {
  Text,
  Subheading,
  Headline,
  Card,
  TextInput,
  Divider,
  Button,
  DarkTheme,
} from 'react-native-paper';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import {Planet} from 'react-kawaii/lib/native/';
import Icons from 'react-native-vector-icons/Feather';

// importing firebase utils
import {createBox} from '../../utils/firebase.js';

// importing context
import {Context as UserContext} from '../../contexts/UserContext.js';

// importing styles
import styles from './styles.js';
import Styles from '../../Styles.js';

const {width} = Dimensions.get('window');

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
        this.setState({
          enrolledBoxes: u.enrolledBoxes,
        });
      })
      .catch((err) => {
        console.log(err);
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
    const {newBoxName} = this.state;
    if (newBoxName.trim() === '') {
      return ToastAndroid.showWithGravity(
        "You didn't type an box name!!! 🤣",
        ToastAndroid.LONG,
        ToastAndroid.CENTER,
      );
    }
    this.setBtnLoading(true);
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
    const {state} = this.context;
    const {enrolledBoxes, newBoxName, btnLoading} = this.state;
    return (
      <View style={styles.listCircleContainer}>
        <Text style={[Styles.fontSmall, styles.helpText]}>
          Boxes are your personal Friend/Family/Work groups where you share
          relevant posts which interest a perticular group. You can either join
          an existing group or create a new group.
        </Text>
        <View style={styles.addPartConatiner}>
          <Text style={Styles.fontSmall}>Create New Box</Text>
          <TextInput
            style={[Styles.fontMedium, styles.textInput]}
            mode="outlined"
            placeholder="Box Name"
            maxLength={30}
            dense={true}
            value={newBoxName}
            onChangeText={(nb) => this.setNewBoxName(nb)}
          />
          <Button
            labelStyle={Styles.fontSmall}
            loading={btnLoading}
            icon="plus"
            onPress={() => this.handleCreateBox()}>
            Create Box
          </Button>
        </View>
        <Divider />
        <FlatList
          ListHeaderComponent={() => {
            return <Text style={Styles.fontSmall}>Enrolled Boxes</Text>;
          }}
          ListHeaderComponentStyle={{margin: 10}}
          ListEmptyComponent={() => {
            return (
              <View style={styles.emptyComponentContainer}>
                <Planet
                  size={width / 2.5}
                  mood={newBoxName.length !== 0 ? 'lovestruck' : 'blissful'}
                  color="#FCCB7E"
                />
                <Headline style={[Styles.fontMedium, styles.noBoxesYet]}>
                  Here you create new Boxes and see what boxes you are enrolled
                  in. To switch boxes you just tap on them from the given list.
                  To get started create a New Box, don't forget to give it
                  exciting name.
                </Headline>
              </View>
            );
          }}
          data={enrolledBoxes}
          keyExtractor={(item) => item}
          renderItem={({item}) => {
            return (
              <Card
                onPress={() => this.handleSelectBox(item)}
                style={styles.card}>
                <Card.Content style={styles.cardContent}>
                  <Subheading styles={Styles.fontMedium}>{item}</Subheading>
                  {state.box === item ? (
                    <Icons
                      name="check"
                      size={20}
                      color={DarkTheme.colors.primary}
                    />
                  ) : null}
                </Card.Content>
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
