import { User } from "../../entities/User";
import { SIGNUP, SIGNIN, LOGOUT } from "../actions/user.actions";
import * as SecureStore from 'expo-secure-store';

interface ReduxState {
    loggedInUser: User
    validUser: boolean
}

const initialState: ReduxState = {
    loggedInUser: new User("lol@lol.dk",undefined,undefined,"eyJhbGciOiJSUzI1NiIsImtpZCI6IjQ2NDExN2FjMzk2YmM3MWM4YzU5ZmI1MTlmMDEzZTJiNWJiNmM2ZTEiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vY2JzZmlyc3RmYiIsImF1ZCI6ImNic2ZpcnN0ZmIiLCJhdXRoX3RpbWUiOjE2NDg2MjU1OTcsInVzZXJfaWQiOiI3Y0dOa1ZYV1FtWFFWOUpsVDlROWQ0VDR1MG4xIiwic3ViIjoiN2NHTmtWWFdRbVhRVjlKbFQ5UTlkNFQ0dTBuMSIsImlhdCI6MTY0ODYyNTU5NywiZXhwIjoxNjQ4NjI5MTk3LCJlbWFpbCI6ImRhZ3RvQGxvbC5kayIsImVtYWlsX3ZlcmlmaWVkIjpmYWxzZSwiZmlyZWJhc2UiOnsiaWRlbnRpdGllcyI6eyJlbWFpbCI6WyJkYWd0b0Bsb2wuZGsiXX0sInNpZ25faW5fcHJvdmlkZXIiOiJwYXNzd29yZCJ9fQ.VpKvPQbtEJX4pkBn9bk1txzNwDcwMPWuPY3KIqoqVMqYprINo0-Vatq61J8csGirVf3pS6B38hMm0deChm9vLsUo0DG_uJXjS0z3CbGsPMKD_-pedelaQQkbfRZxrsfL8anu46Z_Nr3KefPEuaowJXajBmT6OpJjqRJtLuSEHMxT7s-_MgL2lWmMHSRFkESyWo12vhT9S4IXCDZ3xmpDyF53_zPzx2mwfdrhZ-x_BIgen6qy-8ObPGmvsK-aK7gFMUZziJXcFNmU59L7p83axr1HgIrF9kZjkefiKH3dA0dWf6ZhusxI9RBTXrmEqX7yqVtW_xWsgCFM5nbzAl2mQQ"),
    validUser: false,
}

interface ReduxAction {
    type: string,
    payload?: boolean | number | string 
}

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

const userReducer = async (state: ReduxState = initialState, action: any) => {
    switch (action.type) {
        case SIGNUP:
            const newUser = new User(action.payload.email,undefined,undefined,action.payload.idToken)
            return {...state, loggedInUser: newUser }; //this is wrong and you know it.
        
        case SIGNIN:
            if (action.payload.registered == true){
            const fetchedUser = new User(action.payload.email,undefined,undefined,action.payload.idToken)

            //save in SecureStorage
            await save("lol",action.payload.idToken)


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