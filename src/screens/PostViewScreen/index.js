/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {View, ToastAndroid} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';
import ActionSheet from 'react-native-actionsheet';
import auth from '@react-native-firebase/auth';

// importing components
import Post from '../../components/Post/index.js';

// importing firebase utils
import {deletePosts} from '../../utils/firebase.js';

// importing styles
import styles from './styles';

class PostViewScreen extends Component {
  constructor(props) {
    super(props);
    this.post = props.route.params.post;
    this.state = {
      user: auth().currentUser,
    };
  }

  componentDidMount() {}

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
    const {user} = this.state;

    return (
      <View style={styles.postContainer}>
        <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
          <Icon
            style={styles.backBtn}
            name="arrow-left"
            size={30}
            color="white"
          />
        </TouchableOpacity>
        <ScrollView>
          <Post
            item={this.post}
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
