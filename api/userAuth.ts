import { UserSignIn, UserSignUp } from "@/types/userType";

export const signIn = async (form: UserSignIn) => {
    const resp = await fetch(process.env.NEXT_DOMAIN_URL + "/api/user/sign/in", {
        method: 'POST',
        body: JSON.stringify(form),
        headers: {
            'Content-Type': 'application/json'
        }
    });

    return await resp.json();
}

export const signUp = async (form: UserSignUp) => {
    const resp = await fetch(process.env.NEXT_DOMAIN_URL + "/api/user/sign/up", {
        method: 'POST',
        body: JSON.stringify(form),
        headers: {
            'Content-Type': 'application/json'
        }
    });

    return await resp.json();
}

export const signOut = async (userSession: string) => {
    const resp = await fetch(process.env.NEXT_DOMAIN_URL + "/api/user/sign/out", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json', 
            'userSession': userSession
        }
    });

    return await resp.json();
}