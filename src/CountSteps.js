import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Pedometer } from 'expo-sensors';

export default function CountSteps() {

  const [isPedometerAvailable, setIsPedometerAvailable] = useState('checking')
  const [currentStepCount, setCurrentStepCount] = useState(0)

  let _subscription

  const _subscribe = () => {
    _subscription = Pedometer.watchStepCount(result => {
      setCurrentStepCount(result.steps)
    })

    Pedometer.isAvailableAsync().then(
      result => {
        setIsPedometerAvailable(result)
      },
      error => {
        setIsPedometerAvailable('Could not get isPedometerAvailable: ' + error)
      }
    )
  }

  const _unsubscribe = () => {
    _subscription && _subscription.remove();
    _subscription = null;
  }

  useEffect(()=>{
    _subscribe();
    return ()=> _unsubscribe();
  },[])

    return (
      <View>
        <Text style={styles.stepsText}>{currentStepCount}</Text>
      </View>
    )
}

const styles = StyleSheet.create({
  stepsText: {
    fontSize: 18
  }
})