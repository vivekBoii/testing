export type UserInfo = {
    username: string;
    email: string;
    role: "admin" | "user";
};

export type AuthState = {
    jwt: string | null;
    userInfo: UserInfo | null;
    error: string | null;
};