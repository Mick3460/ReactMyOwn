import { User } from "../../entities/User";
import { SIGNUP, SIGNIN, LOGOUT, REHYDRATE_USER } from "../actions/user.actions";
import * as SecureStore from 'expo-secure-store'; //npm install expo-secure-store .. eller noet i den stil

interface ReduxState {
    loggedInUser: User | undefined,
    validUser: boolean,
    idToken: string | undefined,

}

const initialState: ReduxState = {
    loggedInUser: new User("lol@lol.dk",undefined,undefined, "eyJhbGciOiJSUzI1NiIsImtpZCI6IjZhNGY4N2ZmNWQ5M2ZhNmVhMDNlNWM2ZTg4ZWVhMGFjZDJhMjMyYTkiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vY2JzZmlyc3RmYiIsImF1ZCI6ImNic2ZpcnN0ZmIiLCJhdXRoX3RpbWUiOjE2NDkyMzc4NjEsInVzZXJfaWQiOiJWcVFodVRmNUdnZzFNUlh5MEI5TjVLekhsNTQzIiwic3ViIjoiVnFRaHVUZjVHZ2cxTVJYeTBCOU41S3pIbDU0MyIsImlhdCI6MTY0OTIzNzg2MSwiZXhwIjoxNjQ5MjQxNDYxLCJlbWFpbCI6ImxvbEBsb2wuZGsiLCJlbWFpbF92ZXJpZmllZCI6ZmFsc2UsImZpcmViYXNlIjp7ImlkZW50aXRpZXMiOnsiZW1haWwiOlsibG9sQGxvbC5kayJdfSwic2lnbl9pbl9wcm92aWRlciI6InBhc3N3b3JkIn19.qJWTY0FvKpMOq_7yhOJgY0zbtmub-g4iZZbJmfP4TpKU459WCwojfvY4QjQx232ciT4KETI8WLgvV0kkqvwi7DiEXr5FdlORQk_WsSVbKz_wppBR-pzML8UVRti7ksMZ2u6tUPFCPpnGsYZ-2zIAU6mpOyRGAmcklrAj3PiiHT7Fkhpv7pTSC14Lh7pWgOxxuHyKRTYKTTFaoKKi8T2kEfFxZZiVpg7d5WTNhgrSbXW25bRkpZrl0JOEEbl8XujIZuxE55YvBBpoFuu82BHtRjR6g4PncDWFof_SQJMgoB7RT-w9V_VIewB_iamJfNU_1jBJ0qKDcvtKgLxr526Ogw"),
    validUser: false,
    idToken: undefined,
}

interface ReduxAction {
    type: string,
    payload?: boolean | number | string 
}

const userReducer = (state: ReduxState = initialState, action: any) => {
    switch (action.type) {
        case SIGNUP:
            const newUser = new User(action.payload.email,undefined,undefined,action.payload.idToken)
            return {...state, loggedInUser: newUser }; //this is wrong and you know it.
        
        case SIGNIN:
            if (action.payload.registered == true){
            const fetchedUser = action.payload.user
            return {...state, validUser: true, loggedInUser: fetchedUser}
            
            } else {
                return state
            }

        case LOGOUT:
            console.log("Log out case reached")
            return { ...state, validUser: false, loggedInUser: undefined, idtoken: undefined, chatrooms: [] }

        case REHYDRATE_USER:
            return {...state, loggedInUser: action.payload.user, idToken: action.payload.idToken}
        default: 
            return state;
    }
    
};

export default userReducer;