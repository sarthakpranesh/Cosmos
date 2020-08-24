import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  commentScreen: {
    ...StyleSheet.absoluteFill,
    backgroundColor: 'black',
  },
  emptyList: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    paddingVertical: -10,
    flexWrap: 'wrap',
    borderRadius: 0,
  },
  Divider: {
    color: 'white',
    backgroundColor: 'rgba(255, 255, 255, 0.4)',
  },
  addComment: {
    backgroundColor: 'black',
    // position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: 10,
    zIndex: 100,
  },
  commentBtn: {
    marginVertical: 6,
  },
  noPostYetText: {
    flexWrap: 'wrap',
    textAlign: 'justify',
    marginTop: 40,
    marginHorizontal: 40,
    opacity: 0.6,
  },
});
