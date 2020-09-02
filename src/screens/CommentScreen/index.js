import React, {Component} from 'react';
import {
  View,
  FlatList,
  Alert,
  ToastAndroid,
  Dimensions,
  TouchableWithoutFeedback,
} from 'react-native';
import {
  TextInput,
  Button,
  Text,
  Card,
  Divider,
  Headline,
} from 'react-native-paper';
import database from '@react-native-firebase/database';
import {SpeechBubble} from 'react-kawaii/lib/native/';

// importing components
import BottomSheet from '../../components/BottomSheet/index.js';

// importing firebase utils
import {commentOnPost, deleteComment} from '../../utils/firebase.js';

// importing context
import {Context as UserContext} from '../../contexts/UserContext.js';

// importing screen
import styles from './styles.js';
import Styles from '../../Styles.js';

const {width} = Dimensions.get('window');

class CommentScreen extends Component {
  static contextType = UserContext;
  constructor(props) {
    super(props);

    this.state = {
      post: props.route.params.post,
      comment: '',
      commenting: false,
      actionSheetIndex: -1,
      isBottomSheetOpen: false,
    };
  }

  componentDidMount() {
    const {post} = this.state;
    const {state} = this.context;
    database()
      .ref(state.box)
      .child(post.name.split('.')[0])
      .on('value', (snap) => {
        const p = snap.val();
        if (p === null) {
          this.props.navigation.navigate('HomeScreen');
          return Alert.alert(
            'Oops',
            'You were late, post was removed!',
            [{text: 'Ok'}],
            {cancelable: false},
          );
        }
        this.setState({
          post: p,
        });
      });
  }

  setComment(comment) {
    if (comment.length >= 300) {
      return ToastAndroid.showWithGravity(
        'Sorry maximum comment length is 300 characters',
        ToastAndroid.SHORT,
        ToastAndroid.CENTER,
      );
    }
    this.setState({
      comment,
    });
  }

  setBottomSheet = (bool, postIndex) => {
    this.setState({
      isBottomSheetOpen: bool,
      actionSheetIndex: postIndex,
    });
  };

  comment() {
    const {comment, post} = this.state;
    const {state} = this.context;
    if (comment.length === 0) {
      return ToastAndroid.showWithGravity(
        'You forgot to write your comment 🤣',
        ToastAndroid.SHORT,
        ToastAndroid.CENTER,
      );
    }
    this.setState({commenting: true});
    commentOnPost(state.box, post.name, comment)
      .then(() => {
        this.setState({
          comment: '',
          commenting: false,
        });
      })
      .catch((err) => {
        console.log(err.message);
        this.setState({
          commenting: false,
        });
      });
  }

  handleOptions = (postIndex) => {
    this.setBottomSheet(true, postIndex);
  };

  handleCommentDelete = () => {
    const {actionSheetIndex, post} = this.state;
    const {state} = this.context;
    if (post.uid === state.uid) {
      // author can delete all comments
      deleteComment(state.box, post.name, actionSheetIndex).catch((err) =>
        console.log(err.message),
      );
    } else if (post.comment[actionSheetIndex].uid === state.uid) {
      // comment author can delete his/her comment only
      deleteComment(state.box, post.name, actionSheetIndex).catch((err) =>
        console.log(err.message),
      );
    } else {
      ToastAndroid.showWithGravity(
        'Only author of post and comment can delete comments',
        ToastAndroid.SHORT,
        ToastAndroid.CENTER,
      );
    }
    this.setBottomSheet(false, -1);
  };

  renderComments = () => {
    const {post, comment} = this.state;

    if ((post.comment ? post.comment.length : 0) === 0) {
      return (
        <View style={styles.emptyList}>
          <SpeechBubble
            size={width / 2.5}
            mood={comment.length !== 0 ? 'lovestruck' : 'sad'}
            color="#83D1FB"
          />
          <Headline style={[Styles.fontMedium, styles.noPostYetText]}>
            I am Comment and I like discussions. But no one is talking about
            this post. I'll be so happy if someone starts a discussion here.
          </Headline>
        </View>
      );
    }

    return (
      <FlatList
        data={post.comment ? post.comment : []}
        keyExtractor={(_, index) => index}
        renderItem={({item, index}) => {
          return (
            <TouchableWithoutFeedback
              onLongPress={() => this.handleOptions(index)}>
              <Card>
                <Card.Actions>
                  <Text>{item.name}:</Text>
                </Card.Actions>
                <Card.Content>
                  <Text>{item.comment}</Text>
                </Card.Content>
              </Card>
            </TouchableWithoutFeedback>
          );
        }}
        ItemSeparatorComponent={() => <Divider style={styles.Divider} />}
      />
    );
  };

  render() {
    const {commenting, comment, post, isBottomSheetOpen} = this.state;

    return (
      <View style={styles.commentScreen}>
        {this.renderComments()}
        <View style={styles.addComment}>
          <TextInput
            style={[Styles.fontMedium, styles.textInput]}
            mode="outlined"
            placeholder={post.comment ? 'Comment' : 'Start a discussion'}
            maxLength={300}
            value={comment}
            dense={true}
            onChangeText={(c) => this.setComment(c)}
          />
          <Button
            labelStyle={Styles.fontSmall}
            style={styles.commentBtn}
            loading={commenting}
            icon="send"
            onPress={() => this.comment()}>
            Comment
          </Button>
        </View>
        <BottomSheet
          isOpen={isBottomSheetOpen}
          closeBottomSheet={() => this.setBottomSheet(false)}
          options={[
            {text: 'Remove Comment', onPress: this.handleCommentDelete},
          ]}
        />
      </View>
    );
  }
}

export default CommentScreen;
