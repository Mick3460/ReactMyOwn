import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React from 'react';
import { Button, FlatList, StyleSheet, Text, TextInput, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Chatroom, Status } from '../entities/Chatroom';
import { addChatroom, toggleHappy } from '../store/actions/chat.actions';
import { StackParamList } from "../typings/navigations";

type ScreenNavigationType = NativeStackNavigationProp<
    StackParamList,
    "Screen1"
>

export default function Screen1() {
    const navigation = useNavigation<ScreenNavigationType>()
    const [title, onChangeTitle] = React.useState('');
    
    const user = useSelector( (state:any) => state.user.loggedInUser )
    const isHappy = useSelector((state: any) => state.chat.isHappy) // subscribe to redux store and select attribute (isHappy)
    const chatrooms: Chatroom[] = useSelector((state: any) => state.chat.chatrooms)

    const dispatch = useDispatch()

    const handleAddChatroom = () => {
        const chatroom: Chatroom = new Chatroom(title.substring(0,12), Status.UNREAD, title, new Date());
        dispatch(addChatroom(chatroom,user));
    }

    const renderChatroom = ({ item }: { item: any }) => (
        <Text>{item.title}</Text>
    );

    return (
        <View style={styles.container}>
            <Text>Screen 1</Text>
            <Button title="Go to screen 2" onPress={() => navigation.navigate("Screen2")} />
            <Text>{isHappy.toString()}</Text>
            <Button title="Toggle happy" onPress={() => dispatch(toggleHappy())} />
            <Text>user id token er: </Text>
            <Text>{user.idToken} </Text>

            <FlatList
                data={chatrooms}
                renderItem={renderChatroom}
                //keyExtractor={item => item.id} // chatroom titles must be unique when I do this.
            />

            <TextInput
                onChangeText={onChangeTitle}
                value={title}
                placeholder="Chatroom name"
            />
            <Button title="Create chatroom" onPress={handleAddChatroom} />
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