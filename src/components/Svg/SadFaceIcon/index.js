import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

const SadFaceIcon = ({fill, width = 24, height = 24}) => {
  return (
    <Svg width={width} height={height} viewBox="0 0 24 24" fill="none">
      <Path
        d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"
        stroke={fill ? 'yellow' : 'white'}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M16 16s-1.5-2-4-2-4 2-4 2M9 9h.01M15 9h.01"
        stroke={fill ? 'yellow' : 'white'}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
};

export default SadFaceIcon;
