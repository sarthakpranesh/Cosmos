import * as React from 'react';
import Svg, {Path, G} from 'react-native-svg';

function HomeIcon(props) {
  return (
    <Svg
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill={props.isFocused ? '#67B521' : 'none'}
      {...props}>
      <G
        stroke={props.isFocused ? '#67B521' : 'black'}
        fill={props.isFocused ? '#67B521' : 'none'}
        fillRule="evenodd"
        strokeWidth={2}>
        <Path
          d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2M12 11a4 4 0 100-8 4 4 0 000 8z"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </G>
    </Svg>
  );
}

export default HomeIcon;
