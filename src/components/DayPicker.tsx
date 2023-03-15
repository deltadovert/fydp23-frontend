import React from 'react';
import { View, Pressable } from 'react-native';
import { COLORS } from '../assets/colors';
import Text from './Text';

interface IProps {
  selectedDays: number[];
  onSelectedDaysChange: (days: number[]) => void;
}

// pick days of the Week for brew schedule
const DayPicker: React.FC<IProps> = ({
  selectedDays,
  onSelectedDaysChange,
}) => {
  const days = ['Mon', 'Tues', 'Wed', 'Thurs', 'Fri', 'Sat', 'Sun'];

  const toggleDay = (day: number) => {
    const _selectedDays = selectedDays.slice();
    if (_selectedDays.includes(day)) {
      _selectedDays.splice(_selectedDays.indexOf(day), 1);
    } else {
      _selectedDays.push(day);
    }
    _selectedDays.sort((a, b) => a - b);
    onSelectedDaysChange(_selectedDays);
  };

  return (
    <View
      style={{
        flexDirection: 'row',
        borderWidth: 1,
        borderRadius: 5,
      }}
    >
      {days.map((day, index) => (
        <Pressable
          onPress={() => toggleDay(index)}
          style={[
            selectedDays.includes(index)
              ? { backgroundColor: COLORS.button }
              : null,
            {
              width: 45,
              height: 30,
              alignItems: 'center',
              justifyContent: 'center',
            },
            index == 0
              ? { borderTopLeftRadius: 5, borderBottomLeftRadius: 5 }
              : null,
            index == days.length - 1
              ? { borderTopRightRadius: 5, borderBottomRightRadius: 5 }
              : null,
          ]}
          key={index}
        >
          <Text
            style={[
              selectedDays.includes(index)
                ? { color: 'white' }
                : { color: 'black' },
            ]}
          >
            {day}
          </Text>
        </Pressable>
      ))}
    </View>
  );
};

export default DayPicker;
