import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import api from "../api";
import { useAuth } from "./useAuth";
import { useCookie } from "./useCookie";
import { jwtDecode } from "jwt-decode";

interface LoginCredentials {
  email: string;
  password: string;
}

interface AuthResponse {
  token: string;
  user?: {
    id: string;
    email: string;
    role?: string;
  };
}

interface JwtPayload {
  id: string;
  email: string;
  role?: string;
  iat: number;
  exp: number;
}

export const useLogin = () => {
  const { setUser } = useAuth();
  const { setAccessToken } = useCookie();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: async (credentials: LoginCredentials) => {
      const { data } = await api.post<AuthResponse>("/auth/login", credentials);
      return data;
    },
    onSuccess: (data) => {
      setAccessToken(data.token);

      const decoded = jwtDecode<JwtPayload>(data.token);

      setUser({
        id: decoded.id,
        email: decoded.email,
        role: decoded.role,
        token: data.token,
      });

      navigate("/dashboard");
    },
  });
};

export const useRegister = () => {
  const { setUser } = useAuth();
  const { setAccessToken } = useCookie();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: async (credentials: LoginCredentials & { name?: string }) => {
      const { data } = await api.post<AuthResponse>(
        "/auth/register",
        credentials
      );
      return data;
    },
    onSuccess: (data) => {
      setAccessToken(data.token);

      const decoded = jwtDecode<JwtPayload>(data.token);

      setUser({
        id: decoded.id,
        email: decoded.email,
        role: decoded.role,
        token: data.token,
      });

      navigate("/dashboard");
    },
  });
};
