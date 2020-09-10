import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

const MehFaceIcon = ({fill, width = 24, height = 24}) => {
  return (
    <Svg width={width} height={height} viewBox="0 0 24 24" fill="none">
      <Path
        d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10zM8 15h8M9 9h.01M15 9h.01"
        stroke={fill ? 'green' : 'white'}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
};

export default MehFaceIcon;
