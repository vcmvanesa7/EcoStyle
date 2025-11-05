export interface loginProps {
    username?: string;
    email: string,
    password: string;
    role?: "admin" | "user";
    createdAt?: Date;
}
