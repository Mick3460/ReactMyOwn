import { Chatroom } from "../../entities/Chatroom";

export const TOGGLE_HAPPY = 'TOGGLE_HAPPY';
export const ADD_CHATROOM = 'ADD_CHATROOM';

export const toggleHappy = () => {
    return { type: TOGGLE_HAPPY };
};

export const addChatroom = (chatroom: Chatroom) => {
    return { type: 'ADD_CHATROOM', payload: chatroom }
}