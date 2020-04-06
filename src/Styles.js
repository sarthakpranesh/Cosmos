import {StyleSheet, Dimensions} from 'react-native';

const {width, height} = Dimensions.get('window');

const Styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'flex-end',
  },
  landingImage: {
    position: 'absolute',
    height: height,
    width: width,
    zIndex: -100,
  },
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
  btnText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  textInput: {
    height: 50,
    borderRadius: 25,
    borderWidth: 0.5,
    marginHorizontal: 20,
    paddingHorizontal: 20,
    marginVertical: 5,
    borderColor: 'rgba(0,0,0,0.2)',
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
