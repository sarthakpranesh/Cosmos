/* eslint-disable react-native/no-inline-styles */
import React, {useContext} from 'react';
import {
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Image,
  Vibration,
} from 'react-native';
import {Button, Card, Paragraph, Caption} from 'react-native-paper';
import Icon from 'react-native-vector-icons/Feather';

// importing components
import LeftContent from '../LeftContent/index.js';

// importing Context
import {Context as UserContext} from '../../contexts/UserContext.js';

// importing firebase utils
import {reactToPost} from '../../utils/firebase.js';

// importing styles
import Styles from '../../Styles.js';

const {width} = Dimensions.get('screen');

const Post = ({
  item,
  uid,
  postOptions,
  handleOpenPost = null,
  handleOpenAccount = null,
  handleOpenComment = () => {},
  fullPost = false,
}) => {
  const {state} = useContext(UserContext);
  const hasReacted = (reactionType) => {
    if (Object.keys(item).includes(reactionType)) {
      return item[reactionType].find((u) => u === uid);
    }
    return false;
  };
  return (
    <Card style={styles.mainPostContainer}>
      <Card.Title
        style={styles.postTitleContainer}
        titleStyle={Styles.fontMedium}
        title={item.createdBy ? item.createdBy : 'Name'}
        left={() => {
          if (handleOpenAccount === null) {
            return (
              <LeftContent
                size={width * 0.1}
                src={item.createdByPhoto ? item.createdByPhoto : null}
              />
            );
          }
          return (
            <TouchableOpacity onPress={handleOpenAccount}>
              <LeftContent
                size={width * 0.1}
                src={item.createdByPhoto ? item.createdByPhoto : null}
              />
            </TouchableOpacity>
          );
        }}
        right={() => {
          if (item.uid === uid) {
            return (
              <TouchableOpacity
                style={styles.rightOptions}
                onPress={postOptions}>
                <Icon name="more-vertical" size={width * 0.06} color="white" />
              </TouchableOpacity>
            );
          }
          return null;
        }}
      />
      {fullPost ? (
        <Image style={[styles.postImage]} source={{uri: item.postURL}} />
      ) : (
        <TouchableOpacity onPress={handleOpenPost}>
          <Image style={[styles.postImage]} source={{uri: item.postURL}} />
        </TouchableOpacity>
      )}
      <Card.Actions style={{marginVertical: 0, paddingVertical: 0, zIndex: 2}}>
        <Caption style={Styles.fontSmall}>
          Love:{item.love ? item.love.length : 0}{' '}
        </Caption>
        <Caption style={Styles.fontSmall}>
          Meh:{item.meh ? item.meh.length : 0}{' '}
        </Caption>
        <Caption style={Styles.fontSmall}>
          Sad:{item.sad ? item.sad.length : 0}
        </Caption>
      </Card.Actions>
      <Card.Actions style={{marginVertical: 0, paddingVertical: 0}}>
        <Button
          onPress={() => {
            Vibration.vibrate(50);
            reactToPost(state.box, item.name, 'love');
          }}>
          <Icon
            name="heart"
            size={width * 0.06}
            color={hasReacted('love') ? 'red' : 'white'}
          />
        </Button>
        <Button
          onPress={() => {
            Vibration.vibrate(50);
            reactToPost(state.box, item.name, 'meh');
          }}>
          <Icon
            name="meh"
            size={width * 0.06}
            color={hasReacted('meh') ? 'green' : 'white'}
          />
        </Button>
        <Button
          onPress={() => {
            Vibration.vibrate(50);
            reactToPost(state.box, item.name, 'sad');
          }}>
          <Icon
            name="frown"
            size={width * 0.06}
            color={hasReacted('sad') ? 'yellow' : 'white'}
          />
        </Button>
        <Button
          onPress={handleOpenComment}
          style={{alignSelf: 'flex-end', position: 'absolute', right: 10}}>
          <Icon name="message-square" size={width * 0.06} />
        </Button>
      </Card.Actions>
      <Card.Content>
        {handleOpenPost === null ? (
          fullPost ? (
            <Paragraph style={Styles.fontMedium}>{item.postCaption}</Paragraph>
          ) : (
            <Paragraph style={Styles.fontMedium}>
              {item.postCaption.length > 60
                ? `${item.postCaption.slice(0, 60)}... See More`
                : item.postCaption}
            </Paragraph>
          )
        ) : (
          <TouchableOpacity onPress={handleOpenPost}>
            {fullPost ? (
              <Paragraph style={Styles.fontMedium}>
                {item.postCaption}
              </Paragraph>
            ) : (
              <Paragraph style={Styles.fontMedium}>
                {item.postCaption.length > 60
                  ? `${item.postCaption.slice(0, 60)}... See More`
                  : item.postCaption}
              </Paragraph>
            )}
          </TouchableOpacity>
        )}
      </Card.Content>
    </Card>
  );
};

const styles = StyleSheet.create({
  mainPostContainer: {
    width: width,
    minHeight: width,
    borderRadius: 0,
    overflow: 'hidden',
  },
  postTitleContainer: {
    marginVertical: 0,
    paddingVertical: 0,
    minHeight: width * 0.16,
  },
  rightOptions: {
    right: 10,
  },
  postImage: {
    width: width,
    height: width,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    resizeMode: 'cover',
  },
});

export default Post;
