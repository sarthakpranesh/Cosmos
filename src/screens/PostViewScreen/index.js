import React, {Component} from 'react';
import {View} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';

// importing components
import Post from '../../components/Post/index.js';
import PostOptions from '../../components/Post/PostOptions';
import ErrorManager from '../../components/ErrorManager/index.js';

// importing Context
import {Context as UserContext} from '../../contexts/UserContext.js';

// importing utils
import {getUserDetails} from '../../utils/firebase.js';

// importing styles
import styles from './styles';

class PostViewScreen extends Component {
  static contextType = UserContext;
  constructor(props) {
    super(props);

    this.state = {
      user: auth().currentUser,
      isErrorManagerVisible: false,
      errorMessage: '',
      isBottomSheetOpen: false,
    };
    const params = props.route.params;
    if (params.id) {
      this.state = {
        ...this.state,
        name: params.id.split('@@@')[1],
        box: params.id.split('@@@')[0],
        dp: true,
      };
    } else {
      this.state = {
        ...this.state,
        post: props.route.params.post,
        dp: false,
      };
    }
  }

  componentDidMount() {
    const {box, dp, user} = this.state;
    const {currentBox} = this.context;

    if (dp) {
      getUserDetails(user.uid)
        .then((u) => {
          if (!u.enrolledBoxes.includes(box)) {
            this.setErrorManager(
              true,
              "Unfortunately you are not a member of this box hence we can't display the post. All Boxes are private by nature. This helps us make sure only box members can see their box posts.",
            );
          } else {
            currentBox(box);
            this.setPostListener();
          }
        })
        .catch((err) => {
          console.log(err);
          this.setErrorManager(
            true,
            'OOPs... Looks like some internal error occurred!',
          );
        });
    } else {
      this.setPostListener();
    }
  }

  setPostListener = () => {
    const {post, name, box, dp} = this.state;
    const {state} = this.context;
    database()
      .ref(dp ? box : state.box)
      .child(dp ? name : post.name.split('.')[0])
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
  };

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

  handleOpenComment = () => {
    const {post} = this.state;
    return this.props.navigation.navigate('CommentScreen', {
      post: post,
    });
  };

  render() {
    const {
      dp,
      box,
      user,
      post,
      isErrorManagerVisible,
      errorMessage,
      isBottomSheetOpen,
    } = this.state;
    const {state} = this.context;

    return (
      <View style={styles.postContainer}>
        <ScrollView>
          {post ? (
            <Post
              item={post}
              uid={user.uid}
              postOptions={this.handlePostOptions}
              handleOpenComment={this.handleOpenComment}
              fullPost={true}
            />
          ) : null}
        </ScrollView>
        <ErrorManager
          hideModal={() => {
            this.setErrorManager(false, '');
            this.props.navigation.goBack();
          }}
          isVisible={isErrorManagerVisible}
          message={errorMessage}
        />
        <PostOptions
          isOpen={isBottomSheetOpen}
          closeSheet={() => this.setBottomSheet(false)}
          goBack={() => this.props.navigation.goBack()}
          box={dp ? box : state.box}
          postName={post?.name}
        />
      </View>
    );
  }
}

export default PostViewScreen;
