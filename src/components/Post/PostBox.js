import React, {useState} from 'react';
import {View, Dimensions, StyleSheet} from 'react-native';
import Svg, {Path} from 'react-native-svg';
import {MultiTap} from 'react-native-tap';

const {width} = Dimensions.get('window');

const PostBox = ({
  children,
  onSingleTap = () => {},
  onDoubleTap = () => {},
}) => {
  const [showHeart, setShowHeart] = useState(false);

  return (
    <MultiTap
      onSingleTap={onSingleTap}
      onDoubleTap={() => {
        setShowHeart(true);
        onDoubleTap();
        setTimeout(() => {
          setShowHeart(false);
        }, 1000);
      }}>
      <View>
        {children}
        <View
          style={[
            styles.Overlay,
            // eslint-disable-next-line react-native/no-inline-styles
            {
              backgroundColor: showHeart ? 'rgba(0, 0, 0, 0.5)' : null,
            },
          ]}>
          <Svg
            width={width / 2}
            height={width / 2}
            viewBox="0 0 24 24"
            fill={showHeart ? 'rgba(255, 255, 255, 0.6)' : 'none'}>
            <Path
              d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.501 5.501 0 10-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78v0z"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </Svg>
        </View>
      </View>
    </MultiTap>
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
