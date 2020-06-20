import React, {Component} from 'react';
import {View, ToastAndroid} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import ActionSheet from 'react-native-actionsheet';
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';

// importing components
import Post from '../../components/Post/index.js';

// importing firebase utils
import {deletePosts} from '../../utils/firebase.js';

// importing styles
import styles from './styles';

class PostViewScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      post: props.route.params.post,
      user: auth().currentUser,
    };
  }

  componentDidMount() {
    const {post} = this.state;

    database()
      .ref('posts/')
      .child(post.name.split('.')[0])
      .on('value', async (snap) => {
        try {
          const p = await snap.val();
          if (p === null) {
            throw new Error('The post might be deleted!');
          }
          return this.setState({
            post: p,
          });
        } catch (err) {
          console.log(err);
          ToastAndroid.showWithGravity(
            err.message,
            ToastAndroid.SHORT,
            ToastAndroid.CENTER,
          );
          this.props.navigation.goBack();
        }
      });
  }

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

  render() {
    const {user, post} = this.state;

    return (
      <View style={styles.postContainer}>
        <ScrollView>
          <Post
            item={post}
            uid={user.uid}
            postOptions={this.handlePostOptions}
            fullPost={true}
          />
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

export default PostViewScreen;
