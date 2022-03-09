import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { Button, FlatList, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { Todo } from '../entities/Todo';

export default function TodoScreen() {
    const [id, setId] = useState(Number)
    const [text, setText] = useState('')
    const [todos, setTodos] = useState([] as Todo[])

    const Item = ({ item }: { item: Todo }) => {
        return (
            <TouchableOpacity style={styles.item} onPress={() => deleteTodo(new Todo(item.id, item.title))}>
                <Text style={styles.title}>{item.title}</Text>
                {/* <Button title="Delete me" onPress={() => deleteTodo(new Todo(id, title))} /> */}
            </TouchableOpacity>
        )
    }

    const renderItem = ({ item }: { item: Todo }) => (
        <Item item={item} />
    );

    const deleteTodo = (item: Todo) => {
        console.log(item);
        setTodos((todos: Todo[]) => {
            return [...todos.filter(x => x.id !== item.id)]
        })

    }

    const handleAddTodo = () => {
        setId(id + 1)
        console.log(id);

        const todo = new Todo(Math.random(), text)
        setTodos((todos: Todo[]) => [...todos, todo])
    }

    return (
        <View style={styles.container}>
            <Text>Open up App.tsx to start working on your app!</Text>
            <Text>Anton and Anne is hopefully happy today since he is learning React Native</Text>
            <TextInput value={text} onChangeText={setText} style={styles.textInput} />
            <Button title="Add todo" onPress={handleAddTodo} />

            <FlatList
                data={todos}
                renderItem={renderItem}
            />

            <StatusBar style="auto" />
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
    item: {
        backgroundColor: '#f9c2ff',
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 16,
    },
    title: {
        fontSize: 32,
    },
});
