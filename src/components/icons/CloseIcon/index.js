import React, {useRef} from 'react';
import {Animated} from 'react-native';
import Svg, {Path} from 'react-native-svg';

const SvgComponent = (props) => {
  const rotate = useRef(new Animated.Value(0)).current;

  const rotateData = rotate.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '90deg'],
  });

  const isSelected = () => {
    Animated.timing(rotate, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  };

  isSelected();

  return (
    <Animated.View
      style={{
        transform: [
          {
            rotate: rotateData,
          },
        ],
      }}>
      <Svg width={24} height={24} viewBox="0 0 24 24" fill="none" {...props}>
        <Path
          d="M18 6L6 18M6 6l12 12"
          stroke="white"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </Svg>
    </Animated.View>
  );
};

export default SvgComponent;
