import React from 'react';
import {StyleSheet} from 'react-native';
import FastImage from 'react-native-fast-image';

const ActiveImage = ({size, uri, style}) => {
  return (
    <FastImage
      style={[
        styles.postImage,
        style,
        {
          width: size,
          height: size,
        },
      ]}
      source={{
        uri: uri,
        priority: FastImage.priority.high,
      }}
    />
  );
};

const styles = StyleSheet.create({
  postImage: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    resizeMode: 'cover',
  },
});

export default ActiveImage;
