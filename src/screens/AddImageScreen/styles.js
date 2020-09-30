import {StyleSheet, Dimensions} from 'react-native';

const {width} = Dimensions.get('window');

export default StyleSheet.create({
  addContainer: {
    ...StyleSheet.absoluteFill,
    backgroundColor: 'black',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  imgText: {
    flexWrap: 'wrap',
    textAlign: 'justify',
    marginTop: 40,
    marginHorizontal: 40,
    opacity: 0.6,
  },
  optionsContainer: {
    width: width,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
    marginTop: 20,
  },
  optionContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 20,
  },
  loadedImage: {
    width: width,
    height: width,
    resizeMode: 'cover',
  },
  captionContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textInputCaption: {
    width: width,
  },
});
