import {StyleSheet, Dimensions} from 'react-native';

const {height} = Dimensions.get('window');

export default StyleSheet.create({
  mainContainer: {
    ...StyleSheet.absoluteFill,
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
  },
  listEmptyComponent: {
    marginTop: height / 5,
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
