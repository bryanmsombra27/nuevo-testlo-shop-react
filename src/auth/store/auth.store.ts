import type { User } from "@/interfaces/user.interface";
import { create } from "zustand";
import { loginAction } from "../actions/login.action";
import { checkAuthAction } from "../actions/check-auth.action";

type AuthStatus = "authenticated" | "not-authenticated" | "checking";

interface InitialState {
  user: User | null;
  token: string | null;
  authStatus: AuthStatus;
}

interface Actions {
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  checkAuthStatus: () => Promise<boolean>;
  isAdmin: () => boolean;
}

type State = InitialState & Actions;

export const useAuthStore = create<State>()((set, get) => ({
  token: null,
  user: null,
  authStatus: "checking",
  login: async (email: string, password: string) => {
    try {
      const data = await loginAction({ email, password });
      localStorage.setItem("token", data.token);

      set({
        user: data.user,
        token: data.token,
        authStatus: "authenticated",
      });
      return true;
    } catch (error) {
      set({
        user: null,
        token: null,
        authStatus: "not-authenticated",
      });
      localStorage.removeItem("token");
      return false;
    }
  },
  logout: () => {
    localStorage.removeItem("token");
    set({ user: null, token: null, authStatus: "not-authenticated" });
  },

  checkAuthStatus: async () => {
    try {
      const { token, user } = await checkAuthAction();

      set({
        user,
        token,
        authStatus: "authenticated",
      });
      return true;
    } catch (error) {
      set({
        user: null,
        token: null,
        authStatus: "not-authenticated",
      });
      return false;
    }
  },
  isAdmin: () => {
    const roles = get().user?.roles || [];

    return roles.includes("admin");
  },
}));
