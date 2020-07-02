/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {View, FlatList, ToastAndroid, Alert} from 'react-native';
import {ActivityIndicator, Divider, Headline} from 'react-native-paper';
import ActionSheet from 'react-native-actionsheet';
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';

// importing component
import Post from '../../components/Post/index.js';

//importing Context
import {Context as UserContext} from '../../contexts/UserContext.js';

// importing firebase utils
import {deletePosts, getUserDetails} from '../../utils/firebase.js';

// importing styles
import styles from './styles.js';

class Main extends Component {
  static contextType = UserContext;
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      user: auth().currentUser,
      posts: [],
      actionSheetIndex: -1,
    };
    this.ActionSheet = null;
  }

  componentDidMount() {
    const {state, currentBox} = this.context;
    if (state.box === '') {
      getUserDetails(state.uid)
        .then(async (u) => {
          if (u.enrolledBoxes.length === 0) {
            this.handleNoBoxSet();
          } else {
            currentBox(u.enrolledBoxes[0]);
          }
        })
        .catch((err) => {
          ToastAndroid.showWithGravity(
            err.message,
            ToastAndroid.LONG,
            ToastAndroid.CENTER,
          );
        });
    } else {
      this.onFirebaseFetchPosts();
    }
  }

  onFirebaseFetchPosts = () => {
    const {state} = this.context;
    if (state.box === '') {
      this.setLoading(false);
      return;
    }
    database()
      .ref(state.box)
      .on('value', (snap) => {
        try {
          const postsObj = snap.val();
          if (postsObj === null) {
            this.setPosts([]);
            this.setLoading(false);
            return;
          }
          const posts = Object.keys(postsObj).map((key) => {
            return postsObj[key];
          });
          this.setPosts(posts);
          this.setLoading(false);
        } catch (err) {
          console.log(err.message);
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

  handleNoBoxSet = () => {
    this.setLoading(false);
    Alert.alert(
      'Join Box',
      'To get started you need to join a Box or create your own Box',
      [
        {
          text: 'Next',
          onPress: () => {
            this.props.navigation.navigate('ListCircle');
          },
        },
      ],
      {
        cancelable: false,
      },
    );
  };

  handleOpenPost = (index) => {
    const {posts} = this.state;
    return this.props.navigation.navigate('Postview', {post: posts[index]});
  };

  handleOpenAccount = (userUid) => {
    return this.props.navigation.navigate('ProfileScreen', {uid: userUid});
  };

  handleOpenComment = (index) => {
    const {posts} = this.state;
    return this.props.navigation.navigate('CommentScreen', {
      post: posts[index],
    });
  };

  handlePostOptions = (postIndex) => {
    this.setState({
      actionSheetIndex: postIndex,
    });
    this.ActionSheet.show();
  };

  handleActionPress = async (index) => {
    const {actionSheetIndex, posts} = this.state;
    const {state} = this.context;
    // if index is 0 - handle delete
    if (index === 0) {
      await deletePosts(state.box, posts[actionSheetIndex].name);
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
    const {state} = this.context;

    if (isLoading) {
      return <ActivityIndicator />;
    }

    if (state.box === '') {
      return (
        <Headline style={styles.noPostYetText}>
          Please create or ask a friend to add you to a box!
        </Headline>
      );
    }

    if (posts.length === 0) {
      return (
        <Headline style={styles.noPostYetText}>
          Waiting For Someone to Upload Something Interesting 🎨
        </Headline>
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
              handleOpenAccount={() => this.handleOpenAccount(item.uid)}
              handleOpenComment={() => this.handleOpenComment(index)}
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
