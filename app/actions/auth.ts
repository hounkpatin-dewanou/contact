"use server";

import axios from "axios";
import { redirect } from "next/navigation";
import { UserType } from "../_types/user";
import { setSession, deleteSession } from "../_lib/session";

const API_URL = "http://localhost:3001";

export type LoginState = {
  error: string | null;
};

export type RegisterState = {
  error: string | null;
};

export const loginAction = async (
  prevState: LoginState,
  formData: FormData
): Promise<LoginState> => {

  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  if (!email || !password) {
    return { error: "Email and password are required." };
  }

  try {
    const response = await axios.get(`${API_URL}/users`, {
      params: { email }
    });

    if (!response.data || response.data.length === 0) {
      return { error: "User not found." };
    }

    const user: UserType = response.data[0];

    if (user.password !== password) {
      return { error: "Invalid password." };
    }

    const { password: _, ...safeUser } = user;
    await setSession(safeUser as UserType);

  } catch (error) {
    console.log(error);
    return { error: "Server error. Try again." };
  }

  redirect("/contact");
};

export const registerAction = async (
  prevState: RegisterState,
  formData: FormData
): Promise<RegisterState> => {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const confirmPassword = formData.get("confirmPassword") as string;
  const name = formData.get("name") as string;

  // Validation
  if (!email || !password || !name) {
    return { error: "Email, name and password are required." };
  }

  if (password !== confirmPassword) {
    return { error: "Passwords do not match." };
  }

  try {
    // Vérifier si user existe déjà
    const checkResponse = await axios.get(`${API_URL}/users`, {
      params: { email }
    });

    if (checkResponse.data && checkResponse.data.length > 0) {
      return { error: "User already exists." };
    }

    // Créer NOUVEL utilisateur (json-server génère l'id)
    const newUser = { name, email, password }; 
    const response = await axios.post(`${API_URL}/users`, newUser);

    // Connexion automatique après register
    const createdUser: UserType = response.data;
    const { password: _, ...safeUser } = createdUser;
    await setSession(safeUser as UserType);

  } catch (error) {
    console.log(error);
    return { error: "Registration failed. Try again." };
  }

  redirect("/contact");
};


export const logoutAction = async () => {
  await deleteSession();
  redirect("/login");
};
