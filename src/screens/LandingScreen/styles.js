import {StyleSheet, Dimensions} from 'react-native';

const {width, height} = Dimensions.get('screen');

export default StyleSheet.create({
  landingContainer: {
    ...StyleSheet.absoluteFill,
  },
  dotContainer: {
    position: 'absolute',
    zIndex: 10,
    alignSelf: 'center',
    top: 20,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  innerView: {
    backgroundColor: 'black',
    width,
    padding: 20,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  illustration: {
    height: height / 3,
    resizeMode: 'center',
    marginVertical: 20,
  },
  googleBtn: {
    position: 'absolute',
    bottom: 20,
    alignSelf: 'center',
  },
});
