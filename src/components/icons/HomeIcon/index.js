import React, {useRef} from 'react';
import {Animated} from 'react-native';
import Svg, {Path} from 'react-native-svg';

const HomeIcon = (props) => {
  const start = useRef(new Animated.Value(0)).current;
  const isSelected = () => {
    Animated.timing(start, {
      toValue: 1,
      dureation: 500,
      useNativeDriver: true,
    }).start();
  };

  const opacity = start.interpolate({
    inputRange: [0, 1],
    outputRange: [0.2, 1],
  });

  if (props.focused) {
    start.setValue(0);
    isSelected();
  } else {
    start.setValue(0);
  }

  return (
    <Animated.View style={{opacity}}>
      <Svg
        width={24}
        height={24}
        viewBox="0 0 24 24"
        stroke="white"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
        {...props}>
        <Path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
      </Svg>
    </Animated.View>
  );
};

export default HomeIcon;
