import { createContext, Dispatch, SetStateAction, useContext } from "react";
import { Company, User, UserRole } from "@prisma/client";
import { User as SupabaseUser } from "@supabase/supabase-js";
import axios from "axios";

import { supabase } from "config/supabase";

export enum AuthProviders {
  LinkedIn = "LinkedIn",
  Google = "Google",
}

export const authContext = createContext<{
  user: (User & { company?: Company }) | null;
  setUser: Dispatch<SetStateAction<User | null>>;
}>({
  user: null,
  setUser: () => null,
});

export const useAuth = () => {
  return useContext(authContext);
};

export const AuthProvider = authContext.Provider;

export default class UserService {
  public static async createSignedUpUser(user: SupabaseUser, role: UserRole) {
    const { data } = await axios.post<User>("/api/users", {
      id: user.id,
      role,
      username: user?.user_metadata.full_name,
      avatarURL: user?.user_metadata.avatar_url,
    });

    return data;
  }

  public static async getUserById(id: string) {
    const { data } = await axios.get<User>(`/api/users/${id}`);

    return data;
  }

  public static async updateUser(id: string, user: Partial<User>) {
    const { data } = await axios.patch<User>(`/api/users/${id}`, user);

    return data;
  }

  public static async signInWithLinkedIn(
    signsUp: boolean = false,
    role?: UserRole
  ) {
    const { protocol, host } = window.location;

    const redirectTo = `${protocol}//${host}${
      signsUp ? `/auth/sign-up-redirect?role=${role}` : ""
    }`;

    const { user, session, error } = await supabase.auth.signIn(
      {
        provider: "linkedin",
      },
      {
        redirectTo: redirectTo,
      }
    );

    return { user, session, error };
  }

  static getAuthedUser() {
    return supabase.auth.user();
  }

  static async logOut() {
    await supabase.auth.signOut();
  }
}
