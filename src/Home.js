import React from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import GenericScreen from './GenericScreen';

const Home = ({ navigation }) => {
  const onScheduleNewBrew = () => {
    navigation.push('ScheduleBrew');
  };

  return (
    <GenericScreen title="Welcome Back to BrewX!">
      <Button onPress={onScheduleNewBrew} title="Schedule a new brew" />
      <Button onPress={() => {}} title="Brew now" />
    </GenericScreen>
  );
};

export default Home;

const styles = StyleSheet.create({});
