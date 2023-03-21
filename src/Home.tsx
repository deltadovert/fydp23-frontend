import React from 'react';
import Button from './components/Button';
import BrewStatus from './components/BrewStatus';
import Spacer from './components/Spacer';
import GenericScreen from './GenericScreen';
import ScheduleView from './components/ScheduleView';

const Home = ({ navigation }) => {
  const onScheduleNewBrew = () => {
    navigation.push('ScheduleBrew');
  };

  return (
    <GenericScreen
      title="Welcome back to BrewDaddy!"
      style={{ justifyContent: 'space-between' }}
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
