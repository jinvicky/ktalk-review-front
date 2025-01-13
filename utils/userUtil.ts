export const chatFromMe = (senderEmail: string) => {
    const userFromLocal = localStorage.getItem("user");

    if (!userFromLocal) return "";

    const { email } = JSON.parse(userFromLocal) as {
        email: string;
        nickname: string;
    };
    return senderEmail === email;
};

export const initUser = ({
    email,
    nickname,
}: {
    email: string;
    nickname: string;
}) => {
    localStorage.setItem("user", JSON.stringify({ email, nickname }));
};

export const getUser = () => {
    const userFromLocal = localStorage.getItem("user");

    if (!userFromLocal) return null;

    return JSON.parse(userFromLocal) as { email: string; nickname: string };
};
