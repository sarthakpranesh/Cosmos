import {StyleSheet, Dimensions} from 'react-native';

export default StyleSheet.create({
  mainContainer: {
    display: 'flex',

    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',

    paddingTop: 60,
  },
  userImage: {
    height: 100,
    width: 100,
    borderRadius: 50,

    shadowOffset: {width: 1, height: 10},
    shadowOpacity: 0.8,
    shadowRadius: 10,
    shadowColor: '#000',

    alignSelf: 'center',
    marginVertical: 20,
  },
  inputWrapper: {
    justifyContent: 'center',
  },
  label: {
    textAlign: 'center',
  },
});
