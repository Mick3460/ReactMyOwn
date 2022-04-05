import React, { useEffect, useState } from 'react';
import { Button, StyleSheet, Text, TextInput, View, Image, TouchableOpacity } from 'react-native';
import { User } from '../entities/User';
import { useDispatch, useSelector } from 'react-redux';
import { signin, logout } from '../store/actions/user.actions';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { StackParamList } from '../typings/navigations';

import { logOut } from '../store/actions/chat.actions';

type ScreenNavigationType = NativeStackNavigationProp<
    StackParamList,
    "Screen2"
>

export default function HomeScreen() {
    const [loginText, setLoginText] = useState('')
    const [loginPw, setLoginPw] = useState('')
    const user: User = useSelector((state: any) => state.user.loggedInUser) // subscribe to redux store and select attribute 
    const validUser = useSelector((state: any) => state.user.validUser) // subscribe to redux store and select attribute 
    const isHappy = useSelector((state: any) => state.chat.isHappy) // subscribe to redux store and select attribute (isHappy)
    const dispatch = useDispatch() //useDispatch er en hook :)
    
    //const Stack = createNativeStackNavigator<StackParamList>();
    //const Tab = createBottomTabNavigator();
    const navigation = useNavigation<ScreenNavigationType>()

   // This code is for it to run for the first time when your component mounts. 
   // Think of it as the previous componentDidMount function
    useEffect(() => {
     //not really needed here.. But just for another time.
    }, []);

  // This code is for it to run whenever your variable, timerOn, changes
   useEffect(() => {
        if (validUser) {
        console.log("FUNCTION CALLED TO SWAP PAGE")
        navigation.navigate("Screen1");
        }
    }, [validUser]); // The second parameters are the variables this useEffect is listening to for changes.


    async function handleSignIn () {
        const email = loginText;
        const pw = loginPw;

        dispatch(signin(email,pw))
    }

    function handleLogOut(){
        dispatch(logout()) // user-clearing method
        dispatch(logOut()) // chat-clearing method
    }

    return (
        
    <View style={styles.container}>
        
        <View style={styles.leftOuterBox}>
            <Text style={styles.hugeText}>Home Screen</Text>
            <Text>{user?.email}</Text>
            <Text style={{fontSize: 4, width:300}}>{user?.idToken}</Text>
            <Text>LIGE NU ER DIN BRUGER HARDCODED, LOG IND FØRSTE GANG</Text>
            <Text>Is Michael happy? .. {validUser?.toString()}  </Text>
            <Text>Is Michael happy? .. {isHappy?.toString()}  </Text>
                       
            <Button title="Sign up" onPress={() => navigation.navigate("Screen2" )} />
            
            <Text>Below is the current user email and id token:</Text> 
          
        
        <Text>Log in using social networks</Text>

        {/**IKONER TIL GOOGLE OG FACEBOOK */}
            <View style={styles.iconsDiv}>
                <TouchableOpacity onPress={() => {console.log("FACEBOOK")}}>
                    <Image
                    source={require('../assets/facebook2.png')}
                    style={styles.icon}
                    />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => {console.log("GOOGLE")}}>    
                    <Image
                    source={require('../assets/googleIcon.png')}
                    style={styles.icon}
                    />
                </TouchableOpacity>
            </View>

        {/*OR divider */}
        <View style={{flexDirection: 'row', alignItems: 'center', paddingTop: 20}}>
                <View style={{flex: 1, height: 1, backgroundColor: 'black'}}/> 
                <View><Text style={{width: 50, textAlign: 'center'}}>or</Text></View>
                <View style={{flex: 1, height: 1, backgroundColor: 'black'}} />
        </View>

        {/*Email, Password textfields with sign in and logout buttons */}
        <View style={{paddingTop: 30}}>
            <TextInput value={loginText} onChangeText={setLoginText} style={styles.textInput} placeholder="Email" />
            <TextInput value={loginPw} secureTextEntry={true} onChangeText={setLoginPw} style={styles.textInput} placeholder="Password" />
            <TouchableOpacity onPress={handleSignIn} style={styles.appButtonContainerLeft}>
                    <Text style={styles.appButtonTextLeft}>SIGN IN</Text>
                </TouchableOpacity>
            <Button onPress={handleLogOut} title="log out"/>
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
        flexDirection: 'row',
    },
    
    leftOuterBox: {
        backgroundColor: '#FDE7E2',
        
        width: '100%',
        height: '100%',

        alignItems: 'center',
        justifyContent: 'center',

    },
    rightOuterBox: {
        backgroundColor: '#009688',
        
        width: '30%',
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
        width: 200,

    },

    bigText: {
        fontSize: 20,
        
    },
    hugeText: {
        fontSize: 40,
    },
    iconsDiv: {
        width: '30%',
        flexDirection:'row',
        alignItems:'center',
        justifyContent: 'space-evenly',

    },

    icon: {
        width: 40, 
        height: 40, 
        borderRadius: 20,
    },

    appButtonContainerLeft: {
        elevation: 8,
        backgroundColor: "#009688",
        borderRadius: 10,
        paddingVertical: 10,
        paddingHorizontal: 12
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
      appButtonTextLeft: {
        fontSize: 18,
        color: "#fff",
        fontWeight: "bold",
        alignSelf: "center",
        textTransform: "uppercase"
      }

})


