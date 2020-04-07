import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  headerWrapper: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-end',
    paddingBottom: 2,

    height: 30,
    backgroundColor: 'white',
    shadowColor: 'black',
    shadowOffset: {width: 1, height: 8},
    shadowOpacity: 0.8,
    shadowRadius: 8,
    elevation: 10,
  },
});
