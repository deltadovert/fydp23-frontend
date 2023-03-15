import React from 'react';
import { SafeAreaView, StyleSheet, View, ViewStyle } from 'react-native';
import Text, { TextSize } from './components/Text';
import Spacer from './components/Spacer';
import { COLORS } from './assets/colors';
import Logo from './components/Logo';

interface IProps {
  title: string;
  children?: React.ReactNode;
  style?: ViewStyle;
  showLogo?: boolean;
}

const GenericScreen: React.FC<IProps> = ({
  title,
  children,
  style,
  showLogo,
}) => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={[styles.container, style]}>
        <Text style={styles.title} size={TextSize.TITLE}>
          {title}
        </Text>
        {showLogo ? <Logo /> : null}
        <Spacer height={20} />
        {children}
      </View>
    </SafeAreaView>
  );
};

export default GenericScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingBottom: 10,
    flex: 1,
  },
  title: {
    fontWeight: 'bold',
    textAlign: 'center',
    color: COLORS.button,
  },
});
