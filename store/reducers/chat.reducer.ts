import { Chatroom } from "../../entities/Chatroom";
import { ADD_CHATROOM, TOGGLE_HAPPY } from "../actions/chat.actions";

interface ReduxState {
    chatrooms: Chatroom[]
    isHappy: boolean
    counter: number
    name: string
}

const initialState: ReduxState = {
    chatrooms: [],
    isHappy: false,
    counter: 0,
    name: "Peter"
}

interface ReduxAction {
    type: string,
    payload?: boolean | number | string | Chatroom
}

const chatReducer = (state: ReduxState = initialState, action: ReduxAction) => {
    switch (action.type) {
        case TOGGLE_HAPPY:
            console.log("hi");

            return { ...state, isHappy: !state.isHappy }

        case ADD_CHATROOM:
            console.log(action.payload);
            const chatroom = action.payload as Chatroom
            //state.chatrooms.push(chatroom) // mutating state. Not allowed

            return { ...state, chatrooms: [...state.chatrooms, action.payload] as Chatroom[]}


        default:
            return state;
    }
};

export default chatReducer;