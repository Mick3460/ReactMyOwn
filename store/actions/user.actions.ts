import { FirebaseSignupSuccess } from "../../entities/FirebaseSignupSuccess";

export const SIGNUP = 'SIGNUP';
export const SIGNIN = 'SIGNIN';
export const LOGOUT = 'LOGOUT';


export const logout = () => {
    return {type: LOGOUT}
}

/*
const token = getState().user.token; //if you have a reducer named user (from our combineReducers)
*/

export const signin = (email: string, password: string) => {
    const KEY = "AIzaSyCTlqXA4_sUNQzC7U4NGF2yKyhxOaMPNzA";
    const url = "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key="+KEY;

    return async (dispatch: (arg0: { type: string; payload: any; }) => void) => {
        const response = await fetch(url, {
          //redux Thunk makes it possible to return an async function instead of just an action
          //this way we can make fetches without breaking the redux-flow protocols.
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ //javascript to json
                //key value pairs of data you want to send to server
                // ...
                email, //email: email
                password,
                returnSecureToken: true //returns ID and refresh token. ALWAYS USE TRUE
            })
        });
  
        if (!response.ok) {
            //There was a problem.. error handling time, BUT I WONT LOL
            console.log("response problem. remember valid email and pw with numbers");
            
        } else {
            const data: FirebaseSignupSuccess = await response.json(); // json to javascript
            console.log("Data from the server user.actions:  ", data);
            
            dispatch({type: SIGNIN, payload: {email: data.email, idToken: data.idToken, registered: data.registered}})
        }
    };
 };


export const signup = (email : string, password : string) => {
    const KEY = "AIzaSyCTlqXA4_sUNQzC7U4NGF2yKyhxOaMPNzA"
    const url = "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key="+KEY

   return async (dispatch: (arg0: { type: string; payload: any; }) => void) => {
       const response = await fetch(url, {
        
           method: 'POST',
           headers: {
               'Content-Type': 'application/json'
           },
           body: JSON.stringify({ //javascript to json
               //key value pairs of data you want to send to server
               // ...
               email, //email: email
               password,
               returnSecureToken: true //returns ID and refresh token. ALWAYS USE TRUE
           })
       });
 
       if (!response.ok) {
           //There was a problem.. error handling time, BUT I WONT LOL
           console.log("response problem. remember valid email and pw with numbers");
           
       } else {
           const data: FirebaseSignupSuccess = await response.json(); // json to javascript
           console.log("Data from the server in user.actions: ", data);
           
           dispatch({type: SIGNUP, payload: {email: data.email, idToken: data.idToken}})
       }
   };
};
