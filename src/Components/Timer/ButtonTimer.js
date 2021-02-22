import React from 'react';
import { Button, Text, View, StyleSheet } from 'react-native';

export default function ButtonTimer(props) {
    return (
        <View>
            {(props.status === 0) ?
                <Button
                    title="Start"
                    onPress={props.start} /> : <Text />
            }

            {(props.status === 1) ?
                <View style={styles.container}>
                    <Button
                        title="Stop"
                        onPress={props.stop} />
                    <Button
                        title="Reset"
                        onPress={props.reset} />
                </View> : <Text />
            }

            {(props.status === 2) ?
                <View style={styles.container}>
                    <Button
                        title="Resume"
                        onPress={props.resume} />
                    <Button
                        title="Reset"
                        onPress={props.reset} />
                </View> : <Text />
            }

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    }
})