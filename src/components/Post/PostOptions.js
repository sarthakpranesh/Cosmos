import React from 'react';
import {Alert} from 'react-native';

import BottomSheet from '../BottomSheet/index';

// importing utils
import {onShare, onDelete} from '../../utils/Handlers/PostHandlers';

const PostOptions = ({isOpen, closeSheet, goBack, box, postName}) => {
  return (
    <BottomSheet
      isOpen={isOpen}
      closeBottomSheet={() => closeSheet()}
      options={[
        {
          text: 'Delete',
          onPress: () => {
            closeSheet();
            onDelete(box, postName, goBack);
          },
        },
        {
          text: 'Share',
          onPress: () => {
            onShare(box + '@@@' + postName.split('.')[0], (message) => {
              Alert.alert('Error', message, [{text: 'ok'}], {
                cancelable: true,
              });
            });
            closeSheet();
          },
        },
      ]}
    />
  );
};

PostOptions.defaultProps = {
  isOpen: false,
  closeSheet: () => {},
  goBack: () => {},
  box: '',
  postName: '',
};

export default PostOptions;
