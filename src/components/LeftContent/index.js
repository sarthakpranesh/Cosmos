import React from 'react';
import {Avatar} from 'react-native-paper';

const LeftContent = (props) => {
  if (!props.src) {
    return (
      <Avatar.Icon size={props.size} icon={props.src ? props.src : 'folder'} />
    );
  }
  return <Avatar.Image size={props.size} source={{uri: props.src}} />;
};

export default LeftContent;
