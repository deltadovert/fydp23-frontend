import React from 'react';
import { Text as RNText, TextProps, StyleSheet } from 'react-native';

export enum TextSize {
  TINY,
  SMALL,
  MEDIUM,
  LARGE,
  TITLE,
}

interface IProps extends TextProps {
  size?: TextSize;
}

const getTextStyle = (textSize: TextSize) => {
  switch (textSize) {
    case TextSize.SMALL:
      return { fontSize: 14, lineHeight: 18 };
    case TextSize.MEDIUM:
      return { fontSize: 16, lineHeight: 20 };
    case TextSize.LARGE:
      return { fontSize: 20, lineHeight: 24 };
    case TextSize.TITLE:
      return { fontSize: 30, lineHeight: 34 };
    case TextSize.TINY:
      return { fontSize: 10, lineHeight: 14 };
  }
};

const Text: React.FC<IProps> = ({ size = TextSize.SMALL, ...props }) => {
  return (
    <RNText
      {...props}
      style={[Style.defaultFont, getTextStyle(size), props.style]}
    >
      {props.children}
    </RNText>
  );
};

export default Text;

const Style = StyleSheet.create({
  defaultFont: {
    fontFamily: 'Hiragino Sans',
    letterSpacing: 1,
  },
});
