import {Share, ToastAndroid, Alert} from 'react-native';
import database from '@react-native-firebase/database';
import {deletePosts} from '../firebase.js';

export const onShare = (id, setError) => {
  Share.share({
    title: 'Cosmos Post',
    message: `Cosmos link:- https://cosmosrn.now.sh/link/post?id=${id}`,
  }).catch((err) => {
    console.log('Error at onShare:', err.message);
    setError(err.message);
  });
};

export const onDelete = (box, name, goBack) => {
  Alert.alert('Delete Post', 'Are you sure you want to delete this post?', [
    {text: 'cancel', onPress: () => {}},
    {
      text: 'Delete',
      onPress: () => {
        goBack();
        database().ref(box).child(name.split('.')[0]).off();
        deletePosts(box, name)
          .then(() => {
            ToastAndroid.showWithGravity(
              'Post Deleted Successfully',
              ToastAndroid.SHORT,
              ToastAndroid.CENTER,
            );
          })
          .catch((err) => {
            console.log('Error at onDelete:', err.message);
            goBack();
          });
      },
    },
  ]);
};
