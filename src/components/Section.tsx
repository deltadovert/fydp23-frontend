import React from 'react';
import { View, StyleSheet } from 'react-native';
import { COLORS } from '../assets/colors';
import Spacer from './Spacer';
import Text, { TextSize } from './Text';

interface IProps {
  title: string;
  children: React.ReactNode;
}

const Section: React.FC<IProps> = ({ title, children }) => (
  <View style={Style.container}>
    <Text style={Style.title} size={TextSize.MEDIUM}>
      {title}
    </Text>
    <Spacer height={10} />
    {children}
  </View>
);

export default Section;

const Style = StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: COLORS.background,
    padding: 10,
    borderRadius: 10,
  },
  title: {
    fontWeight: 'bold',
    color: 'white',
  },
});
