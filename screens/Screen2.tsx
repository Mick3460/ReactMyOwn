import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function Screen2() {
    return (
        <View style={styles.container}>
            <Text>Hvis du ser det her, så virker din funktion</Text>
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
})  