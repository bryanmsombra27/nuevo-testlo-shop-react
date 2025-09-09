import type { User } from "@/interfaces/user.interface";
import { create } from "zustand";
import { loginAction } from "../actions/login.action";

interface InitialState {
  user: User | null;
  token: string | null;
}

interface Actions {
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
}

type State = InitialState & Actions;

export const useAuthStore = create<State>()((set, get) => ({
  token: null,
  user: null,
  login: async (email: string, password: string) => {
    try {
      const data = await loginAction({ email, password });
      localStorage.setItem("token", data.token);

      set({
        user: data.user,
        token: data.token,
      });
      return true;
    } catch (error) {
      set({
        user: null,
        token: null,
      });
      localStorage.removeItem("token");
      return false;
    }
  },
  logout: () => {
    localStorage.removeItem("token");
    set({ user: null, token: null });
  },
}));
