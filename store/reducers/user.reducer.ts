import { User } from "../../entities/User";
import { SIGNUP, SIGNIN, LOGOUT } from "../actions/user.actions";

interface ReduxState {
    loggedInUser: User
    validUser: boolean
}

const initialState: ReduxState = {
    loggedInUser: new User("lol@lol.dk",undefined,undefined,"eyJhbGciOiJSUzI1NiIsImtpZCI6ImIwNmExMTkxNThlOGIyODIxNzE0MThhNjdkZWE4Mzc0MGI1ZWU3N2UiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vY2JzZmlyc3RmYiIsImF1ZCI6ImNic2ZpcnN0ZmIiLCJhdXRoX3RpbWUiOjE2NDgwNTYzOTUsInVzZXJfaWQiOiJWcVFodVRmNUdnZzFNUlh5MEI5TjVLekhsNTQzIiwic3ViIjoiVnFRaHVUZjVHZ2cxTVJYeTBCOU41S3pIbDU0MyIsImlhdCI6MTY0ODA1NjM5NSwiZXhwIjoxNjQ4MDU5OTk1LCJlbWFpbCI6ImxvbEBsb2wuZGsiLCJlbWFpbF92ZXJpZmllZCI6ZmFsc2UsImZpcmViYXNlIjp7ImlkZW50aXRpZXMiOnsiZW1haWwiOlsibG9sQGxvbC5kayJdfSwic2lnbl9pbl9wcm92aWRlciI6InBhc3N3b3JkIn19.Wa6FFgXWzzCec1RwsfpZMTEHV_bty3name9IOqOkKfbbJ0NaBC5EyPhjtjx-ExXQRec-uvjaZKOP05t871UiW929hfL-sltslA09XlATL-PpSpvy1PtZJbqjEwuKvKb-k6ei10fUdIKwdP4ljlsDqMG_3R2z7uShjtmGCjQR7PQ-DSB8_4_t11BYxSk7_3l3BPu3MHjOZsaWaB7d2RgQLQmh90nJCnAVSesjhF6jNOQfPbgB9x5GUlzVG-iqwHFGA52wWHhN9Ppn4eAPViRjaVwr4Cg-XWA7QGEJn3ciTJl9K7wZDsFGv9HIiutS8FXJcCdTVVkor9n71mFFdgdXoQ"),
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