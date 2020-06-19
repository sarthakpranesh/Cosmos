import {StyleSheet, Dimensions} from 'react-native';

const {width, height} = Dimensions.get('window');

export default StyleSheet.create({
  addContainer: {
    ...StyleSheet.absoluteFill,
    backgroundColor: 'black',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  optionsContainer: {
    width: width,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  optionContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadedImage: {
    width: width,
    height: width,
    resizeMode: 'cover',
  },
  captionContaier: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  captionHeaderText: {
    alignSelf: 'flex-start',
    marginVertical: 20,
  },
  textInputCaption: {
    width: width - 40,
    marginBottom: 20,
  },
});
