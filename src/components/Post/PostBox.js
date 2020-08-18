import React, {useState, useRef} from 'react';
import {View, Dimensions, StyleSheet} from 'react-native';
import Svg, {Path} from 'react-native-svg';
import {TapGestureHandler, State} from 'react-native-gesture-handler';

const {width} = Dimensions.get('window');

const PostBox = ({
  children,
  onSingleTap = () => {},
  onDoubleTap = () => {},
}) => {
  let doubleTapRef = useRef();
  const [showHeart, setShowHeart] = useState(false);

  const _onSingleTap = (event) => {
    if (event.nativeEvent.state === State.ACTIVE) {
      onSingleTap();
    }
  };

  const _onDoubleTap = (event) => {
    if (event.nativeEvent.state === State.ACTIVE) {
      setShowHeart(true);
      setTimeout(() => {
        setShowHeart(false);
        onDoubleTap();
      }, 1000);
    }
  };

  return (
    <TapGestureHandler
      onHandlerStateChange={_onSingleTap}
      waitFor={doubleTapRef}>
      <TapGestureHandler
        ref={doubleTapRef}
        onHandlerStateChange={_onDoubleTap}
        numberOfTaps={2}>
        <View>
          {children}
          <View style={[styles.Overlay]}>
            <Svg
              width={width / 2}
              height={width / 2}
              viewBox="0 0 24 24"
              fill={showHeart ? 'rgba(255, 255, 255, 0.6)' : 'none'}>
              <Path
                d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.501 5.501 0 10-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78v0z"
                // stroke="white"
                // strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </Svg>
          </View>
        </View>
      </TapGestureHandler>
    </TapGestureHandler>
  );
};

const styles = StyleSheet.create({
  Overlay: {
    ...StyleSheet.absoluteFill,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default PostBox;
