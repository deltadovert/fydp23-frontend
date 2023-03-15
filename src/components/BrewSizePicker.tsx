import React from 'react';
import { View, Pressable, StyleSheet } from 'react-native';
import Text from './Text';

export enum BrewSize {
  SMALL = 'small',
  MEDIUM = 'medium',
  LARGE = 'large',
}

interface IProps {
  selectedSize: BrewSize;
  setSize: (size: BrewSize) => void;
}

const BrewSizePicker: React.FC<IProps> = ({ selectedSize, setSize }) => {
  const BrewSizeComponent = ({ size }) => {
    const isSelected = size === selectedSize;

    return (
      <Pressable
        onPress={() => setSize(size)}
        style={[Style.pressable, isSelected ? Style.selectedPressable : null]}
      >
        <Text style={[Style.text, isSelected ? Style.selectedText : null]}>
          {size}
        </Text>
      </Pressable>
    );
  };

  return (
    <View style={Style.container}>
      <BrewSizeComponent size={BrewSize.SMALL} />
      <BrewSizeComponent size={BrewSize.MEDIUM} />
      <BrewSizeComponent size={BrewSize.LARGE} />
    </View>
  );
};

export default BrewSizePicker;

const Style = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  pressable: {
    width: 100,
    height: 50,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectedPressable: {
    backgroundColor: 'black',
  },
  text: {
    textTransform: 'capitalize',
  },
  selectedText: {
    color: 'white',
  },
});
