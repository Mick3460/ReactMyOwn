export class User {
    email: string;
    displayname?: string; // ? definerer, at den er optional.
    photoUrl?: string;
    idToken?: string;
    user: any;

    constructor(email: string, displayname?: string, photoUrl?: string, idToken?: string) {
        this.email = email;
        this.displayname = displayname;
        this.photoUrl = photoUrl;
        this.idToken = idToken;

    }
}