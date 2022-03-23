export class FirebaseSignupSuccess {
    constructor(public idToken: string, public email: string, 
        public emailToken: string, public expiresIn: string, 
        public localId: string, public registered: boolean) {}


}