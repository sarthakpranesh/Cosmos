/* eslint-disable react-native/no-inline-styles */
import React, {useContext} from 'react';
import {StyleSheet, Dimensions, TouchableOpacity, Image} from 'react-native';
import {Card, Text} from 'react-native-paper';
import Icon from 'react-native-vector-icons/Feather';

// importing components
import LeftContent from '../LeftContent/index.js';
import ReactionIcon from '../ReactionIcon/ReactionIcon.js';
import PostBox from './PostBox.js';

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
        <PostBox
          onDoubleTap={() => {
            if (hasReacted('love')) {
              return null;
            }
            reactToPost(state.box, item.name, 'love');
          }}>
          <Image style={[styles.postImage]} source={{uri: item.postURL}} />
        </PostBox>
      ) : (
        <PostBox
          onSingleTap={handleOpenPost}
          onDoubleTap={() => {
            if (hasReacted('love')) {
              return null;
            }
            reactToPost(state.box, item.name, 'love');
          }}>
          <Image style={[styles.postImage]} source={{uri: item.postURL}} />
        </PostBox>
      )}
      <Card.Actions style={styles.reactionIconContainer}>
        <ReactionIcon
          iconName="heart"
          pressAction={() => reactToPost(state.box, item.name, 'love')}
          hasReacted={hasReacted('love')}
        />
        <ReactionIcon
          iconName="meh"
          pressAction={() => reactToPost(state.box, item.name, 'meh')}
          hasReacted={hasReacted('meh')}
        />
        <ReactionIcon
          iconName="frown"
          pressAction={() => reactToPost(state.box, item.name, 'sad')}
          hasReacted={hasReacted('sad')}
        />
        <ReactionIcon
          style={{
            alignSelf: 'flex-start',
            position: 'absolute',
            right: 0,
          }}
          iconName="comment"
          pressAction={() => handleOpenComment()}
        />
      </Card.Actions>
      <Card.Actions style={{margin: 0, paddingVertical: 0}}>
        <Text style={Styles.fontSmall}>
          {item.love ? item.love.length : 0} Likes
        </Text>
      </Card.Actions>
      <Card.Content style={{margin: 0, padding: 0}}>
        {handleOpenPost === null ? (
          fullPost ? (
            <Text style={Styles.fontMedium}>{item.postCaption}</Text>
          ) : (
            <Text style={Styles.fontMedium}>
              {item.postCaption.length > 60
                ? `${item.postCaption.slice(0, 60)}... See More`
                : item.postCaption}
            </Text>
          )
        ) : (
          <TouchableOpacity onPress={handleOpenPost}>
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
  reactionIconContainer: {
    marginHorizontal: 0,
    marginTop: 4 * scale,
    marginBottom: 0,
    paddingVertical: 0,
    paddingHorizontal: 0,
  },
});

export default Post;
