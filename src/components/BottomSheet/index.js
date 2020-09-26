import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Button, DarkTheme} from 'react-native-paper';
import Modal from 'react-native-modal';

// importing Styles
import Styles from '../../Styles.js';

const BottomSheet = ({isOpen, closeBottomSheet, options}) => {
  return (
    <Modal
      testID={'modal'}
      isVisible={isOpen}
      onSwipeComplete={closeBottomSheet}
      onBackButtonPress={closeBottomSheet}
      onBackdropPress={closeBottomSheet}
      swipeDirection={['down']}
      style={styles.view}>
      <View style={styles.content}>
        <Text style={styles.contentTitle}>What do you wanna do?</Text>
        {options.map((item) => {
          const {text, onPress} = item;
          return (
            <Button
              key={text}
              mode="text"
              labelStyle={styles.contentOptions}
              onPress={onPress}>
              {text}
            </Button>
          );
        })}
        <Button
          key="cancel"
          mode="text"
          color={DarkTheme.colors.error}
          labelStyle={styles.contentOptions}
          onPress={closeBottomSheet}>
          Cancel
        </Button>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  view: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  content: {
    backgroundColor: DarkTheme.colors.background,
    padding: 22,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    borderColor: 'rgba(0, 0, 0, 0.1)',
  },
  contentTitle: {
    ...Styles.fontLarge,
    marginBottom: 12,
    color: 'white',
  },
  contentOptions: {
    ...Styles.fontMedium,
    marginVertical: 8,
  },
});

export default BottomSheet;
