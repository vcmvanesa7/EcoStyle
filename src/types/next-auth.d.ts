import NextAuth, { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface User {
    id: string;
    email: string;
    username: string;
    role: "admin" | "user";
  }

  interface Session {
    user: {
      id: string;
      email: string;
      username: string;
      role: "admin" | "user";
    } & DefaultSession["user"];
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    email: string;
    username: string;
    role: "admin" | "user";
  }
}
