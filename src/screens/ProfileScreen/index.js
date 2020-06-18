/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {
  View,
  Image,
  ScrollView,
  TouchableOpacity,
  ToastAndroid,
} from 'react-native';
import {Text, ActivityIndicator, Headline} from 'react-native-paper';
import ActionSheet from 'react-native-actionsheet';
import Icon from 'react-native-vector-icons/Feather';
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';

// importing components
import CacheImage from '../../components/CacheImage';

// importing firebase utils
import {deletePosts} from '../../utils/firebase.js';

// importing global styles
import Styles from '../../Styles';
import styles from './styles.js';

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

  handleOpenPost = (index) => {
    const {posts} = this.state;
    return this.props.navigation.navigate('Postview', {post: posts[index]});
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
              key={index}
              onPress={() => this.handleOpenPost(index)}
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
      <View style={styles.profileContainer}>
        <View style={styles.fixedTopHeader}>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate('Setting')}
            style={styles.fixedEditIcon}>
            <Icon name="edit-2" size={24} color="white" />
          </TouchableOpacity>
          <Image
            source={{uri: auth().currentUser.photoURL}}
            alt="User Image"
            style={styles.userImage}
          />
          <Headline>{user.displayName}</Headline>
          <View style={styles.fixedTopHeaderInnerSection}>
            <View style={styles.fixedTopHeaderCards}>
              <Text>{posts.length}</Text>
              <Text style={styles.postResp}>POSTS</Text>
            </View>
            <View style={styles.fixedTopHeaderCards}>
              <Text style={{color: 'red'}}>{this.state.love}</Text>
              <Icon name="heart" size={24} color="red" />
            </View>
            <View style={styles.fixedTopHeaderCards}>
              <Text style={{color: 'green'}}>{this.state.meh}</Text>
              <Icon name="meh" size={24} color="green" />
            </View>
            <View style={styles.fixedTopHeaderCards}>
              <Text style={{color: 'yellow'}}>{this.state.sad}</Text>
              <Icon name="frown" size={24} color="yellow" />
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

export default ProfileScreen;
