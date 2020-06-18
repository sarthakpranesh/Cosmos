/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {View, TouchableOpacity, Animated} from 'react-native';
import {Headline, Subheading, Title} from 'react-native-paper';
import Icon from 'react-native-vector-icons/Feather';
import {ScrollView, TapGestureHandler} from 'react-native-gesture-handler';

// importing components
import CacheImage from '../../components/CacheImage';

// importing styles
import Styles from '../../Styles';
import styles from './styles';

class PostViewScreen extends Component {
  constructor(props) {
    super(props);

    this.post = props.route.params.post;

    this.imageOpacity = new Animated.Value(0);
    this.textOpacity = new Animated.Value(0);

    this.fadeIn = () => {
      Animated.timing(this.textOpacity, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }).start();
    };

    this.scale = this.imageOpacity.interpolate({
      inputRange: [0.5, 1],
      outputRange: [1, 1.02],
      extrapolate: 'clamp',
    });
  }

  componentDidMount() {
    Animated.timing(this.imageOpacity, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start(() => {
      this.fadeIn();
    });
  }

  render() {
    return (
      <View style={styles.postContainer}>
        <TouchableOpacity
          style={[styles.closeBtn]}
          onPress={() => this.props.navigation.goBack()}>
          <Icon name="x" color="white" size={24} />
        </TouchableOpacity>
        <Animated.View
          style={{
            flex: 1,
            opacity: this.imageOpacity,
            scaleY: this.scale,
            scaleX: this.scale,
          }}>
          <CacheImage uri={this.post.postURL} style={{flex: 1, zIndex: 10}} />
        </Animated.View>
        <TapGestureHandler onHandlerStateChange={this.fadeOut}>
          <Animated.View
            style={[styles.postTextContainer, {opacity: this.textOpacity}]}>
            <ScrollView
              showsVerticalScrollIndicator={false}
              contentContainerStyle={styles.innerContentContainer}>
              <Headline style={[styles.postText, styles.mainHeader]}>
                {this.post.createdBy}
              </Headline>
              <Subheading style={[styles.postText]}>
                {this.post.postCaption}
              </Subheading>
            </ScrollView>
          </Animated.View>
        </TapGestureHandler>
      </View>
    );
  }
}

export default PostViewScreen;
