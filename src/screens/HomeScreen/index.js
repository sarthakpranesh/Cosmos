/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {View, FlatList, ToastAndroid} from 'react-native';
import {Text, ActivityIndicator, Divider} from 'react-native-paper';
import ActionSheet from 'react-native-actionsheet';
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';

// importing component
import Post from '../../components/Post/index.js';

// importing firebase utils
import {getUserDetails, deletePosts} from '../../utils/firebase.js';

// importing styles
import styles from './styles.js';

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      index: 0,
      isLoading: true,
      user: auth().currentUser,
      posts: [],
      actionSheetIndex: -1,
    };
    this.ActionSheet = null;
  }

  componentDidMount() {
    const {user} = this.state;
    getUserDetails(user.uid); // initialises user in rtdb if user record nor present
    this.onFirebaseFetchPosts();
  }

  onFirebaseFetchPosts = () => {
    database()
      .ref('posts/')
      .on('value', (snap) => {
        try {
          const postsObj = snap.val();
          if (postsObj === null) {
            this.setLoading(false);
            return;
          }
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
  };

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

  onTabCard = (cardIndex) => {
    const {posts} = this.state;
    this.props.navigation.navigate('PostViewScreen', {card: posts[cardIndex]});
  };

  handleOpenPost = (index) => {
    const {posts} = this.state;
    return this.props.navigation.navigate('Postview', {post: posts[index]});
  };

  handlePostOptions = (postIndex) => {
    this.setState({
      actionSheetIndex: postIndex,
    });
    this.ActionSheet.show();
  };

  handleActionPress = async (index) => {
    const {actionSheetIndex, posts} = this.state;
    // if index is 0 - handle delete
    if (index === 0) {
      await deletePosts(posts[actionSheetIndex].name);
      ToastAndroid.showWithGravity(
        'Post Deleted Successfully',
        ToastAndroid.SHORT,
        ToastAndroid.CENTER,
      );
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

  renderPosts = () => {
    const {isLoading, posts, user} = this.state;

    if (isLoading) {
      return <ActivityIndicator />;
    }

    if (posts.length === 0) {
      return (
        <Text style={styles.noPostYetText}>
          Waiting For Someone to Upload Something Interesting 🎨
        </Text>
      );
    }

    return (
      <FlatList
        data={posts}
        renderItem={({item, index}) => {
          return (
            <Post
              item={item}
              uid={user.uid}
              postOptions={() => this.handlePostOptions(index)}
              handleOpenPost={() => this.handleOpenPost(index)}
            />
          );
        }}
        keyExtractor={(item) => item.name}
        ItemSeparatorComponent={() => (
          <Divider style={{height: 1, backgroundColor: 'black'}} />
        )}
      />
    );
  };

  render() {
    return (
      <View style={styles.mainContainer}>
        {this.renderPosts()}
        <ActionSheet
          ref={(o) => (this.ActionSheet = o)}
          title={'What do you wanna do?'}
          options={['Delete', 'Cancel']}
          cancelButtonIndex={1}
          destructiveButtonIndex={1}
          onPress={(index) => this.handleActionPress(index)}
        />
      </View>
    );
  }
}

export default Main;
