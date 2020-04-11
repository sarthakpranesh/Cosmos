/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  TextInput,
} from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';

// importing styles
import styles from './styles';
import Styles from '../../Styles';

// importing firebase
import * as firebase from 'firebase';

// importing components
import Header from '../../components/Header';
import ImagePickerIcon from '../../components/icons/ImagePickerIcon';

class AddImageScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      opacity: 1,
      image: null,
      imageCaption: '',
    };
  }

  setImageCaption = (caption) => {
    this.setState({
      imageCaption: caption,
    });
  };

  openImagePicker = () => {
    ImagePicker.openPicker({
      width: 800,
      height: 900,
      cropping: true,
    })
      .then((image) => {
        // uri: i.path, width: i.width, height: i.height, mime: i.mime
        this.setState({
          image: {
            uri: image.path,
            width: image.width,
            height: image.height,
            mime: image.mime,
          },
        });
        return;
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  render() {
    const {image, imageCaption} = this.state;

    if (image !== null) {
      console.log(image);
      return (
        <>
          <Header />
          <ScrollView>
            <View style={[styles.loadedImageContainer]}>
              <Image style={styles.loadedImage} source={image} />
            </View>
            <View style={[styles.aboutImageContainer]}>
              <View style={[styles.aboutImageHeader]}>
                <Text style={Styles.textSmallBold}>Write a caption</Text>
                <TouchableOpacity>
                  <Text style={[Styles.textSmallBold, {color: 'blue'}]}>
                    Share
                  </Text>
                </TouchableOpacity>
              </View>
              <TextInput
                value={imageCaption}
                style={[Styles.textInput, styles.textInputCaption]}
                onChangeText={(caption) => this.setImageCaption(caption)}
                placeholder="Type a caption here"
                autoCapitalize="sentences"
                autoFocus={true}
                maxLength={500}
                multiline={true}
                textAlignVertical="top"
              />
            </View>
          </ScrollView>
        </>
      );
    }

    return (
      <>
        <Header />
        <View style={[styles.mainAddImageContainer]}>
          <TouchableOpacity onPress={this.openImagePicker}>
            <ImagePickerIcon width={40} height={40} />
          </TouchableOpacity>
          <Text style={[Styles.textSmall, {marginTop: 10}]}>Add Image</Text>
        </View>
      </>
    );
  }
}

export default AddImageScreen;
