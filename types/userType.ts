
export interface User {
    mngNo: number; 
    nickname: string; 
    email: string; 
    pwd: string; 
    rgtrDt: Date;  
    role: string; 
}

export type UserSignIn = Pick<User, 'email' | 'pwd'>;

export interface UserSignUp {
    nickname: string;
    email: string;
    pwd: string;
    phoneNumber: string;
    notifyYn: string;
    notifyMethod: string;
}

export type UserSessonObj = Pick<User, 'nickname' | 'email' | 'role'>;

