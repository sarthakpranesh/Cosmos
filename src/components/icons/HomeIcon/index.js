import React from 'react';
import Svg, {Path} from 'react-native-svg';

const HomeIcon = (props) => {
  return (
    <Svg
      width={24}
      height={24}
      viewBox="0 0 24 24"
      stroke="white"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      opacity={props.focused ? 1 : 0.4}
      fill={props.focused ? 'white' : null}
      {...props}>
      <Path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
    </Svg>
  );
};

export default HomeIcon;
