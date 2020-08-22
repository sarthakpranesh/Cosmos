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
    textAlign: 'justify',
    marginTop: 40,
    marginHorizontal: 40,
    opacity: 0.6,
  },
});
