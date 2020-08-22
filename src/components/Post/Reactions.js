import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Modal from 'react-native-modal';

// import components
import HeartIcon from '../Svg/HeartIcon/index.js';
import MehFaceIcon from '../Svg/MehFaceIcons/index.js';
import SadFaceIcon from '../Svg/SadFaceIcon/index.js';

// importing styles
import Styles from '../../Styles.js';

const Reactions = ({data, isVisible, hideModal}) => {
  return (
    <Modal
      backdropTransitionOutTiming={1000}
      isVisible={isVisible}
      backdropOpacity={0.86}
      useNativeDriver={true}
      onBackButtonPress={hideModal}
      onBackdropPress={hideModal}>
      <View style={{flex: 1}}>
        <View style={styles.HeaderConatienr}>
          <Text style={styles.HeaderText}>Reactions</Text>
        </View>
        <View style={styles.Divider} />
        <View style={styles.ReactionCard}>
          <HeartIcon fill={true} />
          <Text
            style={
              styles.ReactionCardText
            }>{`${data[0]} Liked this post`}</Text>
        </View>
        <View style={styles.ReactionCard}>
          <MehFaceIcon fill={true} />
          <Text
            style={
              styles.ReactionCardText
            }>{`${data[1]} Showed meh face`}</Text>
        </View>
        <View style={styles.ReactionCard}>
          <SadFaceIcon fill={true} />
          <Text
            style={
              styles.ReactionCardText
            }>{`${data[2]} Saddened to see`}</Text>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  ReactionOverlay: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  HeaderConatienr: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  HeaderText: {
    fontWeight: '100',
    ...Styles.fontLarge,
    color: 'rgba(255, 255, 255, 0.8)',
  },
  Divider: {
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    height: 1,
  },
  ReactionCard: {
    marginTop: 20,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  ReactionCardText: {
    fontWeight: '100',
    ...Styles.fontMedium,
    color: 'rgba(255, 255, 255, 1)',
    marginLeft: 10,
  },
});

export default Reactions;
