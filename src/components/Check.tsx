import React from 'react';
import { Image } from 'react-native';
import { IMAGES } from '../assets/images/images';

const Check: React.FC = () => (
  <Image
    source={IMAGES.checkMark}
    style={{ width: '100%', height: 75 }}
    resizeMode="contain"
  />
);

export default Check;
