import * as React from 'react';
import Svg, {Path, G} from 'react-native-svg';

function ProfileIcon(props) {
  console.log(props.isFocused);
  return (
    <Svg width={24} height={24} viewBox="0 0 24 24" {...props}>
      <G
        stroke={props.isFocused ? '#67B521' : 'black'}
        fill={props.isFocused ? '#67B521' : 'none'}
        fillRule="evenodd"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round">
        <Path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
      </G>
    </Svg>
  );
}

export default ProfileIcon;
