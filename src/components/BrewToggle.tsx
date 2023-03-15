import React from 'react';
import { Animated, View, Pressable, StyleSheet } from 'react-native';
import Text from './Text';

interface IProps {
  isSingle: boolean;
  setIsSingle: (isSingle: boolean) => void;
}

const BrewToggle: React.FC<IProps> = ({ isSingle, setIsSingle }) => {
  const [width, setWidth] = React.useState<number>();

  const slideAnim = React.useRef(new Animated.Value(0)).current;

  const slide = (value: number) => {
    Animated.timing(slideAnim, {
      toValue: value,
      duration: 400,
      useNativeDriver: false,
    }).start();
  };

  return (
    <View
      style={Style.container}
      onLayout={(event) => setWidth(event.nativeEvent.layout.width)}
    >
      <Animated.View style={[Style.pill, { left: slideAnim }]} />
      <Pressable
        onPress={() => {
          setIsSingle(true);
          slide(0);
        }}
        style={Style.pressable}
      >
        <Text style={[Style.text, isSingle ? Style.selectedText : null]}>
          Single
        </Text>
      </Pressable>
      <Pressable
        onPress={() => {
          setIsSingle(false);
          slide(0.5 * width);
        }}
        style={Style.pressable}
      >
        <Text style={[Style.text, isSingle ? null : Style.selectedText]}>
          Scheduled
        </Text>
      </Pressable>
    </View>
  );
};

export default BrewToggle;

const Style = StyleSheet.create({
  container: {
    width: 250,
    height: 30,
    flexDirection: 'row',
    borderRadius: 15,
    borderWidth: 1,
  },
  pressable: {
    width: '50%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  pill: {
    width: '50%',
    backgroundColor: 'black',
    borderRadius: 15,
    position: 'absolute',
    height: '100%',
  },
  text: {
    zIndex: 999,
  },
  selectedText: {
    color: 'white',
  },
});
