import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import CircularProgress from 'react-native-circular-progress-indicator';
import Spacer from './Spacer';

const BrewStatus = () => {
  const length = 16;
  const timeDone = Math.floor(Math.random() * length);
  const timeLeft = length - timeDone;

  const isBrewing = Math.random() > 0.5;

  return (
    <View style={styles.container}>
      <Text style={styles.statusText}>Your Brew Status</Text>

      <Spacer height={20} />
      <View style={{ alignItems: 'center' }}>
        <Text
          style={{
            position: 'absolute',
            top: '30%',
            fontSize: 20,
            fontWeight: 'bold',
          }}
        >
          {timeLeft}
        </Text>
        <CircularProgress
          value={timeDone}
          showProgressValue={false}
          radius={50}
          duration={1000}
          progressValueColor={'#cccccc'}
          maxValue={16}
          title={'hours left!'}
          titleColor={'#cccccc'}
          titleStyle={{ fontWeight: 'bold', top: 10 }}
          titleFontSize={12}
        />
      </View>
    </View>
  );
};

export default BrewStatus;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  statusText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});
