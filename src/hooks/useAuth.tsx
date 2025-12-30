import {
  createContext,
  useContext,
  type ReactNode,
  useState,
  useEffect,
} from "react";
import { useCookie } from "../hooks/useCookie";
import { jwtDecode } from "jwt-decode";
import { useQueryClient } from "@tanstack/react-query";

interface JwtPayload {
  id: string;
  email: string;
  role?: string;
  iat: number;
  exp: number;
}

interface AuthData {
  id: string;
  email: string;
  role?: string;
  token?: string;
}

interface AuthContextType {
  user: AuthData | null;
  token: string | null;
  setUser: (data: AuthData | null) => void;
  loading: boolean;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const { getAccessToken, removeAccessToken } = useCookie();
  const queryClient = useQueryClient();
  const [user, setUser] = useState<AuthData | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const logout = () => {
    removeAccessToken();
    setUser(null);
    setToken(null);
    // Clear all React Query cache on logout
    queryClient.clear();
    setLoading(false);
  };

  useEffect(() => {
    const currentToken = getAccessToken();
    if (!currentToken || !user) return;

    const decoded = jwtDecode<JwtPayload>(currentToken);
    const timeUntilExpiry = decoded.exp * 1000 - Date.now();

    if (timeUntilExpiry > 0) {
      const timeout = setTimeout(() => {
        logout();
      }, timeUntilExpiry);

      return () => clearTimeout(timeout);
    }
  }, [user, getAccessToken]);

  const validateSession = async () => {
    setLoading(true);
    try {
      const currentToken = getAccessToken();

      if (!currentToken) {
        throw new Error("No token found");
      }

      const decoded = jwtDecode<JwtPayload>(currentToken);

      if (decoded.exp * 1000 < Date.now()) {
        throw new Error("Token expired");
      }

      const userData = {
        id: decoded.id,
        email: decoded.email,
        role: decoded.role,
      };

      setUser(userData);
      setToken(currentToken);

      return { success: true };
    } catch (error) {
      logout();
      return { success: false, error };
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    validateSession();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        setUser,
        loading,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};