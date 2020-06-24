import React from 'react';
import Svg, {Path} from 'react-native-svg';

const ProfileIcon = (props) => {
  return (
    <Svg
      width={24}
      height={24}
      viewBox="0 0 24 24"
      stroke="white"
      opacity={props.focused ? 1 : 0.4}
      strokeWidth={props.focused ? 2 : 1}
      {...props}>
      <Path
        d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2M12 11a4 4 0 100-8 4 4 0 000 8z"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
};

export default ProfileIcon;
