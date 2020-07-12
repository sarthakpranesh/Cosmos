/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {View, FlatList, ToastAndroid, Alert} from 'react-native';
import {ActivityIndicator, Divider, Headline} from 'react-native-paper';
import ActionSheet from 'react-native-actionsheet';
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';
import firestore from '@react-native-firebase/firestore';

// importing component
import Post from '../../components/Post/index.js';

//importing Context
import {Context as UserContext} from '../../contexts/UserContext.js';

// importing utils
import {deletePosts, getUserDetails} from '../../utils/firebase.js';
import startNotificationListening, {
  firebaseReactionNotify,
} from '../../utils/Notifications/index.js';

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
    startNotificationListening();
  }

  componentDidMount() {
    fetch('https://cosmos-backend.herokuapp.com/')
      .then((resp) => {
        console.log(resp.status);
      })
      .catch((err) => {
        console.log(err);
      });
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
          console.log(err.message);
        });
    } else {
      if (state.box === '') {
        this.setLoading(false);
        return;
      } else {
        this.onFirebaseFetchPosts();

        // listen to box changes
        firestore()
          .collection('Boxes')
          .doc(state.box)
          .onSnapshot((docSnap) => {
            const boxData = docSnap.data();
            const checkMembership = boxData.enrolledBy.some(
              (user) => state.uid === user.uid,
            );
            console.log('Is user a member: ', checkMembership);
            if (!checkMembership) {
              firestore()
                .collection('Users')
                .doc(state.uid)
                .get()
                .then((doc) => {
                  const userData = doc.data();
                  if (userData.enrolledBoxes.length !== 0) {
                    currentBox(userData.enrolledBoxes[0]);
                    Alert.alert(
                      'Oops',
                      'Looks like the admin removed you from the box!',
                      [{text: 'ok'}],
                      {cancelable: true},
                    );
                  } else {
                    currentBox('');
                  }
                });
            }
          });
      }
    }
  }

  onFirebaseFetchPosts = () => {
    const {state} = this.context;
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
          let p = Object.keys(postsObj).map((key) => {
            return postsObj[key];
          });
          p = p.sort((a, b) => b.date - a.date);
          firebaseReactionNotify(this.state.posts, p);
          this.setPosts(p);
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
          options={['Delete Post', 'Cancel']}
          cancelButtonIndex={1}
          destructiveButtonIndex={1}
          onPress={(index) => this.handleActionPress(index)}
        />
      </View>
    );
  }
}

export default Main;
