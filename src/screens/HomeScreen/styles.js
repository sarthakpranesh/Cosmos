import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  mainContainer: {
    ...StyleSheet.absoluteFill,
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
  },
  listEmptyComponent: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  noPostYetText: {
    flexWrap: 'wrap',
    textAlign: 'center',
    marginHorizontal: 10,
    opacity: 0.6,
  },
});
