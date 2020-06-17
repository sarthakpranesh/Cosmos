/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {StyleSheet, Dimensions} from 'react-native';
import {Avatar, Button, Card, Paragraph} from 'react-native-paper';

const {width} = Dimensions.get('screen');

const LeftContent = (props) => {
  if (!props.src) {
    return <Avatar.Icon size={30} icon={props.src ? props.src : 'folder'} />;
  }
  return <Avatar.Image size={30} source={{uri: props.src}} />;
};

const Post = ({item}) => {
  return (
    <Card style={styles.mainPostContainer}>
      <Card.Title
        title={item.createdBy ? item.createdBy : 'Name'}
        left={() => (
          <LeftContent src={item.createdByPhoto ? item.createdByPhoto : null} />
        )}
      />
      <Card.Cover style={styles.postImage} source={{uri: item.postURL}} />
      <Card.Actions>
        <Button>Ok</Button>
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
    backgroundColor: 'rgba(255, 255, 255, 0.4)',
    borderRadius: 0,
  },
  postImage: {
    width: width,
    height: width,
  },
});

export default Post;
