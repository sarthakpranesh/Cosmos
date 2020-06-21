import React, {Component} from 'react';
import {View, FlatList, ToastAndroid} from 'react-native';
import {Text, Card, Searchbar, Divider} from 'react-native-paper';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

// importing styles
import styles from './styles.js';

class ListCircleScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: auth().currentUser,
      enrolledBoxes: [],
      searchQuery: '',
    };
  }

  componentDidMount() {
    const {user} = this.state;

    firestore()
      .collection('Users')
      .doc(user.uid)
      .get()
      .then((snap) => {
        const u = snap.data();
        if (u.enrolledBoxes.length === 0) {
          throw new Error(
            'Please start with either creating or joinging a Box!',
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

  _onChangeSearch = (searchQuery) => {
    this.setState({
      searchQuery,
    });
  };

  render() {
    const {enrolledBoxes, searchQuery} = this.state;
    return (
      <View style={styles.listCircleContainer}>
        <Text style={styles.helpText}>
          Boxes are your personal Friend/Family/Work groups where you share
          relevant posts which interest a perticular group. You can either join
          or create a group.
        </Text>
        <Searchbar
          style={styles.searchBar}
          placeholder="Search"
          onChangeText={this._onChangeSearch}
          value={searchQuery}
        />
        <Divider />
        <FlatList
          style={styles.CardList}
          data={enrolledBoxes}
          keyExtractor={(item) => item}
          renderItem={({item, index}) => {
            return (
              <Card key={index} style={styles.card}>
                <Card.Title title={item} />
              </Card>
            );
          }}
        />
      </View>
    );
  }
}

export default ListCircleScreen;
