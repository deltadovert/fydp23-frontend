import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Spacer from './Spacer';

const GenericScreen = ({ title, children }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <Spacer height={20} />
      {children}
    </View>
  );
};

export default GenericScreen;

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
});
