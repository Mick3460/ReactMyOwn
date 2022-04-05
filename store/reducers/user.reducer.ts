import { User } from "../../entities/User";
import { SIGNUP, SIGNIN, LOGOUT } from "../actions/user.actions";
import * as SecureStore from 'expo-secure-store';

interface ReduxState {
    loggedInUser: User
    validUser: boolean
}

const initialState: ReduxState = {
    loggedInUser: new User("lol@lol.dk",undefined,undefined,
    "AIwUaOkCb0_DM6D0plS8W5R-HF7-91M-up4DkwB60zpYgIBbUF0edi9Zwo-0O9TB9d8t2suJhC5zWqcHWrzV0_0rbK3_V5uii0r53Zg67_abBwWsI6IqHgz6cwRSqNHveEE5xVVJ0BF8NHHKPBc0z96F--zM2byTZq-12Zvatp58BT7i5Mgn1v6sJOyFpL5qQP8DRY1Kyekl"),
    validUser: false,
}

interface ReduxAction {
    type: string,
    payload?: boolean | number | string 
}

{
/**
async function save(key: any, value:any) {
    await SecureStore.setItemAsync(key, value);
    console.log(key)
    console.log(value)
  }

async function getValueFor(key:any) {
    let result = await SecureStore.getItemAsync(key);
    if (result) {
        alert("🔐 Here's your value 🔐 \n" + result);
    } else {
        alert('No values stored under that key.');
    }
}
 */
}
const userReducer = async (state: ReduxState = initialState, action: any) => {
    switch (action.type) {
        case SIGNUP:
            const newUser = new User(action.payload.email,undefined,undefined,action.payload.idToken)
            return {...state, loggedInUser: newUser }; //this is wrong and you know it.
        
        case SIGNIN:
            if (action.payload.registered == true){
            const fetchedUser = new User(action.payload.email,undefined,undefined,action.payload.idToken)
            console.log(fetchedUser)
            //save in SecureStorage
            //await save("lol",action.payload.idToken)
            
            return {...state, validUser: true, loggedInUser: fetchedUser}
            
            } else {
                return state
            }

        case LOGOUT:
            console.log("Log out case reached")
            return { ...state, validUser: false, loggedInUser: "", chatrooms: [] }

        default: 
            return state;
    }
    
};

export default userReducer;