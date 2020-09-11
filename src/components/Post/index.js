/* eslint-disable react-native/no-inline-styles */
import React, {useContext, useState} from 'react';
import {StyleSheet, Dimensions, TouchableOpacity} from 'react-native';
import {Card, Text} from 'react-native-paper';
import Icon from 'react-native-vector-icons/Feather';

// importing components
import LeftContent from '../LeftContent/index.js';
import ReactionIcon from '../ReactionIcon/ReactionIcon.js';
import PostBox from './PostBox.js';
import Reactions from './Reactions.js';
import ActiveImage from '../ActiveImage/index.js';

// importing Context
import {Context as UserContext} from '../../contexts/UserContext.js';

// importing firebase utils
import {reactToPost} from '../../utils/firebase.js';

// importing styles
import Styles from '../../Styles.js';

const {width, scale} = Dimensions.get('screen');

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
  const [reactionsVisible, setReactionVisibility] = useState(false);
  const hasReacted = (reactionType) => {
    if (Object.keys(item).includes(reactionType)) {
      return !!item[reactionType].find((u) => u === uid);
    }
    return false;
  };
  return (
    <Card style={styles.mainPostContainer}>
      <Card.Title
        style={styles.postTitleContainer}
        titleStyle={[styles.textHeaderContainer]}
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
      <PostBox
        onSingleTap={() => {
          if (fullPost) {
            return;
          }
          handleOpenPost();
        }}
        onDoubleTap={() => {
          if (hasReacted('love')) {
            return null;
          }
          reactToPost(state.box, item.name, 'love');
        }}>
        <ActiveImage size={width} uri={item.postURL} />
      </PostBox>
      <Card.Actions style={styles.reactionIconContainer}>
        <ReactionIcon
          iconName="heart"
          pressAction={() => reactToPost(state.box, item.name, 'love')}
          longPressAction={() => setReactionVisibility(!reactionsVisible)}
          hasReacted={hasReacted('love')}
        />
        <ReactionIcon
          iconName="meh"
          pressAction={() => reactToPost(state.box, item.name, 'meh')}
          longPressAction={() => setReactionVisibility(!reactionsVisible)}
          hasReacted={hasReacted('meh')}
        />
        <ReactionIcon
          iconName="frown"
          pressAction={() => reactToPost(state.box, item.name, 'sad')}
          longPressAction={() => setReactionVisibility(!reactionsVisible)}
          hasReacted={hasReacted('sad')}
        />
        <ReactionIcon
          style={{
            alignSelf: 'flex-start',
            position: 'absolute',
            right: 6,
          }}
          iconName="comment"
          pressAction={() => handleOpenComment()}
        />
      </Card.Actions>
      <Card.Content style={styles.cardComponent}>
        <Text style={Styles.fontSmall}>
          {item.love ? item.love.length : 0} Likes
        </Text>
        <TouchableOpacity
          onPress={() => {
            if (handleOpenPost === null) {
              return;
            }
            handleOpenPost();
          }}>
          {fullPost ? (
            <Text style={Styles.fontMedium}>{item.postCaption}</Text>
          ) : (
            <Text style={Styles.fontMedium}>
              {item.postCaption.length > 60
                ? `${item.postCaption.slice(0, 60)}... See More`
                : item.postCaption}
            </Text>
          )}
        </TouchableOpacity>
      </Card.Content>
      <Reactions
        isVisible={reactionsVisible}
        hideModal={() => setReactionVisibility(false)}
        data={[
          item.love ? item.love.length : 0,
          item.meh ? item.meh.length : 0,
          item.sad ? item.sad.length : 0,
        ]}
      />
    </Card>
  );
};

const styles = StyleSheet.create({
  mainPostContainer: {
    width: width,
    minHeight: width,
    borderRadius: 0,
    overflow: 'hidden',
    paddingBottom: 10,
    backgroundColor: 'black',
  },
  postTitleContainer: {
    marginVertical: 0,
    paddingVertical: 0,
    minHeight: width * 0.16,
  },
  textHeaderContainer: {
    marginLeft: -14,
  },
  rightOptions: {
    right: 10,
  },
  reactionIconContainer: {
    marginHorizontal: 0,
    marginTop: 4 * scale,
    marginBottom: 0,
    paddingVertical: 0,
    paddingHorizontal: 6,
  },
});

export default Post;
