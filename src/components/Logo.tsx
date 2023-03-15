import React from 'react';
import { StyleSheet, Text } from 'react-native';
import { COLORS } from '../assets/colors';

const Logo = () => {
  return <Text style={Style.logo}>BREWDADDY</Text>;
};

export default Logo;

const Style = StyleSheet.create({
  logo: {
    color: 'black',
    fontSize: 40,
    fontFamily: 'Palatino',
    letterSpacing: 3,
    width: '100%',
    textShadowColor: COLORS.background,
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 1,
    textAlign: 'center',
    shadowColor: COLORS.background,
    shadowOffset: { width: -2, height: -2 },
    shadowOpacity: 1,
    shadowRadius: 2,
    top: 40,
    position: 'absolute',
  },
});
