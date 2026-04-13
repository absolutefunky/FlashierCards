export default interface User {
    id: Int8Array;
    username: string;
    passwordHash: string;
    email: string;
    dateAccountCreated: Date;
}