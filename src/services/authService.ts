import axios from "axios";
import { signIn } from "next-auth/react";

interface RegisterData {
  username: string;
  email: string;
  password: string;
}

interface LoginData {
  email: string;
  password: string;
}

//normal register whit my api register 
export const registerUser = async (data: RegisterData) => {
  const response = await axios.post("/api/register", data);
  return response.data;
};

// Login with NextAuth credentials
export const loginUser = async (data: LoginData) => {
  const response = await signIn("credentials", {
    redirect: false, // Prevent NextAuth from performing automatic redirects.
    email: data.email,
    password: data.password,
  });

  return response;
};
