import {StyleSheet, Dimensions} from 'react-native';

// importing theming constants
import {colors} from './Constants';

const {width, height} = Dimensions.get('window');

const Styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'flex-end',
  },
  containerStarting: {
    flex: 1,
    backgroundColor: colors.darkTheme.backgroundColor,

    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 20,
  },
  landingImage: {
    position: 'absolute',
    height: height,
    width: width,
    zIndex: -100,
  },
  buttonLogin: {
    backgroundColor: colors.darkTheme.primaryButton,
    height: 48,
    width: width / 3,
    paddingHorizontal: 20,
    marginVertical: 10,
    marginHorizontal: 20,
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonShadow: {
    shadowOffset: {width: 1, height: 1},
    shadowColor: colors.darkTheme.primaryText,
    shadowOpacity: 0.8,
    elevation: 3,
  },
  btnText: {
    fontSize: 20,
    fontWeight: 'normal',
    color: colors.darkTheme.secondaryText,
  },
  textInput: {
    height: 50,
    borderRadius: 8,
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
  textMedium: {
    fontFamily: '',
    fontSize: 20,
    textAlign: 'center',
    color: colors.darkTheme.primaryText,
    fontWeight: '900',
  },
});

export default Styles;
