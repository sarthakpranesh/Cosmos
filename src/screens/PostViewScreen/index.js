/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {View, TouchableOpacity, Text, Animated} from 'react-native';
import {ScrollView, TapGestureHandler} from 'react-native-gesture-handler';

// importing components
import Header from '../../components/Header';
import CloseIcon from '../../components/icons/CloseIcon';
import CacheImage from '../../components/CacheImage';

// importing styles
import Styles from '../../Styles';
import styles from './styles';

class PostViewScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOwner: false,
      card: this.props.navigation.getParam('card'),
      isVisible: true,
    };
    this.imageOpacity = new Animated.Value(0);
    this.textOpacity = new Animated.Value(0);

    this.fadeIn = () => {
      Animated.timing(this.textOpacity, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }).start();
    };

    this.fadeOut = () => {
      this.textOpacity.setValue(1);
    };

    this.starting = () => {
      Animated.timing(this.imageOpacity, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }).start(() => {
        this.fadeIn();
      });
    };

    this.scale = this.imageOpacity.interpolate({
      inputRange: [0.5, 1],
      outputRange: [1, 1.02],
    });
  }

  componentDidMount() {
    this.starting();
  }

  render() {
    const {card} = this.state;

    return (
      <>
        <Header />
        <View style={styles.postContainer}>
          <TouchableOpacity
            style={[styles.closeBtn]}
            onPress={() => this.props.navigation.goBack()}>
            <CloseIcon />
          </TouchableOpacity>
          <Animated.View
            style={{
              flex: 1,
              opacity: this.imageOpacity,
              scaleY: this.scale,
              scaleX: this.scale,
            }}>
            <CacheImage uri={card.downloadURL} style={{flex: 1, zIndex: 10}} />
          </Animated.View>
          <TapGestureHandler onHandlerStateChange={this.fadeOut}>
            <Animated.View
              style={[styles.postTextContainer, {opacity: this.textOpacity}]}>
              <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.innerContentContainer}>
                <Text
                  style={[
                    Styles.textLarge,
                    styles.postText,
                    styles.mainHeader,
                  ]}>
                  {card.name}
                </Text>
                <Text style={[Styles.textMedium, styles.postText]}>
                  {card.caption}
                </Text>
              </ScrollView>
            </Animated.View>
          </TapGestureHandler>
        </View>
      </>
    );
  }
}

export default PostViewScreen;
