import React, {useState, useEffect} from 'react';
import {
  TouchableWithoutFeedback,
  Animated,
  Vibration,
  StyleSheet,
} from 'react-native';

// importing constants
import {IconSize} from '../../Constants.js';

const ReactionIcon = ({
  style,
  iconName,
  pressAction = () => {},
  longPressAction = () => {},
  hasReacted,
}) => {
  const [fill, setFill] = useState(false);
  const iconAnimation = new Animated.Value(1);
  const iconOpacity = iconAnimation.interpolate({
    inputRange: [0.8, 1],
    outputRange: [0.2, 1],
  });

  const requireIcon = () => {
    let Icon;
    switch (iconName) {
      case 'heart':
        Icon = require('../Svg/HeartIcon/index.js').default;
        return <Icon width={IconSize} height={IconSize} fill={fill} />;
      case 'meh':
        Icon = require('../Svg/MehFaceIcons/index.js').default;
        return <Icon width={IconSize} height={IconSize} fill={fill} />;
      case 'frown':
        Icon = require('../Svg/SadFaceIcon/index.js').default;
        return <Icon width={IconSize} height={IconSize} fill={fill} />;
      case 'comment':
        Icon = require('../Svg/CommentIcon/index.js').default;
        return <Icon width={IconSize} height={IconSize} fill={fill} />;
      default:
        Icon = require('../Svg/CommentIcon/index.js').default;
        return <Icon width={IconSize} height={IconSize} fill={fill} />;
    }
  };

  useEffect(() => {
    setFill(hasReacted);
  }, [hasReacted]);

  return (
    <TouchableWithoutFeedback
      onLongPress={() => {
        Vibration.vibrate(30);
        longPressAction();
      }}
      onPress={() => {
        Vibration.vibrate(15);
        Animated.timing(iconAnimation, {
          toValue: 0.8,
          duration: 200,
          useNativeDriver: true,
        }).start(() => {
          setFill(!hasReacted);
          Animated.timing(iconAnimation, {
            toValue: 1,
            duration: 200,
            useNativeDriver: true,
          }).start(() => pressAction());
        });
      }}>
      <Animated.View
        style={[
          {...style},
          styles.reactIcons,
          {
            opacity: iconOpacity,
            transform: [{scale: iconAnimation}],
          },
        ]}>
        {requireIcon()}
      </Animated.View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  reactIcons: {
    marginHorizontal: IconSize * 0.2,
    marginVertical: IconSize * 0.2,
    marginTop: 0,
  },
});

export default ReactionIcon;
