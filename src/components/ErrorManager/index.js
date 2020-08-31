import React from 'react';
import {Text, Dimensions, StyleSheet} from 'react-native';
import {Button} from 'react-native-paper';
import {Cat} from 'react-kawaii/lib/native';

// importing components
import Overlay from '../Overlay/index.js';

// importing styles
import Styles from '../../Styles.js';

const {width} = Dimensions.get('window');

const ErrorManager = ({isVisible, hideModal, message, mood = 'ko'}) => {
  return (
    <Overlay
      style={styles.OverlayStyle}
      isVisible={isVisible}
      hideModal={hideModal}>
      <Cat size={width / 2} mood={mood} color="#596881" />
      <Text style={[Styles.fontMedium, styles.ErrorText]}>{message}</Text>
      <Button
        mode="contained"
        labelStyle={Styles.fontSmall}
        style={styles.CloseButton}
        onPress={hideModal}>
        {'Close'}
      </Button>
    </Overlay>
  );
};

const styles = StyleSheet.create({
  OverlayStyle: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  ErrorText: {
    color: 'white',
    fontFamily: '',
    textAlign: 'justify',
    marginTop: 20,
  },
  CloseButton: {
    position: 'absolute',
    bottom: 20,
    alignSelf: 'center',
  },
});

export default ErrorManager;
