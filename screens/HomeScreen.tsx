import React, { useEffect, useState } from 'react';
import { Button, StyleSheet, Text, TextInput, View, Image, TouchableOpacity } from 'react-native';
import { User } from '../entities/User';
import { useDispatch, useSelector } from 'react-redux';
import { signup, signin } from '../store/actions/user.actions';
import { useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator, NativeStackNavigationProp } from '@react-navigation/native-stack';
import { StackParamList } from '../typings/navigations';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Screen1 from './Screen1';
import Screen2 from './Screen2';
import Screen3 from './Screen3';

type ScreenNavigationType = NativeStackNavigationProp<
    StackParamList,
    "Screen2"
>

export default function HomeScreen() {
    const [text, setText] = useState('')
    const [passwordStr, setPasswordStr] = useState('')
    const [loginText, setLoginText] = useState('')
    const [loginPw, setLoginPw] = useState('')
    const user: User = useSelector((state: any) => state.user.loggedInUser) // subscribe to redux store and select attribute (isHappy)
    const validUser = useSelector((state: any) => state.user.validUser) // subscribe to redux store and select attribute (isHappy)
    const dispatch = useDispatch()
    
    const Stack = createNativeStackNavigator<StackParamList>();
    const Tab = createBottomTabNavigator();
    const navigation = useNavigation<ScreenNavigationType>()

    function test() {
        console.log("FUNCTION CALLED TO FUCKING SWAP PAGE")
    }

   // This code is for it to run for the first time when your component mounts. 
   // Think of it as the previous componentDidMount function
   useEffect(() => {
    test //not really needed here.. But just for another time.
  }, []);

  // This code is for it to run whenever your variable, timerOn, changes
  useEffect(() => {
    if (validUser) {
      test();
      navigation.navigate("Screen1");
    }
  }, [validUser]); // The second parameters are the variables this useEffect is listening to for changes.


    function handleAddUser () {
        const email = text;
        const pw = passwordStr;
        
        dispatch(signup(email,pw));
    }

    function handleSignIn () {
        const email = loginText;
        const pw = loginPw;

        dispatch(signin(email,pw))
        componentDidMount()
    }
 
    function componentDidMount(){
        console.log("TEST FOR AT DET SKER");
    }
   
    return (
        
        <View style={styles.container}>
          
            <View style={styles.leftOuterBox}>
            <Text style={styles.hugeText}>Home Screen</Text>
            
            <Button title="Go to screen 2" onPress={() => navigation.navigate("Screen2")} />
            
            <Text>Below is the current user email and id token:</Text> 
            <Text>{user.email}</Text>
            <Text>{user.idToken}</Text>
            <Text>Is Michael happy? .. {validUser.toString()} {"\n"} {"\n"} {"\n"} {"\n"}</Text>
            <Text>Log in using social networks {"\n"} {"\n"}</Text>
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
        
            <View style={{flexDirection: 'row', alignItems: 'center', width: '30%',paddingTop: '20px'}}>
                <View style={{flex: 1, height: 1, backgroundColor: 'black'}}/> 
                <View>
                    <Text style={{width: 50, textAlign: 'center'}}>or</Text>
                </View>
                <View style={{flex: 1, height: 1, backgroundColor: 'black'}} />
            </View>


            <View style={{paddingTop: 30}}> 
            <TextInput value={loginText} onChangeText={setLoginText} style={styles.textInput} placeholder="Email" />
            <TextInput value={loginPw} secureTextEntry={true} onChangeText={setLoginPw} style={styles.textInput} placeholder="Password" />
            <TouchableOpacity onPress={handleSignIn} style={styles.appButtonContainerLeft}>
                <Text style={styles.appButtonTextLeft}>SIGN IN</Text>
            </TouchableOpacity>
            </View>
            
            </View>
            <View style={styles.rightOuterBox}>
            <View style={styles.allOfSignup}>
            <View><Text style={styles.bigText}>New member? Sign up! </Text> </View>
                <View style={styles.signupBox}>
                    <TextInput value={text} onChangeText={setText} style={styles.textInput} placeholder="Email" />
                    <TextInput value={passwordStr} secureTextEntry={true} onChangeText={setPasswordStr} style={styles.textInput} placeholder="Password" />
                </View>
                
                <TouchableOpacity onPress={handleAddUser} style={styles.appButtonContainerRight}>
                <Text style={styles.appButtonTextRight}>SIGN UP</Text>
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
        flexDirection: 'row',
    },
    
    leftOuterBox: {
        backgroundColor: '#FDE7E2',
        
        width: '70%',
        height: '100%',
        float: 'left',

        alignItems: 'center',
        justifyContent: 'center',

    },
    rightOuterBox: {
        backgroundColor: '#009688',
        
        width: '30%',
        height: '100%',
        float: 'right',

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
    iconsDiv: {
        width: '10%',
        flexDirection:'row',
        alignItems:'center',
        justifyContent: 'space-evenly',

    },

    icon: {

        width: '40px', 
        height: '40px', 
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


