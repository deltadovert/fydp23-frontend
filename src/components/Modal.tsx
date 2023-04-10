import React from 'react';
import { View, Dimensions, StyleSheet } from 'react-native';
import Button, { ButtonSize } from './Button';

export interface ModalProps {
  visible: boolean;
  onClose: () => void;
  children?: React.ReactNode;
}

const SCREEN_HEIGHT = Dimensions.get('screen').height;
const SCREEN_WIDTH = Dimensions.get('screen').width;

const Modal: React.FC<ModalProps> = ({ visible, onClose, children }) => {
  if (!visible) return null;

  return (
    <View
      style={{
        height: SCREEN_HEIGHT,
        width: SCREEN_WIDTH,
        position: 'absolute',
        zIndex: 999,
      }}
    >
      <View style={Style.overlay} />
      <View style={Style.innerContainer}>
        {children}
        <Button
          text="Go Home"
          onPress={onClose}
          color="black"
          size={ButtonSize.MED}
          style={{ width: 100, bottom: 20, left: 20, position: 'absolute' }}
        />
      </View>
    </View>
  );
};

export default Modal;

const Style = StyleSheet.create({
  overlay: {
    opacity: 0.5,
    backgroundColor: 'black',
    height: '100%',
    width: '100%',
  },
  innerContainer: {
    backgroundColor: 'white',
    borderRadius: 10,
    position: 'absolute',
    top: 50,
    bottom: 100,
    left: 30,
    right: 30,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
});
