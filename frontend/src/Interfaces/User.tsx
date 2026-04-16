export default interface User {
    id: Int8Array;
    email: string;
    passwordHash: string;
    sqAnswer: string;
    dateAccountCreated: Date;
    totalDecks: number;
}