/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {View, StyleSheet, FlatList, ToastAndroid} from 'react-native';
import {Text, ActivityIndicator} from 'react-native-paper';
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';

// importing component
import Post from '../../components/Post/index.js';

// importing firebase utils;
import {getUserDetails} from '../../utils/firebase.js';

// importing styles
import Styles from '../../Styles';

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      index: 0,
      isLoading: false,
      user: auth().currentUser,
      posts: [],
    };
  }

  componentDidMount() {
    getUserDetails();
    database()
      .ref('posts/')
      .once('value')
      .then((postsObjFire) => postsObjFire.val())
      .then((postsObj) => {
        const posts = Object.keys(postsObj).map((key) => {
          return postsObj[key];
        });
        this.setPosts(posts);
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

  setPosts = (posts) => {
    this.setState({
      posts,
    });
  };

  onSwipedAll = async (i) => {
    this.setState({
      isLoading: true,
    });
    this.loadPosts();
  };

  onTabCard = (cardIndex) => {
    const {posts} = this.state;
    this.props.navigation.navigate('PostViewScreen', {card: posts[cardIndex]});
  };

  renderPosts = () => {
    const {isLoading, posts} = this.state;

    console.log('Posts length: ', posts.length);

    if (isLoading) {
      return <ActivityIndicator />;
    }

    if (posts.length === 0) {
      return (
        <Text
          style={[
            Styles.textMedium,
            {
              flexWrap: 'wrap',
              textAlign: 'center',
              marginHorizontal: 10,
            },
          ]}>
          Waiting For Someone to Upload Something Interesting 🎨
        </Text>
      );
    }

    return (
      <FlatList
        data={posts}
        renderItem={({item, index}) => {
          return <Post key={index} item={item} />;
        }}
      />
    );
  };

  render() {
    return <View style={styles.mainContainer}>{this.renderPosts()}</View>;
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Main;
