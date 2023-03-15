import React from 'react';
import { StyleSheet } from 'react-native';
import Button from './components/Button';
import { useAPI } from './api/api';
import BrewStatus from './components/BrewStatus';
import Spacer from './components/Spacer';
import GenericScreen from './GenericScreen';
import { REFETCH_STATUS_MS } from './consts';
import ScheduleView from './components/ScheduleView';

const Home = ({ navigation }) => {
  const onScheduleNewBrew = () => {
    navigation.push('ScheduleBrew');
  };

  return (
    <GenericScreen
      title="Welcome back to"
      style={{ justifyContent: 'space-between' }}
      showLogo
    >
      <ScheduleView />

      <BrewStatus />

      <Button
        text="Schedule brew"
        onPress={onScheduleNewBrew}
        color="black"
        style={{ width: 200 }}
      />
      <Spacer height={100} />
    </GenericScreen>
  );
};

export default Home;
