import React, {Component} from 'react';
import {View, ToastAndroid} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import ActionSheet from 'react-native-actionsheet';
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';

// importing components
import Post from '../../components/Post/index.js';

// importing Context
import {Context as UserContext} from '../../contexts/UserContext.js';

// importing firebase utils
import {deletePosts} from '../../utils/firebase.js';

// importing styles
import styles from './styles';

class PostViewScreen extends Component {
  static contextType = UserContext;
  constructor(props) {
    super(props);

    this.state = {
      post: props.route.params.post,
      user: auth().currentUser,
    };
  }

  componentDidMount() {
    const {post} = this.state;
    const {state} = this.context;

    database()
      .ref(state.box)
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
          this.props.navigation.goBack();
        }
      });
  }

  handlePostOptions = () => {
    this.ActionSheet.show();
  };

  handleOpenComment = () => {
    const {post} = this.state;
    return this.props.navigation.navigate('CommentScreen', {
      post: post,
    });
  };

  handleActionPress = async (index) => {
    const {post} = this.state;
    const {state} = this.context;
    // if index is 0 - handle delete
    if (index === 0) {
      console.log(state);
      console.log('post name: ', post.name);
      await deletePosts(state.box, post.name);
      ToastAndroid.showWithGravity(
        'Post Deleted Successfully',
        ToastAndroid.SHORT,
        ToastAndroid.CENTER,
      );
      this.props.navigation.goBack();
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
            handleOpenComment={this.handleOpenComment}
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
