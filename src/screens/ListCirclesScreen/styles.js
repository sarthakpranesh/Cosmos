import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  listCircleContainer: {
    ...StyleSheet.absoluteFill,
    backgroundColor: 'black',
  },
  helpText: {
    margin: 10,
    textAlign: 'justify',
  },
  searchBar: {
    margin: 10,
  },
  CardList: {
    marginTop: 10,
  },
  card: {
    borderRadius: 0,
    shadowOpacity: 0,
    padding: 16,
  },
});
