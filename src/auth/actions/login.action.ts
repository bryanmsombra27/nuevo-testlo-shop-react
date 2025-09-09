import { tesloApi } from "@/api/teslo_api";
import type { AuthResponse } from "@/interfaces/user.interface";

interface Payload {
  email: string;
  password: string;
}

export const loginAction = async (body: Payload): Promise<AuthResponse> => {
  try {
    const { data } = await tesloApi.post<AuthResponse>("/auth/login", body);

    return data;
  } catch (error) {
    throw error;
  }
};
