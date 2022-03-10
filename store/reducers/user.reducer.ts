import { User } from "../../entities/User";
import { SIGNUP, SIGNIN } from "../actions/user.actions";

interface ReduxState {
    loggedInUser: User
    validUser: boolean
}

const initialState: ReduxState = {
    loggedInUser: new User("legit@email.dk",undefined,undefined,"KEEEEYdsdsads"),
    validUser: false,
}

interface ReduxAction {
    type: string,
    payload?: boolean | number | string 
}

const userReducer = (state: ReduxState = initialState, action: any) => {
    switch (action.type) {
        case SIGNUP:
            const newUser = new User(action.payload.email,undefined,undefined,action.payload.idToken)
            console.log(newUser);
            console.log(state);

            return {...state, loggedInUser: newUser };
        
        case SIGNIN:
            if (action.payload.registered == true){
            const fetchedUser = new User(action.payload.email,undefined,undefined,action.payload.idToken)
                return {...state, tilted: true, loggedInUser: fetchedUser}
            } else {
                return state
            }

        default: 
        console.log("Default switch");
        
            return state;
    }
    
};

export default userReducer;