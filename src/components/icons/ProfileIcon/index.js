import React, {useRef} from 'react';
import {Animated} from 'react-native';
import Svg, {Path} from 'react-native-svg';
import {colors} from '../../../Constants';

const ProfileIcon = (props) => {
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
        stroke={colors.darkTheme.defaultIconColor}
        strokeWidth={2}
        {...props}>
        <Path
          d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2M12 11a4 4 0 100-8 4 4 0 000 8z"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </Svg>
    </Animated.View>
  );
};

export default ProfileIcon;
