import React from 'react';
import {View} from 'react-native';
import Modal from 'react-native-modal';

const Overlay = ({isVisible, hideModal, children, style}) => {
  return (
    <Modal
      backdropTransitionOutTiming={1000}
      isVisible={isVisible}
      backdropOpacity={0.9}
      useNativeDriver={true}
      onBackButtonPress={hideModal}
      onBackdropPress={hideModal}>
      <View style={[{flex: 1}, style]}>{children}</View>
    </Modal>
  );
};

export default Overlay;
