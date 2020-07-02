import React, {Component} from 'react';
import {View, FlatList, Alert} from 'react-native';
import {TextInput, Button, Card, Divider, Title} from 'react-native-paper';
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
    this.setState({
      comment,
    });
  }

  comment() {
    const {comment, post} = this.state;
    const {state} = this.context;
    try {
      commentOnPost(state.box, post.name, comment);
      this.setComment('');
    } catch (err) {
      console.log(err.message);
    }
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
    const {commenting, post} = this.state;
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
                <Title>{`${item.name}: ${item.comment}`}</Title>
              </Card>
            );
          }}
          ListEmptyComponent={() => (
            <View style={styles.emptyList}>
              <Title>No Comments Yet</Title>
            </View>
          )}
          ItemSeparatorComponent={() => <Divider style={styles.Divider} />}
        />
        <View style={styles.addComment}>
          <TextInput
            style={styles.textInput}
            mode="outlined"
            placeholder="Comment"
            value={this.state.email}
            dense={true}
            onChangeText={(comment) => this.setComment(comment)}
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
