import {StyleSheet, Dimensions} from 'react-native';

const {width, height} = Dimensions.get('window');

export default StyleSheet.create({
  mainAddImageContainer: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadedImageContainer: {
    backgroundColor: 'white',
    width: width,
    height: 2 * (height / 3),
    borderWidth: 2,
    borderColor: 'black',
  },
  loadedImage: {
    width: width - 4,
    height: 2 * (height / 3) - 4,
    resizeMode: 'stretch',
  },
  aboutImageContainer: {
    width: width,
    height: height / 3,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingTop: 10,
    paddingHorizontal: 20,
  },
  aboutImageHeader: {
    width: width - 40,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  textInputCaption: {
    width: width,
    height: '50%',
    borderWidth: 0,
    marginVertical: 10,
  },
});
