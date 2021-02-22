import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Pedometer } from 'expo-sensors';

import ButtonTimer from './Timer/ButtonTimer';
import DisplayTimer from './Timer/DisplayTimer';

export default function CountSteps() {

  const [time, setTime] = useState({ ms: 0, s: 50, m: 59, h: 0 })
  const [interv, setInterv] = useState()
  const [status, setStatus] = useState(0)
  // Not started = 0
  // started = 1
  // stop = 2

  const [isPedometerAvailable, setIsPedometerAvailable] = useState('checking')
  const [currentStepCount, setCurrentStepCount] = useState(0)

  let _subscription

  const start = () => {
    runTimer()
    setStatus(1)
    setInterv(setInterval(runTimer, 10))
  }

  const stop = () => {
    clearInterval(interv)
    setStatus(2)
  }

  const reset = () => {
    clearInterval(interv)
    setStatus(0)
    setTime({ ms: 0, s: 0, m: 0, h: 0 })
  }

  const resume = () => start()

  var updateMs = time.ms, updateS = time.s, updateM = time.m, updateH = time.h

  const runTimer = () => {
    if (updateM === 60) {
      updateH++
      updateM = 0
    }
    if (updateS === 60) {
      updateM++
      updateS = 0
    }
    if (updateMs === 99) {
      updateS++
      updateMs = 0
    }
    updateMs++
    return setTime({ ms: updateMs, s: updateS, m: updateM, h: updateH })
  }

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

  useEffect(() => {
    _subscribe();
    return () => _unsubscribe();
  }, [])

  return (
    <View>
      <Text style={styles.stepsText}>{currentStepCount}</Text>
      <View>
        <DisplayTimer time={time} />
        <ButtonTimer start={start} status={status} stop={stop} reset={reset} resume={resume}/>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  stepsText: {
    fontSize: 18
  }
})