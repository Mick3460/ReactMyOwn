import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useEffect } from 'react';
import { Button, FlatList, StyleSheet, Text, TextInput, View } from 'react-native';
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
        <View>
        <Text style={{fontWeight: 'bold', fontSize: 10}}>{item.message.substring(0,12)}</Text>
        <Text style={{fontSize: 14, }}>{item.message}</Text>
        <Text style={{textAlign: 'right', fontSize:8,}}>{checkTime(item)}</Text>
        </View>
    );

    return (
        <View style={styles.container}>
            <Text>Screen 1</Text>
            <Button title="Go to screen 2" onPress={() => navigation.navigate("Screen2")} />
            <Text>{isHappy.toString()}</Text>
            <Button title="Toggle happy" onPress={() => dispatch(toggleHappy())} />
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
            <Button title="Send chat msg" onPress={handleAddChatroom} />
           
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
    theList: {
        backgroundColor: 'lightgrey',
        flex:0,
        width: 300,



    }
})