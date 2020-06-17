/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {StyleSheet, Dimensions} from 'react-native';
import {Avatar, Button, Card, Paragraph, Caption} from 'react-native-paper';
import auth from '@react-native-firebase/auth';
import Icon from 'react-native-vector-icons/Feather';

// importing firebase utils
import {reactToPost} from '../../utils/firebase.js';

const {width, height} = Dimensions.get('screen');

const LeftContent = (props) => {
  if (!props.src) {
    return (
      <Avatar.Icon size={props.size} icon={props.src ? props.src : 'folder'} />
    );
  }
  return <Avatar.Image size={props.size} source={{uri: props.src}} />;
};

const Post = ({item}) => {
  const uid = auth().currentUser.uid;
  const hasReacted = (reactionType) => {
    if (Object.keys(item).includes(reactionType)) {
      return item[reactionType].find((u) => u === uid);
    }
    return false;
  };
  return (
    <Card style={styles.mainPostContainer}>
      <Card.Title
        style={styles.postTitle}
        title={item.createdBy ? item.createdBy : 'Name'}
        left={({size}) => (
          <LeftContent
            size={size}
            src={item.createdByPhoto ? item.createdByPhoto : null}
          />
        )}
      />
      <Card.Cover style={styles.postImage} source={{uri: item.postURL}} />
      <Card.Actions style={{marginVertical: 0, paddingVertical: 0}}>
        <Caption>Love: {item.love ? item.love.length : 0}, </Caption>
        <Caption>Meh: {item.meh ? item.meh.length : 0}, </Caption>
        <Caption>Sad: {item.sad ? item.sad.length : 0}</Caption>
      </Card.Actions>
      <Card.Actions style={{marginVertical: 0, paddingVertical: 0}}>
        <Button onPress={() => reactToPost(item.name, 'love')}>
          <Icon
            name="heart"
            size={24}
            color={hasReacted('love') ? 'red' : 'white'}
          />
        </Button>
        <Button onPress={() => reactToPost(item.name, 'meh')}>
          <Icon
            name="meh"
            size={24}
            color={hasReacted('meh') ? 'green' : 'white'}
          />
        </Button>
        <Button onPress={() => reactToPost(item.name, 'sad')}>
          <Icon
            name="frown"
            size={24}
            color={hasReacted('sad') ? 'yellow' : 'white'}
          />
        </Button>
        <Button
          style={{alignSelf: 'flex-end', position: 'absolute', right: 10}}>
          <Icon name="message-square" size={24} />
        </Button>
      </Card.Actions>
      <Card.Content>
        <Paragraph>{item.postCaption}</Paragraph>
      </Card.Content>
    </Card>
  );
};

const styles = StyleSheet.create({
  mainPostContainer: {
    width: width,
    minHeight: width,
    maxHeight: height,
    borderRadius: 0,
    overflow: 'hidden',
  },
  postTitle: {
    marginVertical: 0,
    paddingVertical: 0,
  },
  postImage: {
    width: width - 0.8,
    height: width - 0.8,
    borderWidth: 0.4,
    borderColor: 'white',
  },
});

export default Post;
