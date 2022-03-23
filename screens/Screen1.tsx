import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useEffect } from 'react';
import { Button, FlatList, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Chatroom, Status } from '../entities/Chatroom';
import { addChatroom, fetchChatroom, toggleHappy } from '../store/actions/chat.actions';
import { StackParamList } from "../typings/navigations";

type ScreenNavigationType = NativeStackNavigationProp<
    StackParamList,
    "Screen1"
>

export default function Screen1() {
    const navigation = useNavigation<ScreenNavigationType>()
    const [message, onChangeMessage] = React.useState('');
    
    const user = useSelector( (state:any) => state.user.loggedInUser )
    const isHappy = useSelector((state: any) => state.chat.isHappy) // subscribe to redux store and select attribute (isHappy)
    const chatrooms: Chatroom[] = useSelector((state: any) => state.chat.chatrooms)
    let toggleClass = false;

   // This code is for it to run for the first time when your component mounts. 
   // Think of it as the previous componentDidMount function
    useEffect(() => { 
        handleFetchChatroom()
        console.log("at launch")
    }, [] );

    // This code is for it to run whenever your variable, timerOn, changes
    useEffect(() => {
    if (chatrooms) {
    console.log("Update chatrooms useEffect() ")
    }
    }, [chatrooms]); // The second parameters are the variables this useEffect is listening to for changes.


    const dispatch = useDispatch()

    const handleAddChatroom = () => {
        const chatroom: Chatroom = new Chatroom(message.substring(0,12), Status.UNREAD, message, new Date());
        dispatch(addChatroom(chatroom,user));
    }

    const handleFetchChatroom = () => {
        console.log("test")
        dispatch(fetchChatroom(user))
    }

    const checkTime = (item: Chatroom) => {

        if (item.timestamp == null)
        return new Date().toString();
        if (item.timestamp != null)
        return item.timestamp.toString();
        else
        return new Date().toString();
    }

    const renderChatroom = ({ item }: { item: Chatroom }) => (
        <View style={toggleClass ? styles.leftChatBox : styles.rightChatBox}>
            <Text style={{fontWeight: 'bold', fontSize: 10}}>    {item.message.substring(0,12)}    </Text>
            <Text style={{fontSize: 14, }}> {item.message} </Text>
            <Text style={{textAlign: 'right', fontSize:8,}}>    {checkTime(item)}     </Text>
            {toggleClass = !toggleClass}
        </View>
    );

    return (
        <View style={styles.container}>
            <Text>user id token er: </Text>
            <Text style={{fontSize: 4, width:300}}>{user.idToken} </Text>

            <FlatList
                style={styles.theList}
                data={chatrooms}
                renderItem={renderChatroom}
                //keyExtractor={item => item.id} // chatroom titles must be unique when I do this.
            />

            <TextInput
                style={{width:300, borderWidth:2, borderColor: 'green',   }}
                onChangeText={onChangeMessage}
                value={message}
                placeholder="Enter message..."
            />
            
            <TouchableOpacity onPress={handleAddChatroom} style={styles.appButtonContainerLeft}>
                <Text style={styles.appButtonTextLeft}>Send message</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    //<Button title="Send chat msg" onPress={handleAddChatroom} />
    //<Button title="Go to screen 2" onPress={() => navigation.navigate("Screen2")} />
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    theList: {
        backgroundColor: 'lightgrey',
        width: 300,
    },
    leftChatBox: {
        borderWidth: 2, borderColor: 'lightblue', borderRadius: 20, 
        backgroundColor: 'lightblue', width:200, margin: 5,
    },
    rightChatBox: {
        borderWidth: 2, borderColor: 'lightgreen', alignItems: 'flex-end', borderRadius: 20,
        backgroundColor: 'lightgreen', width:200, alignSelf: 'flex-end',margin: 5,
    },
    appButtonTextLeft: {
        fontSize: 18,
        color: "#fff",
        fontWeight: "bold",
        alignSelf: "center",
        textTransform: "uppercase"
      },
      appButtonContainerLeft: {
        elevation: 8,
        backgroundColor: "#009688",
        borderRadius: 10,
        paddingVertical: 10,
        paddingHorizontal: 12
      },


})