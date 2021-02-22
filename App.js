import React from 'react'
import { StyleSheet, View } from 'react-native'
import CountSteps from './src/Components/CountSteps'

export default function App() {
  return (
    <View style={styles.container}>
      <CountSteps/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
