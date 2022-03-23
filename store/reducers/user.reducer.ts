import { User } from "../../entities/User";
import { SIGNUP, SIGNIN, LOGOUT } from "../actions/user.actions";

interface ReduxState {
    loggedInUser: User
    validUser: boolean
}

const initialState: ReduxState = {
    loggedInUser: new User("lol@lol.dk",undefined,undefined,"eyJhbGciOiJSUzI1NiIsImtpZCI6ImIwNmExMTkxNThlOGIyODIxNzE0MThhNjdkZWE4Mzc0MGI1ZWU3N2UiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vY2JzZmlyc3RmYiIsImF1ZCI6ImNic2ZpcnN0ZmIiLCJhdXRoX3RpbWUiOjE2NDgwNjAzODcsInVzZXJfaWQiOiJWcVFodVRmNUdnZzFNUlh5MEI5TjVLekhsNTQzIiwic3ViIjoiVnFRaHVUZjVHZ2cxTVJYeTBCOU41S3pIbDU0MyIsImlhdCI6MTY0ODA2MDM4NywiZXhwIjoxNjQ4MDYzOTg3LCJlbWFpbCI6ImxvbEBsb2wuZGsiLCJlbWFpbF92ZXJpZmllZCI6ZmFsc2UsImZpcmViYXNlIjp7ImlkZW50aXRpZXMiOnsiZW1haWwiOlsibG9sQGxvbC5kayJdfSwic2lnbl9pbl9wcm92aWRlciI6InBhc3N3b3JkIn19.J_rCGB92JIOMdXbpyEVJrxJKMi1BbNfT2l5JC7OB9RWwKojAAtPR81vApCuY3rbxArUKmlvEWrDE3o533GCge1eP7ySB2QMcrkm68vRjpwkdxhD4WPFc1oKeyibmYQSMHcCayso3ri9bopVT43kh9vBpk4VToaKmjs3I6zaRNbiGPk8yA9gMMmBtyJDXDMparsMykh55UrqUHSjYtKgN-bB0OiP2OwUmtdT4ESHEsAY4NmHfgiTvz8NbHAo0ilpUzVLxpB4t6J4FtlZLTSgHFeXyGxU9gBF_Yr9stQzc1oQX7RhfTxjr_P3rCXg4Ob67NIg_OA0SRN-ESvgX8g9PkQ"),
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
            return {...state, loggedInUser: newUser }; //this is wrong and you know it.
        
        case SIGNIN:
            if (action.payload.registered == true){
            const fetchedUser = new User(action.payload.email,undefined,undefined,action.payload.idToken)
                return {...state, validUser: true, loggedInUser: fetchedUser}
            
            } else {
                return state
            }

        case LOGOUT:
            console.log("Log out case reached")
            return { ...state, validUser: false, loggedInUser: "" }

        default: 
            return state;
    }
    
};

export default userReducer;