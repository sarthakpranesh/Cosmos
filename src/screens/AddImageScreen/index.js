import React, {Component} from 'react';
import {
  View,
  TouchableOpacity,
  Image,
  ScrollView,
  Alert,
  ToastAndroid,
  Dimensions,
} from 'react-native';
import {Text, TextInput, Button, Headline} from 'react-native-paper';
import ImagePicker from 'react-native-image-crop-picker';
import Icon from 'react-native-vector-icons/Feather';
import auth from '@react-native-firebase/auth';
import {Backpack} from 'react-kawaii/lib/native/';

// importing components
import BoxLoading from '../../components/LottieComponents/BoxLoading/index.js';
import AppHeader from '../../components/AppHeader/index';

//importing Context
import {Context as UserContext} from '../../contexts/UserContext.js';

// importing helper functions
import {uploadImage, updatePosts} from '../../utils/firebase.js';

// importing styles
import styles from './styles';
import Styles from '../../Styles.js';

const {width} = Dimensions.get('window');

class AddImageScreen extends Component {
  static contextType = UserContext;
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
      height: 800,
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
        if (err.code === 'E_PICKER_CANCELLED') {
          ToastAndroid.showWithGravity(
            "You don't wanna upload? 🙁",
            ToastAndroid.SHORT,
            ToastAndroid.CENTER,
          );
        }
      });
  };

  openImageCamera = () => {
    ImagePicker.openCamera({
      width: 800,
      height: 800,
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
        if (err.code === 'E_PICKER_CANCELLED') {
          ToastAndroid.showWithGravity(
            "You don't wanna upload? 🙁",
            ToastAndroid.SHORT,
            ToastAndroid.CENTER,
          );
        }
      });
  };

  onPostUpload = async () => {
    const {imageCaption, image, fileBlog} = this.state;
    const {state} = this.context;
    if (!imageCaption) {
      Alert.alert("Can't Upload", 'Caption is required!', [{text: 'Ok'}]);
      return;
    }
    try {
      this.setState({
        isLoading: true,
      });
      const uploadedImage = await uploadImage(fileBlog, image);
      await updatePosts(uploadedImage, imageCaption, state.box);
      ToastAndroid.showWithGravity(
        'Post Uploaded Successfully 🥳',
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
    const {state} = this.context;

    if (state.box.length === 0) {
      return (
        <View style={styles.addContainer}>
          <Backpack size={width / 2.5} mood="sad" color="#FFD882" />
          <Headline style={[Styles.fontMedium, styles.imgText]}>
            Oops looks like you haven't created a group yet. Please go back to
            the Home screen and take Sun's help to create one first
          </Headline>
        </View>
      );
    }

    if (isLoading) {
      return (
        <View style={styles.addContainer}>
          <BoxLoading />
        </View>
      );
    }

    if (image !== null) {
      return (
        <View style={styles.addContainer}>
          <AppHeader
            iconLeft="x"
            onPressLeft={() => {
              Alert.alert(
                'Discard Post',
                'Do you want to discard your post, all changes will be lost?',
                [
                  {
                    text: 'Discard',
                    onPress: () =>
                      this.setState({
                        isLoading: false,
                        fileBlog: null,
                        image: null,
                        imageCaption: '',
                      }),
                  },
                  {
                    text: 'Cancel',
                    onPress: () => {},
                  },
                ],
                {cancelable: true},
              );
            }}
            iconRight="send"
            onPressRight={this.onPostUpload}
          />
          <ScrollView showsVerticalScrollIndicator={false}>
            <View>
              <Image style={styles.loadedImage} source={image} />
              <View style={styles.captionContainer}>
                <TextInput
                  value={imageCaption}
                  style={styles.textInputCaption}
                  onChangeText={(caption) => this.setImageCaption(caption)}
                  placeholder="Write a caption"
                  placeholderTextColor="white"
                  autoCapitalize="sentences"
                  autoFocus={true}
                  maxLength={300}
                  multiline={true}
                  numberOfLines={6}
                  textAlignVertical="top"
                  defaultValue="No Caption"
                />
              </View>
            </View>
          </ScrollView>
        </View>
      );
    }

    return (
      <View style={styles.addContainer}>
        <Backpack size={width / 2.5} mood="excited" color="#FFD882" />
        <Headline style={[Styles.fontMedium, styles.imgText]}>
          Lets see what you got in your bag of pics, or I can help you get a
          shot if you need help with that
        </Headline>
        <View style={styles.optionsContainer}>
          <TouchableOpacity
            style={styles.optionContainer}
            onPress={() => {
              if (state.box === '') {
                return ToastAndroid.showWithGravity(
                  'No Box selected!',
                  ToastAndroid.SHORT,
                  ToastAndroid.CENTER,
                );
              }
              this.openImagePicker();
            }}>
            <Icon size={width * 0.06} name="plus" color="white" />
            <Text style={Styles.fontMedium}>Open Bag</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.optionContainer}
            onPress={() => {
              if (state.box === '') {
                return ToastAndroid.showWithGravity(
                  'No Box selected!',
                  ToastAndroid.SHORT,
                  ToastAndroid.CENTER,
                );
              }
              this.openImageCamera();
            }}>
            <Icon size={width * 0.06} name="camera" color="white" />
            <Text style={Styles.fontMedium}>Start Camera</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

export default AddImageScreen;
