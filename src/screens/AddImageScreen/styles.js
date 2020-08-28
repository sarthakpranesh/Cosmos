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
  btnContainer: {
    justifyContent: 'space-around',
  },
});
