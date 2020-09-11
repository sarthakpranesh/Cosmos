/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {
  View,
  ScrollView,
  TouchableOpacity,
  ToastAndroid,
  Vibration,
  Dimensions,
  Animated,
} from 'react-native';
import {Text, ActivityIndicator, Headline} from 'react-native-paper';
import Icon from 'react-native-vector-icons/Feather';
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';
import firestore from '@react-native-firebase/firestore';
import {Ghost} from 'react-kawaii/lib/native/';

// importing components
import BottomSheet from '../../components/BottomSheet/index.js';
import ActiveImage from '../../components/ActiveImage/index.js';

// importing Context
import {Context as UserContext} from '../../contexts/UserContext.js';

// importing firebase utils
import {deletePosts} from '../../utils/firebase.js';

// importing global styles
import styles from './styles.js';
import Styles from '../../Styles.js';

const {width} = Dimensions.get('window');

class ProfileScreen extends Component {
  static contextType = UserContext;
  constructor(props) {
    super(props);
    const params = props.route.params;
    this.state = {
      name: params === undefined ? auth().currentUser.displayName : 'Username',
      photoUrl: '',
      posts: [],
      love: 0,
      meh: 0,
      sad: 0,
      isLoading: true,
      actionSheetIndex: -1,
      isBottomSheetOpen: false,
    };

    this.GhostAnimation = new Animated.Value(0);
    this.translateGhost = this.GhostAnimation.interpolate({
      inputRange: [0, 0.5, 1],
      outputRange: [-5, 5, -5],
      extrapolate: 'extend',
    });

    if (params === undefined) {
      this.uid = auth().currentUser.uid;
    } else {
      this.uid = params.uid ? params.uid : auth().currentUser.uid;
    }
    this.ActionSheet = null;
  }

  componentDidMount() {
    firestore()
      .collection('Users')
      .doc(this.uid)
      .onSnapshot(
        (snap) => {
          try {
            const u = snap.data();
            if (u === undefined) {
              throw new Error('User not found, Your account might be deleted!');
            }
            this.setState({
              name: u.name,
              photoURL: u.photoURL,
            });
          } catch (err) {
            console.log(err.message);
          }
        },
        (err) => {
          console.log(err);
        },
      );

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
            return this.setState({
              posts: [],
              love: 0,
              meh: 0,
              sad: 0,
              isLoading: false,
            });
          }
          const posts = Object.keys(postsObj).map((key) => {
            return postsObj[key];
          });
          const userPosts = posts.filter(({uid}) => uid === this.uid);
          let love = 0,
            meh = 0,
            sad = 0;
          userPosts.forEach((post) => {
            love += post.love ? post.love.length : 0;
            meh += post.meh ? post.meh.length : 0;
            sad += post.sad ? post.sad.length : 0;
          });
          this.setState({
            posts: userPosts,
            love,
            meh,
            sad,
            isLoading: false,
          });
        } catch (err) {
          console.log(err.message);
          this.setLoading(false);
        }
      });
  }

  setPosts = (userPosts) => {
    this.setState({
      posts: userPosts,
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

  handlePostOptions = (postIndex) => {
    this.setBottomSheet(true, postIndex);
    Vibration.vibrate(50);
  };

  handleDeletePost = () => {
    const {actionSheetIndex, posts} = this.state;
    const {state} = this.context;
    database()
      .ref(state.box)
      .child(posts[actionSheetIndex].name.split('.')[0])
      .off();
    deletePosts(state.box, posts[actionSheetIndex].name);
    ToastAndroid.showWithGravity(
      'Post Deleted Successfully',
      ToastAndroid.SHORT,
      ToastAndroid.CENTER,
    );
    this.setBottomSheet(false, -1);
  };

  renderPosts = () => {
    const {posts, isLoading} = this.state;

    if (isLoading) {
      return <ActivityIndicator />;
    }

    if (posts.length === 0) {
      Animated.loop(
        Animated.timing(this.GhostAnimation, {
          toValue: 1,
          duration: 4000,
          useNativeDriver: true,
        }),
        {
          iterations: -1,
          resetBeforeIteration: false,
        },
      ).start();
      return (
        <View style={styles.emptyPostContainer}>
          <Animated.View
            style={{transform: [{translateY: this.translateGhost}]}}>
            <Ghost size={width / 2.5} mood="sad" color="#E0E4E8" />
          </Animated.View>
          <Headline style={[Styles.fontMedium, styles.noPostYetText]}>
            You haven't shared anything today!
          </Headline>
        </View>
      );
    }

    return (
      <View style={styles.postContainer}>
        {posts.map((i, index) => {
          return (
            <TouchableOpacity
              key={index}
              onPress={() => this.handleOpenPost(index)}
              onLongPress={() => this.handlePostOptions(index)}>
              <ActiveImage
                key={i.name}
                uri={i.postURL}
                size={width / 3 - 0.8}
                style={styles.postImageCard}
              />
            </TouchableOpacity>
          );
        })}
      </View>
    );
  };

  render() {
    const {
      name,
      posts,
      photoURL,
      love,
      meh,
      sad,
      isBottomSheetOpen,
    } = this.state;
    return (
      <View style={styles.profileContainer}>
        <BottomSheet
          isOpen={isBottomSheetOpen}
          closeBottomSheet={() => this.setBottomSheet(false)}
          options={[
            {text: 'Delete Post', onPress: () => this.handleDeletePost()},
          ]}
        />
        <View style={styles.fixedTopHeader}>
          <ActiveImage
            uri={photoURL}
            style={styles.userImage}
            size={width / 4}
          />
          <Headline style={Styles.fontLarge}>{name}</Headline>
          <View style={styles.fixedTopHeaderInnerSection}>
            <View style={styles.fixedTopHeaderCards}>
              <Text style={Styles.fontMedium}>{posts.length}</Text>
              <Text style={Styles.fontMedium}>POSTS</Text>
            </View>
            <View style={styles.fixedTopHeaderCards}>
              <Text style={[Styles.fontMedium, {color: 'red'}]}>{love}</Text>
              <Icon name="heart" size={width * 0.06} color="red" />
            </View>
            <View style={styles.fixedTopHeaderCards}>
              <Text style={[Styles.fontMedium, {color: 'green'}]}>{meh}</Text>
              <Icon name="meh" size={width * 0.06} color="green" />
            </View>
            <View style={styles.fixedTopHeaderCards}>
              <Text style={[Styles.fontMedium, {color: 'yellow'}]}>{sad}</Text>
              <Icon name="frown" size={width * 0.06} color="yellow" />
            </View>
          </View>
        </View>
        <ScrollView style={styles.scrollBottomView} onScrollAnimationEnd>
          {this.renderPosts()}
        </ScrollView>
      </View>
    );
  }
}

export default ProfileScreen;
