import React from 'react';
import { View } from 'react-native';

interface IProps {
  width?: number;
  height?: number;
}

const Spacer: React.FC<IProps> = ({ width, height }) => {
  return <View style={{ width, height }} />;
};

export default Spacer;
