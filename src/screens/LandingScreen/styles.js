import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  landingContainer: {
    ...StyleSheet.absoluteFill,
    backgroundColor: 'black',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-start',
    padding: 20,
  },
  googleBtn: {
    position: 'absolute',
    bottom: 20,
    alignSelf: 'center',
  },
});
