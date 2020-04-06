import {StyleSheet} from 'react-native';

const Styles = StyleSheet.create({
  buttonLogin: {
    backgroundColor: 'white',
    height: 70,
    marginHorizontal: 20,
    marginVertical: 5,
    borderRadius: 35,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonShadow: {
    shadowOffset: {width: 10, height: 10},
    shadowColor: 'black',
    shadowOpacity: 1,
    elevation: 3,
  },
  textSmall: {
    fontFamily: '',
    fontSize: 16,
    textAlign: 'center',
    color: 'black',
    fontWeight: 'normal',
  },
  textSmallBold: {
    fontFamily: '',
    fontSize: 16,
    textAlign: 'center',
    color: 'black',
    fontWeight: 'bold',
  },
});

export default Styles;
