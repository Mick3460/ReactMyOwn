import { User } from "../../entities/User";
import { SIGNUP } from "../actions/user.actions";

interface ReduxState {
    loggedInUser: User
    tilted: boolean
}

const initialState: ReduxState = {
    loggedInUser: new User("lol@lololol.dk"),
    tilted: true,
}

interface ReduxAction {
    type: string,
    payload?: boolean | number | string 
}

const userReducer = (state: ReduxState = initialState, action: any) => {
    switch (action.type) {
        case SIGNUP:
            const newUser = new User(action.payload.email,undefined,undefined,undefined)
            console.log(newUser);
            console.log(state);
            
            
            
            return {...state, tilted: !state.tilted, loggedInUser: newUser };
            
        default: 
        console.log("Default switch");
        
            return state;
    }
    
};

export default userReducer;