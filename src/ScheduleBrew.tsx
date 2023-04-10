import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import RNDateTimePicker, {
  DateTimePickerEvent,
} from '@react-native-community/datetimepicker';
import Spacer from './components/Spacer';
import Button from './components/Button';
import moment from 'moment';
import GenericScreen from './GenericScreen';
import { useAPI } from './api/api';
import DayPicker from './components/DayPicker';
import BrewSizePicker, { BrewSize } from './components/BrewSizePicker';
import Section from './components/Section';
import BrewToggle from './components/BrewToggle';
import BrewStrengthPicker, { BrewStrength } from './components/StrengthPicker';
import { DEFAULT_EXTRACTION_TIME } from './consts';
import Text from './components/Text';
import { COLORS } from './assets/colors';
import ExtractionTimeSlider from './components/ExtractionTimeSlider';
import PostBrewModal, { PostBrewModalType } from './components/PostBrewModal';
import HotWaterMode from './components/HotWaterMode';

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
  const [timestamp, setTimestamp] = React.useState(now / 1000);
  const [days, setDays] = React.useState([0, 1, 2, 3, 4]);

  const [extractionTime, setExtractionTime] = React.useState<number>(
    DEFAULT_EXTRACTION_TIME
  );
  const [sliderBarWidth, setSliderBarWidth] = React.useState<number>(0);

  const [isSingle, setIsSingle] = React.useState(true);

  const [brewSize, setBrewSize] = React.useState<BrewSize>(BrewSize.MEDIUM);
  const [brewStrength, setBrewStrength] = React.useState<BrewStrength>(
    BrewStrength.MEDIUM
  );

  const [isMakingReq, setMakingReq] = React.useState<boolean>(false);
  const [hasError, setHasError] = React.useState<boolean>(false);

  const [showModal, setShowModal] = React.useState<boolean>(false);

  const [isCold, setIsCold] = React.useState<boolean>(true);

  const api = useAPI();

  const onGoBack = () => {
    navigation.pop();
  };

  const onSubmit = () => {
    setMakingReq(true);

    const post = () =>
      isSingle
        ? api.postSingleBrew({
            ready_timestamp: timestamp,
            duration: extractionTime,
            size: brewSize,
            strength: brewStrength,
            is_cold: isCold,
          })
        : api.postScheduledBrew({
            days,
            ready_time: time,
            duration: extractionTime,
            size: brewSize,
            strength: brewStrength,
            is_cold: isCold,
          });
    post()
      .then(() => {
        setHasError(false);
        setShowModal(true);
      })
      .catch(() => {
        setHasError(true);
        setShowModal(true);
      })
      .finally(() => setMakingReq(false));
  };

  const onModalClose = () => {
    setShowModal(false);
    navigation.pop();
  };

  React.useEffect(() => {
    setTimestamp(getTimestamp(date, time));
  }, [date, time]);

  const handleDateChange = (event: DateTimePickerEvent) => {
    const ts = event.nativeEvent.timestamp;
    setDate(moment(ts).format('YYYY-MM-DD'));
  };

  const handleTimeChange = (event: DateTimePickerEvent) => {
    const ts = event.nativeEvent.timestamp;
    setTime(moment(ts).format('HH:mm'));
  };

  return (
    <GenericScreen title="Schedule a new brew!">
      <ScrollView
        contentContainerStyle={{
          alignItems: 'center',
          paddingBottom: 150,
        }}
        showsVerticalScrollIndicator={false}
      >
        <Section title="Size">
          <BrewSizePicker selectedSize={brewSize} setSize={setBrewSize} />
        </Section>

        <Spacer height={20} />

        <Section title="Strength">
          <BrewStrengthPicker
            selectedStrength={brewStrength}
            setStrength={setBrewStrength}
          />
        </Section>

        <Spacer height={20} />

        <HotWaterMode isCold={isCold} setIsCold={setIsCold} />

        <Spacer height={20} />

        <ExtractionTimeSlider
          sliderValue={extractionTime}
          setSliderValue={setExtractionTime}
          sliderBarWidth={sliderBarWidth}
          setSliderBarWidth={setSliderBarWidth}
          isCold={isCold}
        />

        <Spacer height={20} />

        <BrewToggle
          isSingle={isSingle}
          setIsSingle={(isSingle) => setIsSingle(isSingle)}
        />

        <Spacer height={20} />

        {isSingle ? (
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Text>Have brew ready on</Text>
            <Spacer width={20} />
            <RNDateTimePicker
              value={new Date(timestamp * 1000)}
              onChange={handleDateChange}
            />
          </View>
        ) : (
          <DayPicker selectedDays={days} onSelectedDaysChange={setDays} />
        )}

        <Spacer height={10} />

        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Text>Have brew{isSingle ? '' : 's'} ready by</Text>
          <Spacer width={20} />
          <RNDateTimePicker
            mode="time"
            value={new Date(timestamp * 1000)}
            onChange={handleTimeChange}
          />
        </View>
      </ScrollView>
      <PostBrewModal
        visible={showModal}
        onClose={onModalClose}
        type={hasError ? PostBrewModalType.FAILURE : PostBrewModalType.SUCCESS}
        brewReadyTime={time}
      />
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          width: '100%',
          bottom: 40,
          position: 'absolute',
        }}
      >
        <Button text="Go back" onPress={onGoBack} color="black" />
        <Button
          text="Let's Go!"
          onPress={onSubmit}
          color={COLORS.button}
          isLoading={isMakingReq}
        />
      </View>
    </GenericScreen>
  );
};

export default ScheduleBrew;

const styles = StyleSheet.create({});
