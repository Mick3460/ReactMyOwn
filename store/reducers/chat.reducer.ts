import { Chatroom } from "../../entities/Chatroom";
import { ADD_CHATROOM, FETCHCHAT, TOGGLE_HAPPY, LOGOUT } from "../actions/chat.actions";

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
            return { ...state, isHappy: !state.isHappy }

        case ADD_CHATROOM:
            const chatroom = action.payload as Chatroom
            return { ...state, chatrooms: [...state.chatrooms, action.payload] as Chatroom[]}

        case FETCHCHAT:
            return {...state, chatrooms: action.payload }

        case LOGOUT:
            return {...state, chatrooms: []}
        default:
            return state;
    }
};

export default chatReducer;