/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {View, Text, ScrollView, Button} from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';

// importing styles
import styles from './styles';
import Styles from '../../Styles';

// importing firebase
import * as firebase from 'firebase';

// importing components
import Header from '../../components/Header';
import {FlatList} from 'react-native-gesture-handler';

class AddImageScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      opacity: 1,
    };
  }

  openImagePicker = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
    }).then((image) => {
      console.log(image);
    });
  };

  render() {
    return (
      <>
        <Header username="Settings" />
        <ScrollView style={{backgroundColor: 'white'}}>
          <View style={[Styles.container]}>
            <Button title="Add Image" onPress={() => this.openImagePicker()} />
          </View>
        </ScrollView>
      </>
    );
  }
}

export default AddImageScreen;
