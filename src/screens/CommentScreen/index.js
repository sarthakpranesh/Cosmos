import React, {Component} from 'react';
import {View, FlatList, Alert, ToastAndroid} from 'react-native';
import {TextInput, Button, Card, Divider, Text} from 'react-native-paper';
import database from '@react-native-firebase/database';
import ActionSheet from 'react-native-actionsheet';

// importing components
import NoComment from '../../components/icons/NoComment';

// importing firebase utils
import {commentOnPost, deleteComment} from '../../utils/firebase.js';

// importing context
import {Context as UserContext} from '../../contexts/UserContext.js';

// importing screen
import styles from './styles.js';
import Styles from '../../Styles.js';

class CommentScreen extends Component {
  static contextType = UserContext;
  constructor(props) {
    super(props);

    this.state = {
      post: props.route.params.post,
      comment: '',
      commenting: false,
      actionSheetIndex: -1,
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

  handleCommentClick = (commentIndex) => {
    this.setState({
      actionSheetIndex: commentIndex,
    });
    this.ActionSheet.show();
  };

  handleActionPress = async (index) => {
    const {actionSheetIndex, post} = this.state;
    const {state} = this.context;
    // if index is 0 - handle remove comment from box
    if (index === 0) {
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

  renderComments = () => {
    const {post} = this.state;

    if ((post.comment ? post.comment.length : 0) === 0) {
      return (
        <View style={styles.emptyList}>
          <NoComment />
        </View>
      );
    }

    return (
      <FlatList
        data={post.comment ? post.comment : []}
        keyExtractor={(_, index) => index}
        renderItem={({item, index}) => {
          return (
            <Card
              style={styles.card}
              onPress={() => this.handleCommentClick(index)}>
              <Text
                style={
                  Styles.fontMedium
                }>{`${item.name}: ${item.comment}`}</Text>
            </Card>
          );
        }}
        ItemSeparatorComponent={() => <Divider style={styles.Divider} />}
      />
    );
  };

  render() {
    const {commenting, comment, post} = this.state;

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
        <ActionSheet
          ref={(o) => (this.ActionSheet = o)}
          title={'What do you wanna do?'}
          options={['Remove Comment', 'Cancel']}
          cancelButtonIndex={1}
          destructiveButtonIndex={1}
          onPress={(index) => this.handleActionPress(index)}
        />
      </View>
    );
  }
}

export default CommentScreen;
