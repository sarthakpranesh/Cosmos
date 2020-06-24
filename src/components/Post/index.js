/* eslint-disable react-native/no-inline-styles */
import React, {useContext} from 'react';
import {StyleSheet, Dimensions, TouchableOpacity} from 'react-native';
import {Button, Card, Paragraph, Caption} from 'react-native-paper';
import Icon from 'react-native-vector-icons/Feather';

// importing components
import LeftContent from '../LeftContent/index.js';

// importing Context
import {Context as UserContext} from '../../contexts/UserContext.js';

// importing firebase utils
import {reactToPost} from '../../utils/firebase.js';
import {PinchGestureHandler, State} from 'react-native-gesture-handler';
import Animated, {useCode, block, cond, eq, set} from 'react-native-reanimated';
import {
  onGestureEvent,
  vec,
  transformOrigin,
  timing,
  translate,
  pinchBegan,
  pinchActive,
} from 'react-native-redash';

const {width} = Dimensions.get('screen');

const Post = ({
  item,
  uid,
  postOptions,
  handleOpenPost = null,
  fullPost = false,
}) => {
  const state2 = new Animated.Value(State.UNDETERMINED);
  const scale = new Animated.Value(1);
  const origin = vec.createValue(0, 0);
  const focal = vec.createValue(0, 0);
  const pinch = vec.createValue(0, 0);
  const numberOfPointers = new Animated.Value(0);
  const pinchGestureHandler = onGestureEvent({
    numberOfPointers,
    state: state2,
    scale,
    focalX: focal.x,
    focalY: focal.y,
  });
  const adjustFocal = vec.add({x: -width / 2, y: -width / 2}, focal);
  const zIndex = cond(eq(state2, State.ACTIVE), 100, 1);
  useCode(
    () =>
      block([
        cond(pinchBegan(state2), vec.set(origin, adjustFocal)),
        cond(
          pinchActive(state2, numberOfPointers),
          vec.set(pinch, vec.minus(vec.sub(origin, adjustFocal))),
        ),
        cond(eq(state2, State.END), [
          set(pinch.x, timing({from: pinch.x, to: 0})),
          set(pinch.y, timing({from: pinch.y, to: 0})),
          set(scale, timing({from: scale, to: 1})),
        ]),
      ]),
    [adjustFocal, origin, state2, pinch, numberOfPointers, scale],
  );
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
        style={styles.postTitle}
        title={item.createdBy ? item.createdBy : 'Name'}
        left={({size}) => (
          <LeftContent
            size={size}
            src={item.createdByPhoto ? item.createdByPhoto : null}
          />
        )}
        right={({size}) => {
          if (item.uid === uid) {
            return (
              <TouchableOpacity
                style={styles.rightOptions}
                onPress={postOptions}>
                <Icon name="more-vertical" size={size} color="white" />
              </TouchableOpacity>
            );
          }
          return null;
        }}
      />
      <PinchGestureHandler {...pinchGestureHandler}>
        <Animated.View style={[styles.postImage, {zIndex}]}>
          <Animated.Image
            style={[
              styles.postImage,
              {
                transform: [
                  ...translate(pinch),
                  ...transformOrigin(origin, {scale}),
                ],
              },
            ]}
            source={{uri: item.postURL}}
          />
        </Animated.View>
      </PinchGestureHandler>
      <Card.Actions style={{marginVertical: 0, paddingVertical: 0, zIndex: 2}}>
        <Caption>Love:{item.love ? item.love.length : 0} </Caption>
        <Caption>Meh:{item.meh ? item.meh.length : 0} </Caption>
        <Caption>Sad:{item.sad ? item.sad.length : 0}</Caption>
      </Card.Actions>
      <Card.Actions style={{marginVertical: 0, paddingVertical: 0}}>
        <Button onPress={() => reactToPost(state.box, item.name, 'love')}>
          <Icon
            name="heart"
            size={24}
            color={hasReacted('love') ? 'red' : 'white'}
          />
        </Button>
        <Button onPress={() => reactToPost(state.box, item.name, 'meh')}>
          <Icon
            name="meh"
            size={24}
            color={hasReacted('meh') ? 'green' : 'white'}
          />
        </Button>
        <Button onPress={() => reactToPost(state.box, item.name, 'sad')}>
          <Icon
            name="frown"
            size={24}
            color={hasReacted('sad') ? 'yellow' : 'white'}
          />
        </Button>
        {/* <Button
          style={{alignSelf: 'flex-end', position: 'absolute', right: 10}}>
          <Icon name="message-square" size={24} />
        </Button> */}
      </Card.Actions>
      <Card.Content>
        {handleOpenPost === null ? (
          fullPost ? (
            <Paragraph>{item.postCaption}</Paragraph>
          ) : (
            <Paragraph>
              {item.postCaption.length > 60
                ? `${item.postCaption.slice(0, 60)}... See More`
                : item.postCaption}
            </Paragraph>
          )
        ) : (
          <TouchableOpacity onPress={handleOpenPost}>
            {fullPost ? (
              <Paragraph>{item.postCaption}</Paragraph>
            ) : (
              <Paragraph>
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
  postTitle: {
    marginVertical: 0,
    paddingVertical: 0,
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
