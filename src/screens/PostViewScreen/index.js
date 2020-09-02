import React, {Component} from 'react';
import {View, ToastAndroid} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';

// importing components
import Post from '../../components/Post/index.js';
import ErrorManager from '../../components/ErrorManager/index.js';
import BottomSheet from '../../components/BottomSheet/index.js';

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

      isErrorManagerVisible: false,
      errorMessage: '',
      isBottomSheetOpen: false,
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
          database().ref(state.box).child(post.name.split('.')[0]).off();
          this.setErrorManager(
            true,
            'Oops! Meaw that post expired and was automatically removed after 24h, catch up with you later',
          );
        }
      });
  }

  setErrorManager = (isVisible, errorMessage) => {
    this.setState({
      isErrorManagerVisible: isVisible,
      errorMessage,
    });
  };

  setBottomSheet = (bool, postIndex) => {
    this.setState({
      isBottomSheetOpen: bool,
      actionSheetIndex: postIndex,
    });
  };

  handlePostOptions = (postIndex) => {
    this.setBottomSheet(true, postIndex);
  };

  handleDeletePost = () => {
    const {post} = this.state;
    const {state} = this.context;
    database().ref(state.box).child(post.name.split('.')[0]).off();
    deletePosts(state.box, post.name);
    ToastAndroid.showWithGravity(
      'Post Deleted Successfully',
      ToastAndroid.SHORT,
      ToastAndroid.CENTER,
    );
    this.setBottomSheet(false, -1);
    this.props.navigation.goBack();
  };

  handleOpenComment = () => {
    const {post} = this.state;
    return this.props.navigation.navigate('CommentScreen', {
      post: post,
    });
  };

  render() {
    const {
      user,
      post,
      isErrorManagerVisible,
      errorMessage,
      isBottomSheetOpen,
    } = this.state;

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
        <ErrorManager
          hideModal={() => {
            this.setErrorManager(false, '');
            this.props.navigation.goBack();
          }}
          isVisible={isErrorManagerVisible}
          message={errorMessage}
        />
        <BottomSheet
          isOpen={isBottomSheetOpen}
          closeBottomSheet={() => this.setBottomSheet(false)}
          options={[
            {text: 'Delete Post', onPress: () => this.handleDeletePost()},
          ]}
        />
      </View>
    );
  }
}

export default PostViewScreen;
