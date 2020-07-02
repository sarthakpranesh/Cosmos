import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  commentScreen: {
    ...StyleSheet.absoluteFill,
    backgroundColor: 'black',
  },
  emptyList: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    padding: 10,
    borderRadius: 0,
  },
  Divider: {
    color: 'white',
    backgroundColor: 'rgba(255, 255, 255, 0.4)',
  },
  addComment: {
    backgroundColor: 'black',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: 10,
    zIndex: 100,
  },
});
