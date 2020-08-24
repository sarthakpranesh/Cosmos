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
    paddingVertical: 0,
  },
  cardContent: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
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
    textAlign: 'justify',
    marginTop: 10,
    marginHorizontal: 40,
    opacity: 0.6,
  },
});
