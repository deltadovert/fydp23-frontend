import React from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';

const Home = ({ navigation }) => {
  const onScheduleNewBrew = () => {
    navigation.push('ScheduleBrew');
  };

  return (
    <View style={styles.container}>
      <Text>Welcome Back to BrewX</Text>

      <Button onPress={onScheduleNewBrew} title="Schedule a new brew" />
      <Button onPress={() => {}} title="Brew now" />
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    paddingTop: '20%',
  },
});
