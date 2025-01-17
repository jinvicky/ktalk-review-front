
export interface User {
    mngNo: number; 
    nickname: string; 
    email: string; 
    pwd: string; 
    rgtrDt: Date;  
    role: string; 
}

export type UserSignIn = Pick<User, 'email' | 'pwd'>;
