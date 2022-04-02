import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
} from "react";
import { Company, User, UserRole } from "@prisma/client";
import {
  AuthChangeEvent,
  Session,
  User as SupabaseUser,
} from "@supabase/supabase-js";

import { supabase } from "config/supabase";
import axios from "config/axios";

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

export const useAuthListener = () => {
  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        await UserService.handleAuthChange(event, session);
      }
    );

    return () => {
      authListener?.unsubscribe();
    };
  }, []);
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

  public static async handleAuthChange(
    event: AuthChangeEvent,
    session: Session | null
  ) {
    await fetch("/api/auth", {
      method: "POST",
      headers: new Headers({ "Content-Type": "application/json" }),
      credentials: "same-origin",
      body: JSON.stringify({ event, session }),
    });
  }

  /**
   * @description
   * This function returns the authed user from Supabase with no details other than the basic profile.
   * It should only be used once - in the auth checking useEffect in `_app.ts`.
   * To get the authed user use the `useAuth` hook from `services/User` instead.
   */
  static getAuthedUser() {
    return supabase.auth.user();
  }

  static async logOut() {
    await supabase.auth.signOut();
  }
}
