import React, { useState } from 'react';
import { Button, StyleSheet, Text, TextInput, View } from 'react-native';
import { User } from '../entities/User';
import { useDispatch, useSelector } from 'react-redux';
import { signup } from '../store/actions/user.actions';


export default function HomeScreen() {
    const [text, setText] = useState('')
    const [passwordStr, setPasswordStr] = useState('')
    const dispatch = useDispatch()

    const user: User = useSelector((state: any) => state.user.loggedInUser) // subscribe to redux store and select attribute (isHappy)
    const isHappy = useSelector((state: any) => state.user.tilted) // subscribe to redux store and select attribute (isHappy)
    

    function handleAddUser () {
        const email = text;
        const pw = passwordStr;
        
        dispatch(signup(email,pw));
    }
 
    return (
        <View style={styles.container}>
            <Text>Home Screen</Text>
            <Text>fsdfdsf</Text> 
            <Text>{user.email}</Text>
            <Text>{user.idToken}</Text>
            <Text>{isHappy.toString()}</Text>
            <Text>dsd</Text>
            <TextInput value={text} onChangeText={setText} style={styles.textInput} placeholder="Email" />
            <TextInput value={passwordStr} onChangeText={setPasswordStr} style={styles.textInput} placeholder="Password" />
            <Button title="Add User" onPress={handleAddUser} />

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
    textInput: {
        borderColor: '#000',
        borderWidth: 1
    },
})


