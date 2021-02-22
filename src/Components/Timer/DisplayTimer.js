import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function DisplayTimer(props) {
    const hoursShow = () => {
        if (props.time.h === 0) {
            return <Text />
        } else {
            return <Text style={styles.text}>
                {(props.time.h) >= 10 ? props.time.h : "0" + props.time.h}<Text style={styles.text}>:</Text>
                </Text>
        }
    }
    return (
        <View style={styles.container}>
            {hoursShow()}
            <Text style={styles.text}>
                {(props.time.m) >= 10 ? props.time.m : "0" + props.time.m}
            </Text>
            <Text style={styles.text}>:</Text>

            <Text style={styles.text}>
                {(props.time.s) >= 10 ? props.time.s : "0" + props.time.s}
            </Text>
            <Text style={styles.text}>:</Text>

            <Text style={styles.text}>
                {(props.time.ms) >= 10 ? props.time.ms : "0" + props.time.ms}
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
    },
    text: {
        fontSize: 18,
    }
})