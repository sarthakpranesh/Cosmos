import React, {Component} from 'react';
import {
  View,
  StyleSheet,
  Image,
  ScrollView,
  Dimensions,
  TouchableOpacity,
  ToastAndroid,
} from 'react-native';
import {Text, ActivityIndicator, DarkTheme} from 'react-native-paper';
import ActionSheet from 'react-native-actionsheet';
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';

// importing components
import CacheImage from '../../components/CacheImage';

// importing firebase utils
import {deletePosts} from '../../utils/firebase.js';

// importing global styles
import Styles from '../../Styles';

const SCREEN_HEIGHT = Dimensions.get('window').height;
const SCREEN_WIDTH = Dimensions.get('window').width;

class ProfileScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: auth().currentUser,
      posts: [],
      love: 0,
      meh: 0,
      sad: 0,
      isLoading: true,
      actionSheetIndex: -1,
    };

    this.ActionSheet = null;
  }

  componentDidMount() {
    const {user} = this.state;
    database()
      .ref('users/')
      .child(user.uid)
      .on('value', (snap) => {
        try {
          const u = snap.val();
          this.setState({
            love: u.love ? u.love : 0,
            meh: u.meh ? u.meh : 0,
            sad: u.sad ? u.sad : 0,
          });
        } catch (err) {
          console.log(err);
          ToastAndroid.showWithGravity(
            err.message,
            ToastAndroid.SHORT,
            ToastAndroid.CENTER,
          );
        }
      });

    database()
      .ref('posts/')
      .on('value', (snap) => {
        try {
          const postsObj = snap.val();
          const posts = Object.keys(postsObj).map((key) => {
            return postsObj[key];
          });
          const userPosts = posts.filter(({uid}) => uid === user.uid);
          this.setPosts(userPosts);
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

  handleCardLongPress = (cardIndex) => {
    this.setState({
      actionSheetIndex: cardIndex,
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
    const {posts, isLoading} = this.state;

    if (isLoading) {
      return (
        <View style={[Styles.mainContainerBackgroundColor]}>
          <ActivityIndicator />
        </View>
      );
    }

    return (
      <View style={styles.postContainer}>
        {posts.map((i, index) => {
          return (
            <TouchableOpacity
              onLongPress={() => this.handleCardLongPress(index)}>
              <CacheImage
                key={i.name}
                uri={i.postURL}
                style={styles.postImageCard}
              />
            </TouchableOpacity>
          );
        })}
      </View>
    );
  };

  render() {
    const {user, posts} = this.state;
    return (
      <View style={[Styles.mainContainerBackgroundColor]}>
        <View style={styles.fixedTopHeader}>
          <Image
            source={{uri: auth().currentUser.photoURL}}
            alt="User Image"
            style={styles.userImage}
          />
          <Text style={[Styles.textMedium, styles.headerUsername]}>
            {user.displayName}
          </Text>
          <View style={styles.fixedTopHeaderInnerSection}>
            <View style={styles.fixedTopHeaderCards}>
              <Text style={styles.postResp}>{posts.length}</Text>
              <Text style={[Styles.textSmall, styles.postResp]}>Posts</Text>
            </View>
            <View style={styles.fixedTopHeaderCards}>
              <Text style={styles.postResp}>{this.state.love}</Text>
              <Text style={[Styles.textSmall, styles.postResp]}>Lovers</Text>
            </View>
            <View style={styles.fixedTopHeaderCards}>
              <Text style={styles.postResp}>{this.state.meh}</Text>
              <Text style={[Styles.textSmall, styles.postResp]}>Mehs</Text>
            </View>
            <View style={styles.fixedTopHeaderCards}>
              <Text style={styles.postResp}>{this.state.sad}</Text>
              <Text style={[Styles.textSmall, styles.postResp]}>Sads</Text>
            </View>
          </View>
        </View>
        <ScrollView style={styles.scrollBottomView} onScrollAnimationEnd>
          {this.renderPosts()}
        </ScrollView>
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

const styles = StyleSheet.create({
  fixedTopHeader: {
    height: SCREEN_HEIGHT / 3,

    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: DarkTheme.colors.background,
    paddingTop: 10,
  },
  userImage: {
    height: SCREEN_WIDTH / 4,
    width: SCREEN_WIDTH / 4,
    borderRadius: 50,
  },
  headerUsername: {
    marginTop: 10,
    fontWeight: 'bold',
  },
  fixedTopHeaderInnerSection: {
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT / 9,
    margin: 0,

    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',

    paddingHorizontal: 60,
  },
  fixedTopHeaderCards: {
    height: SCREEN_HEIGHT / 9,
    width: SCREEN_WIDTH / 3 - 40,

    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  postResp: {},
  scrollBottomView: {
    height: (2 * SCREEN_HEIGHT) / 3 - 60,
  },
  postContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  postImageCard: {
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    width: SCREEN_WIDTH / 3 - 0.8,
    height: SCREEN_WIDTH / 3 - 0.8,
    borderColor: 'white',
    borderWidth: 0.4,
  },
});

export default ProfileScreen;
