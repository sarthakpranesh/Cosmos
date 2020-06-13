import React, {useRef} from 'react';
import {Animated} from 'react-native';
import Svg, {Path} from 'react-native-svg';
import {colors} from '../../../Constants';

const SvgComponent = (props) => {
  const start = useRef(new Animated.Value(0)).current;
  const isSelected = () => {
    Animated.timing(start, {
      toValue: 1,
      duration: 1000,
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
        fill="none"
        stroke={colors.darkTheme.defaultIconColor}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
        {...props}>
        <Path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10zM14.31 8l5.74 9.94M9.69 8h11.48M7.38 12l5.74-9.94M9.69 16L3.95 6.06M14.31 16H2.83M16.62 12l-5.74 9.94" />
      </Svg>
    </Animated.View>
  );
};

export default SvgComponent;
