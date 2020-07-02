import React, {Component} from 'react';
import {View, FlatList, Alert, ToastAndroid} from 'react-native';
import {TextInput, Button, Card, Divider, Text} from 'react-native-paper';
import database from '@react-native-firebase/database';
import ActionSheet from 'react-native-actionsheet';

// importing firebase utils
import {commentOnPost, deleteComment} from '../../utils/firebase.js';

// importing context
import {Context as UserContext} from '../../contexts/UserContext.js';

// importing screen
import styles from './styles.js';

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
          Alert.alert(
            'Error',
            'Their is a problem with that Post! We have taken a note and will be fixing it soon.',
            [{text: 'Ok'}],
            {cancelable: false},
          );
          this.props.navigation.goBack();
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

  render() {
    const {commenting, post, comment} = this.state;
    return (
      <View style={styles.commentScreen}>
        <FlatList
          data={post.comment ? post.comment : []}
          keyExtractor={(_, index) => index}
          renderItem={({item, index}) => {
            return (
              <Card
                style={styles.card}
                onPress={() => this.handleCommentClick(index)}>
                <Text>{`${item.name}: ${item.comment}`}</Text>
              </Card>
            );
          }}
          ListEmptyComponent={() => (
            <View style={styles.emptyList}>
              <Text>No Comments Yet</Text>
            </View>
          )}
          ItemSeparatorComponent={() => <Divider style={styles.Divider} />}
        />
        <View style={styles.addComment}>
          <TextInput
            style={styles.textInput}
            mode="outlined"
            placeholder="Comment"
            value={comment}
            dense={true}
            onChangeText={(c) => this.setComment(c)}
          />
          <Button
            loading={commenting}
            icon="send"
            onPress={() => this.comment()}>
            Comment
          </Button>
        </View>
        <ActionSheet
          ref={(o) => (this.ActionSheet = o)}
          title={'What do you wanna do?'}
          options={['Remove User', 'Cancel']}
          cancelButtonIndex={1}
          destructiveButtonIndex={1}
          onPress={(index) => this.handleActionPress(index)}
        />
      </View>
    );
  }
}

export default CommentScreen;
