import React from 'react';
import {
  Dimensions,
  GestureResponderEvent,
  LayoutChangeEvent,
  PanResponder,
  StyleSheet,
  View,
} from 'react-native';
import { COLORS } from '../assets/colors';
import { MAX_SLIDER_VALUE, MIN_SLIDER_VALUE } from '../consts';
import Spacer from './Spacer';
import Text, { TextSize } from './Text';

const SLIDER_HEAD_SIZE = 15;
const SLIDER_BAR_RANGE = MAX_SLIDER_VALUE - MIN_SLIDER_VALUE;

interface IProps {
  sliderValue: number;
  setSliderValue: (value: number) => void;
  sliderBarWidth: number;
  setSliderBarWidth: (value: number) => void;
  isCold: boolean;
}

const ExtractionTimeSlider: React.FC<IProps> = ({
  sliderValue,
  setSliderValue,
  sliderBarWidth,
  setSliderBarWidth,
  isCold,
}) => {
  const panResponder = PanResponder.create({
    onMoveShouldSetPanResponder: () => true,
    onPanResponderMove: (event, gestureState) => {
      const { dx } = gestureState;
      const newValue =
        Math.round(
          (dx / sliderBarWidth) * SLIDER_BAR_RANGE +
            (sliderValue - MIN_SLIDER_VALUE)
        ) + MIN_SLIDER_VALUE;
      setSliderValue(
        Math.max(MIN_SLIDER_VALUE, Math.min(newValue, MAX_SLIDER_VALUE))
      );
    },
  });

  const unit = isCold ? 'h' : 'min';

  const handleSliderBarLayout = (event: LayoutChangeEvent) => {
    setSliderBarWidth(event.nativeEvent.layout.width);
  };

  const sliderHeadPosition =
    ((sliderValue - MIN_SLIDER_VALUE) / SLIDER_BAR_RANGE) * sliderBarWidth -
    (1 / 2) * SLIDER_HEAD_SIZE;

  return (
    <View style={Style.container} {...panResponder.panHandlers}>
      <Text size={TextSize.MEDIUM}>Extraction Time</Text>

      <Spacer height={10} />
      <View style={Style.sliderBox} onLayout={handleSliderBarLayout}>
        <View style={Style.sliderBar} />

        <View style={[Style.sliderHead, { left: sliderHeadPosition }]} />
      </View>
      <Spacer height={10} />
      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <Text size={TextSize.TINY}>{MIN_SLIDER_VALUE}{unit}</Text>
        <Text size={TextSize.TINY}>
          {(MIN_SLIDER_VALUE + MAX_SLIDER_VALUE) / 2}{unit}
        </Text>
        <Text size={TextSize.TINY}>{MAX_SLIDER_VALUE}{unit}</Text>
      </View>
    </View>
  );
};

export default ExtractionTimeSlider;

const Style = StyleSheet.create({
  container: {
    width: '100%',
  },
  sliderBox: {
    justifyContent: 'center',
  },
  sliderBar: {
    height: 3,
    backgroundColor: 'black',
    borderRadius: 5,
  },
  sliderHead: {
    width: SLIDER_HEAD_SIZE,
    height: SLIDER_HEAD_SIZE,
    backgroundColor: COLORS.button,
    borderRadius: SLIDER_HEAD_SIZE / 2,
    position: 'absolute',
  },
});
