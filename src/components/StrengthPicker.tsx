import React from 'react';
import { View, Pressable, StyleSheet } from 'react-native';
import Text from './Text';

export enum BrewStrength {
  MILD = 'mild',
  MEDIUM = 'medium',
  BOLD = 'bold',
}

interface IProps {
  selectedStrength: BrewStrength;
  setStrength: (strength: BrewStrength) => void;
}

const BrewStrengthPicker: React.FC<IProps> = ({
  selectedStrength,
  setStrength,
}) => {
  const getStrengthColor = () => {
    switch (selectedStrength) {
      case BrewStrength.MILD:
        return '#b5764a';
      case BrewStrength.MEDIUM:
        return '#825535';
      case BrewStrength.BOLD:
        return '#482f1e';
    }
  };

  const BrewStrengthComponent = ({ strength }) => {
    const isSelected = strength === selectedStrength;

    return (
      <Pressable
        onPress={() => setStrength(strength)}
        style={[
          Style.pressable,
          isSelected ? { backgroundColor: getStrengthColor() } : null,
        ]}
      >
        <Text style={[Style.text, isSelected ? Style.selectedText : null]}>
          {strength}
        </Text>
      </Pressable>
    );
  };

  return (
    <View style={Style.container}>
      <BrewStrengthComponent strength={BrewStrength.MILD} />
      <BrewStrengthComponent strength={BrewStrength.MEDIUM} />
      <BrewStrengthComponent strength={BrewStrength.BOLD} />
    </View>
  );
};

export default BrewStrengthPicker;

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
