import { User } from "../../entities/User";
import { SIGNUP, SIGNIN, LOGOUT } from "../actions/user.actions";

interface ReduxState {
    loggedInUser: User
    validUser: boolean
}

const initialState: ReduxState = {
    loggedInUser: new User("lol@lol.dk",undefined,undefined,"eyJhbGciOiJSUzI1NiIsImtpZCI6ImIwNmExMTkxNThlOGIyODIxNzE0MThhNjdkZWE4Mzc0MGI1ZWU3N2UiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vY2JzZmlyc3RmYiIsImF1ZCI6ImNic2ZpcnN0ZmIiLCJhdXRoX3RpbWUiOjE2NDgwMzM4NzUsInVzZXJfaWQiOiJWcVFodVRmNUdnZzFNUlh5MEI5TjVLekhsNTQzIiwic3ViIjoiVnFRaHVUZjVHZ2cxTVJYeTBCOU41S3pIbDU0MyIsImlhdCI6MTY0ODAzMzg3NSwiZXhwIjoxNjQ4MDM3NDc1LCJlbWFpbCI6ImxvbEBsb2wuZGsiLCJlbWFpbF92ZXJpZmllZCI6ZmFsc2UsImZpcmViYXNlIjp7ImlkZW50aXRpZXMiOnsiZW1haWwiOlsibG9sQGxvbC5kayJdfSwic2lnbl9pbl9wcm92aWRlciI6InBhc3N3b3JkIn19.SUCwj5O13auUCFVNKek4FLi0EszGmco7JCaFNiE68dkzJJTribGzrIJANAJn64nyRUee8s-DO0qRC8G0suZDChwkk-N4BwReyAlZrRA9sFFYNHw1OTuXvafy3kizzMqDedIza6S5NKBTn5j4_fWyiXNm3ObEB4UoU5Nxps-PiY2tMcUl7V29E68aHrUwzHLe4zHI6Fn8O5matRVhYfVa_sVQ8GMltsgczvCPOSK7TttUckRT3DqsvjKD4Y8x4rBDx8xKbSrEmBfab74D_EJngoElT_PJOOWUoL4fPSgZCUa7jcDau5LTvQCNo4DnXsjdxhP-i97RyYH0ZWbkZeH3wg"),
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
            return { ...state, validUser: false }

        default: 
        console.log("Default switch");
        
            return state;
    }
    
};

export default userReducer;