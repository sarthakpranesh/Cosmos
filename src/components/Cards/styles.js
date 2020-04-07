import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  card: {
    flex: 0.8,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',

    shadowOffset: {width: 1, height: 1},
    shadowColor: 'black',
    shadowOpacity: 0.8,
    elevation: 8,
  },
  cardImage: {
    width: '80%',
    flex: 1,
    resizeMode: 'contain',
  },
});
