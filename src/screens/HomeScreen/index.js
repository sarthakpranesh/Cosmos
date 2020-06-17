/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {View, StyleSheet, FlatList, ToastAndroid} from 'react-native';
import {Text, ActivityIndicator, Divider} from 'react-native-paper';
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';

// importing component
import Post from '../../components/Post/index.js';

// importing styles
import Styles from '../../Styles';
import {getUserDetails} from '../../utils/firebase.js';

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      index: 0,
      isLoading: true,
      user: auth().currentUser,
      posts: [],
    };
  }

  componentDidMount() {
    const {user} = this.state;
    getUserDetails(user.uid);
    database()
      .ref('posts/')
      .on('value', (snap) => {
        try {
          const postsObj = snap.val();
          const posts = Object.keys(postsObj).map((key) => {
            return postsObj[key];
          });
          this.setPosts(posts);
          this.setLoading(false);
        } catch (err) {
          console.log(err);
          ToastAndroid.showWithGravity(
            err.message,
            ToastAndroid.SHORT,
            ToastAndroid.CENTER,
          );
        }
      });
  }

  setPosts = (posts) => {
    this.setState({
      posts,
    });
  };

  setLoading = (bool) => {
    this.setState({
      isLoading: bool,
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
          return <Post item={item} />;
        }}
        keyExtractor={(item) => item.name}
        ItemSeparatorComponent={() => (
          <Divider style={{height: 1, backgroundColor: 'black'}} />
        )}
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
