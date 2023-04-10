import React from 'react';
import { Animated, Pressable, StyleSheet, View } from 'react-native';
import Spacer from './Spacer';
import Text from './Text';

const SIZE = 30;

interface IProps {
  isCold: boolean;
  setIsCold: (isCold: boolean) => void;
}

const HotWaterMode: React.FC<IProps> = ({ isCold, setIsCold }) => {
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
      <Animated.View
        style={[
          Style.pill,
          { left: slideAnim },
          { backgroundColor: isCold ? 'blue' : 'red' },
        ]}
      />
      <Pressable
        onPress={() => {
          setIsCold(true);
          slide(0);
        }}
        style={Style.ice}
      >
        <Text>❄️</Text>
      </Pressable>
      <Pressable
        onPress={() => {
          setIsCold(false);
          slide(0.5 * width);
        }}
        style={Style.flame}
      >
        <Text>🔥</Text>
      </Pressable>
    </View>
  );
};

export default HotWaterMode;

const Style = StyleSheet.create({
  container: {
    width: 150,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: SIZE / 2,
    borderWidth: 1,
  },
  text: {
    color: 'red',
  },
  pill: {
    width: '50%',
    position: 'absolute',
    height: '100%',
    borderRadius: SIZE / 2,
  },
  flame: {
    width: '50%',
    height: SIZE,
    justifyContent: 'center',
    alignItems: 'center',
  },
  ice: {
    width: '50%',
    height: SIZE,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emoji: {
    textAlign: 'center',
  },
});
