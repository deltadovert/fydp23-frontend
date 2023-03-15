import React from 'react';
import { Image } from 'react-native';
import { IMAGES } from '../assets/images/images';

const Loading = () => {
  return (
    <Image
      source={IMAGES.loadingGif}
      style={{ width: '100%', height: 120 }}
      resizeMode="contain"
    />
  );
};

export default Loading;
