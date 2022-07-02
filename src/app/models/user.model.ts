export interface User {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    userName: string;
    dateStarted: string;
    passwordHash: string;
    passwordSalt: string;
    passwordResetToken: string;
    passwordTokenExpires: Date;
    sex: string;
    role: string;
    numberOfRequests: number;
}