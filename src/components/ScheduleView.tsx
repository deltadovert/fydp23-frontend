import { useAPI } from '../api/api';
import React from 'react';
import { View, StyleSheet } from 'react-native';
import Spacer from './Spacer';
import Text from './Text';
import { COLORS } from '../assets/colors';

const ScheduleView: React.FC<IProps> = () => {
  const days = ['Mon', 'Tues', 'Wed', 'Thurs', 'Fri', 'Sat', 'Sun'];

  const [schedule, setSchedule] = React.useState<{
    days: number[];
    ready_time: string;
  }>();
  const [isLoading, setLoading] = React.useState<boolean>();
  const api = useAPI();

  const getFormattedTimeString = (time: string) => {
    let [h, m] = time.split(':');
    if (parseInt(h) > 12) {
      return `${parseInt(h) - 12}:${m} PM`;
    }
    if (parseInt(h) == 12) {
      return `12:${m} PM`;
    }
    if (parseInt(h) == 0) {
      return `12:${m} AM`;
    } else {
      return `${parseInt(h)}:${m} AM`;
    }
  };

  React.useEffect(() => {
    setLoading(true);
    api
      .getSchedule()
      .then((res) => setSchedule(res.schedule))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  if (isLoading) return;

  return schedule ? (
    <View style={Style.container}>
      <Text style={Style.title}>Your brew schedule</Text>
      <Spacer height={10} />
      <View style={Style.weekBox}>
        {days.map((day, index) => (
          <View
            style={[
              schedule.days.includes(index)
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
                schedule.days.includes(index)
                  ? { color: 'white' }
                  : { color: 'black' },
              ]}
            >
              {day}
            </Text>
          </View>
        ))}
      </View>
      <Spacer height={10} />
      <Text style={Style.text}>{`@${getFormattedTimeString(
        schedule.ready_time
      )}`}</Text>
    </View>
  ) : null;
};

export default ScheduleView;

const Style = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: COLORS.background,
    borderRadius: 10,
    padding: 10,
  },
  weekBox: {
    flexDirection: 'row',
    borderWidth: 1,
    borderRadius: 5,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
  },
  text: {
    color: 'white',
  },
});
