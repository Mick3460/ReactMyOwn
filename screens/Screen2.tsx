import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useDispatch } from 'react-redux';
import { signup } from '../store/actions/user.actions';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { StackParamList } from '../typings/navigations';

export default function Screen2() {

    type ScreenNavigationType = NativeStackNavigationProp<
    StackParamList,"Homescreen" >
    const [text, setText] = useState('')
    const [passwordStr, setPasswordStr] = useState('')
    const dispatch = useDispatch() //useDispatch er en hook :)
    const navigation = useNavigation<ScreenNavigationType>()
    
    function handleAddUser () {
        const email = text;
        const pw = passwordStr;
        
        dispatch(signup(email,pw));
        navigation.navigate("Homescreen")
    }
    return (
        <View style={styles.container}>
            
            <View style={styles.rightOuterBox}>
                <View style={styles.allOfSignup}>
                    <View>
                    <Text style={styles.bigText}> New member? Sign up! </Text>
                    </View>
                <View style={styles.signupBox}>
                    <TextInput value={text} onChangeText={setText} style={styles.textInput} placeholder="Email" />
                    <TextInput value={passwordStr} secureTextEntry={true} onChangeText={setPasswordStr} style={styles.textInput} placeholder="Password" />
                </View>
                
                <TouchableOpacity onPress={handleAddUser} style={styles.appButtonContainerRight}>
                <Text style={styles.appButtonTextRight}> SIGN UP </Text>
                </TouchableOpacity>
                </View>
            </View>

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

    rightOuterBox: {
        backgroundColor: '#009688',
        
        width: '100%',
        height: '100%',

        alignItems: 'center',
        justifyContent: 'center',
    },
    allOfSignup: {
        height: '50%',
        justifyContent: 'center',
        alignItems: 'center',
        

    },

    signupBox: {
        height: '30%',
        justifyContent: 'center',
        paddingTop: 0,
        paddingBottom: 20,
        
    },

    textInput: {
        borderColor: '#000',
        borderWidth: 1,
        textAlign: 'center',
        backgroundColor: '#fff',
        padding: 2,
        margin: 1,
        marginBottom: 3,
    },

    bigText: {
        fontSize: 20,
        
    },
    hugeText: {
        fontSize: 40,
    },
    appButtonContainerRight: {
        elevation: 8,
        backgroundColor: "#FDE7E2",
        borderRadius: 10,
        paddingVertical: 10,
        paddingHorizontal: 12
      },

      appButtonTextRight: {
        fontSize: 18,
        color: "black",
        fontWeight: "bold",
        alignSelf: "center",
        textTransform: "uppercase"
      },

})  