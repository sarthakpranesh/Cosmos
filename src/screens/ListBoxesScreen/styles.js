import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  listCircleContainer: {
    ...StyleSheet.absoluteFill,
    backgroundColor: 'black',
  },
  helpText: {
    margin: 10,
    textAlign: 'justify',
  },
  addPartConatiner: {
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  textInput: {
    marginBottom: 10,
  },
  card: {
    borderRadius: 0,
    shadowOpacity: 0,
    padding: 8,
    paddingLeft: 16,
  },
  Divider: {
    height: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.4)',
  },
  emptyComponentContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  noBoxesYet: {
    flexWrap: 'wrap',
    textAlign: 'center',
    marginHorizontal: 10,
    opacity: 0.6,
  },
});
