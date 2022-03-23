export class Chatroom {
    constructor(public title: string, public status: Status,
        public message: string, public timestamp: Date,public id?: string) { }
}

export enum Status {
    READ = "READ", UNREAD = "UNREAD"
}