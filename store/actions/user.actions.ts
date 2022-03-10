
export const SIGNUP = 'SIGNUP';
export const SIGNIN = 'SIGNIN';
 

export const signin = (email: string, password: string) => {
    const KEY = "AIzaSyCTlqXA4_sUNQzC7U4NGF2yKyhxOaMPNzA";
    const url = "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key="+KEY;

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
            const data = await response.json(); // json to javascript
            console.log("Data from the server ", data);
            
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
           const data = await response.json(); // json to javascript
           console.log("Data from the server ", data);
           
           dispatch({type: SIGNUP, payload: {email: data.email, idToken: data.idToken}})
       }
   };
};
