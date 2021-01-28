import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Pedometer } from 'expo-sensors';

export default class CountSteps extends React.Component {
  state = {
    isPedometerAvailable: 'checking',
    currentStepCount: 0,
  }

  componentDidMount() {
    this._subscribe()
  }

  componentWillUnmount() {
    this._unsubscribe()
  }

  _subscribe = () => {
    this._subscription = Pedometer.watchStepCount(result => {
      this.setState({
        currentStepCount: result.steps,
      })
    })

    Pedometer.isAvailableAsync().then(
      result => {
        this.setState({
          isPedometerAvailable: String(result),
        })
      },
      error => {
        this.setState({
          isPedometerAvailable: 'Could not get isPedometerAvailable: ' + error,
        })
      }
    )
  }

  _unsubscribe = () => {
    this._subscription && this._subscription.remove();
    this._subscription = null;
  }

  render() {
    return (
      <View>
        <Text style={styles.stepsText}>{this.state.currentStepCount}</Text>
      </View>
    )
  }
}

const styles=StyleSheet.create({
  stepsText:{
    fontSize:18
  }
})