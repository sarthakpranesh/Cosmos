/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {
  View,
  TouchableOpacity,
  Image,
  ScrollView,
  TextInput,
  Alert,
  ToastAndroid,
} from 'react-native';
import {Text, ActivityIndicator} from 'react-native-paper';
import ImagePicker from 'react-native-image-crop-picker';
import auth from '@react-native-firebase/auth';

// importing helper functions
import {uploadImage, updatePosts} from '../../utils/firebase.js';

// importing styles
import styles from './styles';
import Styles from '../../Styles';

// importing components
import ImagePickerIcon from '../../components/icons/ImagePickerIcon';

class AddImageScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      image: null,
      imageCaption: '',
      fileBlog: null,
      isLoading: false,
      uid: auth().currentUser.uid,
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
      .then(async (image) => {
        // uri: i.path, width: i.width, height: i.height, mime: i.mime
        const file = await fetch(image.path);
        const fileBlog = await file.blob();
        this.setState({
          fileBlog: fileBlog,
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

  onPostUpload = async () => {
    const {uid, imageCaption, image, fileBlog} = this.state;
    if (!imageCaption) {
      Alert.alert("Can't Upload", 'Caption is required!', [{text: 'Ok'}]);
      return;
    }
    try {
      this.setState({
        isLoading: true,
      });
      const uploadedImage = await uploadImage(uid, fileBlog, image);
      await updatePosts(uid, uploadedImage, imageCaption);
      ToastAndroid.showWithGravity(
        'Post Uploaded Successfully',
        ToastAndroid.SHORT,
        ToastAndroid.CENTER,
      );
      this.setState({
        isLoading: false,
        fileBlog: null,
        image: null,
        imageCaption: '',
      });
    } catch (err) {
      ToastAndroid.showWithGravity(
        err.message,
        ToastAndroid.SHORT,
        ToastAndroid.CENTER,
      );
      this.setState({
        isLoading: false,
      });
    }
  };

  render() {
    const {image, imageCaption, isLoading} = this.state;

    if (isLoading) {
      return (
        <View style={[Styles.mainContainerBackgroundColor]}>
          <ActivityIndicator />
        </View>
      );
    }

    if (image !== null) {
      return (
        <View style={[Styles.mainContainerBackgroundColor]}>
          <ScrollView>
            <View style={[styles.loadedImageContainer]}>
              <Image style={styles.loadedImage} source={image} />
            </View>
            <View style={[styles.aboutImageContainer]}>
              <View style={[styles.aboutImageHeader]}>
                <Text style={[Styles.textSmallBold]}>Write a caption</Text>
                <TouchableOpacity onPress={this.onPostUpload}>
                  <Text style={[Styles.textMedium]}>Share</Text>
                </TouchableOpacity>
              </View>
              <TextInput
                value={imageCaption}
                style={[Styles.textInput, styles.textInputCaption]}
                onChangeText={(caption) => this.setImageCaption(caption)}
                placeholder="Type a caption here"
                placeholderTextColor="white"
                autoCapitalize="sentences"
                autoFocus={true}
                maxLength={200}
                multiline={true}
                textAlignVertical="top"
                defaultValue="No Caption"
              />
            </View>
          </ScrollView>
        </View>
      );
    }

    return (
      <View
        style={[Styles.containerStarting, Styles.mainContainerBackgroundColor]}>
        <View style={[styles.mainAddImageContainer]}>
          <TouchableOpacity onPress={this.openImagePicker}>
            <ImagePickerIcon width={40} height={40} />
          </TouchableOpacity>
          <Text style={[Styles.textSmall]}>Add Image</Text>
        </View>
      </View>
    );
  }
}

export default AddImageScreen;
