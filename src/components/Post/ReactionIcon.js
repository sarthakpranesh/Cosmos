import React from 'react';
import {
  TouchableWithoutFeedback,
  Animated,
  Vibration,
  StyleSheet,
  Dimensions,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

const AnimatedIcon = Animated.createAnimatedComponent(Icon);

const {width} = Dimensions.get('screen');

const ReactionIcon = ({
  style,
  iconName,
  pressAction = () => {},
  reactColor = 'white',
}) => {
  const iconAnimation = new Animated.Value(1);
  const iconOpacity = iconAnimation.interpolate({
    inputRange: [0.8, 1],
    outputRange: [0.2, 1],
  });
  return (
    <TouchableWithoutFeedback
      onPress={() => {
        Vibration.vibrate(15);
        Animated.timing(iconAnimation, {
          toValue: 0.8,
          duration: 200,
          useNativeDriver: true,
        }).start(() => {
          Animated.timing(iconAnimation, {
            toValue: 1,
            duration: 200,
            useNativeDriver: true,
          }).start(() => pressAction());
        });
      }}>
      <AnimatedIcon
        style={[
          {...style},
          styles.reactIcons,
          {
            opacity: iconOpacity,
            transform: [{scale: iconAnimation}],
          },
        ]}
        name={iconName}
        size={width * 0.06}
        color={reactColor}
      />
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  reactIcons: {
    marginHorizontal: width * 0.02,
    marginVertical: width * 0.01,
    marginTop: 0,
  },
});

export default ReactionIcon;
