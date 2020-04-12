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
import RNFS from 'react-native-fs';

// importing styles
import styles from './styles';
import Styles from '../../Styles';

// importing firebase
import * as firebase from 'firebase';

// importing firebase utils
import {uploadImage} from '../../utils/firebase';
import {uploadDownloadUrlDB} from '../../utils/apiFunctions';

// importing components
import Header from '../../components/Header';
import ImagePickerIcon from '../../components/icons/ImagePickerIcon';
import LoadingIndicator from '../../components/LoadingIndicator';

class AddImageScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      image: null,
      imageCaption: '',
      fileBlog: null,
      isLoading: false,
      uid: firebase.auth().currentUser.uid,
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
    try {
      this.setState({
        isLoading: true,
      });
      const downloadURL = await uploadImage(uid, fileBlog, image);
      await uploadDownloadUrlDB(downloadURL, imageCaption);
      this.setState({
        isLoading: false,
        fileBlog: null,
        image: null,
      });
    } catch (err) {
      console.log(err.message);
      this.setState({
        isLoading: false,
      });
    }
  };

  render() {
    const {image, imageCaption, isLoading} = this.state;

    if (isLoading) {
      return <LoadingIndicator />;
    }

    if (image !== null) {
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
                <TouchableOpacity onPress={this.onPostUpload}>
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
                maxLength={200}
                multiline={true}
                textAlignVertical="top"
                defaultValue="No Caption"
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
