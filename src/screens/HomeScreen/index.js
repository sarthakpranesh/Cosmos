/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {View, FlatList, ToastAndroid, Alert, Dimensions} from 'react-native';
import {Divider, Headline} from 'react-native-paper';
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';
import firestore from '@react-native-firebase/firestore';
import {IceCream, Planet} from 'react-kawaii/lib/native/';

// importing component
import Post from '../../components/Post/index.js';
import PostOptions from '../../components/Post/PostOptions.js';
import BoxLoading from '../../components/LottieComponents/BoxLoading/index.js';
import BottomSheet from '../../components/BottomSheet/index.js';

//importing Context
import {Context as UserContext} from '../../contexts/UserContext.js';

// importing utils
import {deletePosts, getUserDetails} from '../../utils/firebase.js';
import {firebaseReactionNotify} from '../../utils/Notifications/index.js';
import {onShare, onDelete} from '../../utils/Handlers/PostHandlers.js';

// importing styles
import styles from './styles.js';
import Styles from '../../Styles.js';

const {width} = Dimensions.get('window');

class Main extends Component {
  static contextType = UserContext;
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      user: auth().currentUser,
      posts: [],
      actionSheetIndex: -1,
      isBottomSheetOpen: false,
    };
    this.ActionSheet = null;
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
            this.setLoading(false);
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
          .onSnapshot(
            (docSnap) => {
              const boxData = docSnap.data();
              if (boxData === undefined) {
                currentBox('');
                return;
              }
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
                  })
                  .catch((err) => {
                    console.log(err);
                  });
              }
            },
            (err) => {
              console.log(err.message);
            },
          );
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

  setBottomSheet = (bool, postIndex) => {
    this.setState({
      isBottomSheetOpen: bool,
      actionSheetIndex: postIndex,
    });
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
    this.setBottomSheet(true, postIndex);
  };

  renderPosts = () => {
    const {isLoading, posts, user} = this.state;
    const {state} = this.context;

    if (isLoading) {
      return <BoxLoading />;
    }

    if (state.box === '') {
      return (
        <View style={styles.listEmptyComponent}>
          <Planet size={width / 2.5} mood="excited" color="#FCCB7E" />
          <Headline style={[Styles.fontMedium, styles.noPostYetText]}>
            Hey! My names Planet and I'll be helping you get started. I am so
            excited to show you around. Click the "Box" icon in the top right
            corner to get started
          </Headline>
        </View>
      );
    }

    if (posts.length === 0) {
      return (
        <View style={styles.listEmptyComponent}>
          <IceCream size={width / 2.5} mood="blissful" color="#FDA7DC" />
          <Headline style={[Styles.fontMedium, styles.noPostYetText]}>
            Hello! I am Ice Cream. I pay visits when everything looks dull.
            Looks like no one shared anything today. Add more people to the box
            and get ahead of the rest by posting an update.
          </Headline>
        </View>
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
    const {isBottomSheetOpen, posts, actionSheetIndex} = this.state;
    const {state} = this.context;
    return (
      <View style={styles.mainContainer}>
        {this.renderPosts()}
        <PostOptions
          isOpen={isBottomSheetOpen}
          closeSheet={() => this.setBottomSheet(false, -1)}
          box={state.box}
          postName={posts[actionSheetIndex]?.name}
        />
      </View>
    );
  }
}

export default Main;
