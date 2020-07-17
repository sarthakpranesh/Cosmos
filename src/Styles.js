import {StyleSheet, Dimensions} from 'react-native';

const {width} = Dimensions.get('window');

export default StyleSheet.create({
  fontSmall: {
    fontSize: width * 0.03,
  },
  fontMedium: {
    fontSize: width * 0.04,
  },
  fontLarge: {
    fontSize: width * 0.06,
  },
  fontExtraLarge: {
    fontSize: width * 0.08,
  },
});
