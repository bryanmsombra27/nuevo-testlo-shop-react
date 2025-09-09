import { tesloApi } from "@/api/teslo_api";
import type { AuthResponse } from "@/interfaces/user.interface";

export const checkAuthAction = async (): Promise<AuthResponse> => {
  const token = localStorage.getItem("token");

  if (!token) throw new Error("Not logged in");

  try {
    const { data } = await tesloApi.get<AuthResponse>("/auth/check-status");
    localStorage.setItem("token", data.token);

    return data;
  } catch (error) {
    localStorage.removeItem("token");
    throw new Error("token invalid");
  }
};
