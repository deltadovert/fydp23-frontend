import React from 'react';
import { StyleSheet, View, Text, Button } from 'react-native';
import DatePicker from 'react-native-datepicker';
import Spacer from './Spacer';
import moment from 'moment';

// const DAYS = [
//   'Monday',
//   'Tuesday',
//   'Wednesday',
//   'Thursday',
//   'Friday',
//   'Saturday',
//   'Sunday',
// ];

const getTimestamp = (date, time) => {
  const timeArr = time.split(':'); // '04:20'
  const hours = timeArr[0];
  const mins = timeArr[1];

  const dateArr = date.split('-'); // 2000-07-28
  const year = dateArr[0];
  const month = dateArr[1] - 1; // months are zero indexed 😅
  const day = dateArr[2];

  const timestamp = new Date(year, month, day, hours, mins).getTime() / 1000;

  return timestamp;
};

const ScheduleBrew = ({ navigation }) => {
  // the DatePicker component handles dates/times as strings
  const now = Date.now();
  const dateNow = moment(now).format('YYYY-MM-DD');
  const timeNow = moment(now).format('HH:mm');
  const [date, setDate] = React.useState(dateNow);
  const [time, setTime] = React.useState(timeNow);

  const onGoBack = () => {
    navigation.pop();
  };

  const onSubmit = () => {
    // post new schedule to BE boys
  };

  React.useEffect(() => {
    console.log(getTimestamp(date, time));
  }, [date, time]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Schedule a new brew!</Text>

      <Spacer height={20} />

      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Text>Date</Text>
        <Spacer width={20} />
        <DatePicker
          date={date}
          onDateChange={setDate}
          showIcon={false}
          cancelBtnText="Cancel"
          confirmBtnText="Submit"
        />
      </View>

      <Spacer height={20} />

      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Text>Time</Text>
        <Spacer width={20} />
        <DatePicker
          mode="time"
          date={time}
          onDateChange={setTime}
          showIcon={false}
          cancelBtnText="Cancel"
          confirmBtnText="Submit"
        />
      </View>

      <Spacer height={20} />

      <Button title="Let's Go!" onPress={onSubmit} />

      <Spacer height={20} />

      <Button title="Go back" onPress={onGoBack} />
    </View>
  );
};

export default ScheduleBrew;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    alignItems: 'center',
    paddingTop: '20%',
    flex: 1,
  },
  title: {
    fontSize: '30',
    fontWeight: 'bold',
  },
  labels: {
    flexDirection: 'row',
    alignItems: 'space-between',
  },
  labelText: {
    fontSize: '12',
  },
});
