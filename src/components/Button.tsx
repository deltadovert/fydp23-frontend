import React from 'react';
import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  ViewStyle,
} from 'react-native';
import Text from './Text';

export enum ButtonSize {
  SMALL,
  MED,
  LARGE,
}

interface IProps {
  text: string;
  onPress: () => void;
  size?: ButtonSize;
  style?: ViewStyle;
  isLoading?: boolean;
  color: string;
}

const getSizes = (buttonSize: ButtonSize) => {
  switch (buttonSize) {
    case ButtonSize.SMALL:
      return { height: 20, width: 50, fontSize: 10 };
    case ButtonSize.MED:
      return { height: 40, width: 80, fontSize: 12 };
    case ButtonSize.LARGE:
      return { height: 60, width: 150, fontSize: 16 };
  }
};

const Button: React.FC<IProps> = ({
  text,
  onPress,
  size = ButtonSize.LARGE,
  style,
  isLoading = false,
  color,
}) => {
  const { height, width, fontSize } = getSizes(size);

  return (
    <Pressable
      style={({ pressed }) => [
        Style.container,
        pressed ? Style.pressed : undefined,
        { backgroundColor: color, height, width },
        style,
      ]}
      onPress={onPress}
    >
      {isLoading ? (
        <ActivityIndicator size="small" color="white" />
      ) : (
        <Text style={[Style.text, { fontSize }]}>{text}</Text>
      )}
    </Pressable>
  );
};

export default Button;

const Style = StyleSheet.create({
  container: {
    backgroundColor: 'purple',
    paddingHorizontal: 15,
    height: 60,
    justifyContent: 'center',
    borderRadius: 10,
  },
  pressed: {
    opacity: 0.6,
  },
  text: {
    textAlign: 'center',
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
});
