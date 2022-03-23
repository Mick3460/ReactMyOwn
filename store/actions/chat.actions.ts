import { Chatroom } from "../../entities/Chatroom";
import { User } from "../../entities/User";

export const TOGGLE_HAPPY = 'TOGGLE_HAPPY';
export const ADD_CHATROOM = 'ADD_CHATROOM';

export const toggleHappy = () => {
    return { type: TOGGLE_HAPPY };
};

export const addChatroom = (chatroom: Chatroom, user: User) => {
    // indsæt getState: any i dispatchen for at få den næste kommentar til at være valid
     return async (dispatch: (arg0: { type: string; payload: any;}) => void) => {
        //const tooken = getState().user.idToken; KUNNE BRUGES ISTEDET FOR AT SENDE USER MED VIDERE.
        const KEY = user.idToken;
        console.log("key: ", KEY)
        const url = "https://cbsfirstfb-default-rtdb.europe-west1.firebasedatabase.app/chatrooms.json?auth="+KEY;
        
        const response = await fetch(url, {
            //redux Thunk makes it possible to return an async function instead of just an action
            //this way we can make fetches without breaking the redux-flow protocols.
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ //javascript to json
                //key value pairs of data you want to send to server
                
                ...chatroom
            })
        });
    
        if (!response.ok) {
            //There was a problem.. error handling time, BUT I WONT LOL
            console.log(" response isnt OK :) chat.action");
            
        } else {
            const data = await response.json(); // json to javascript
            console.log("Data from the server ", data);
            chatroom.id=data.name

            /* KODE TIL FETCH AF CHATROOMS..
            let chatrooms = []
            for (const key in data){
                let dataKey = data[key];
                console.log(dataKey.name)
                chatrooms.push(new Chatroom(dataKey.title, dataKey.status OSV OSV OSV)
            }
            */

            dispatch({type: ADD_CHATROOM, payload: chatroom })
        }
    };
    };
