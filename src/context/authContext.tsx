// src/context/authContext.tsx
import React, { createContext, useContext, useEffect, useState } from "react";
import { AuthState, LoginCredentials, User } from "../types/auth";
import { authService } from "../services/authService";

interface AuthContextType extends AuthState {
  login: (credentials: LoginCredentials) => Promise<void>;
  loginWithGoogle: (token: string) => Promise<void>;
  loginWithFacebook: (token: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [state, setState] = useState<AuthState>({
    user: null,
    accessToken: localStorage.getItem("accessToken"),
    isAuthenticated: false,
    isLoading: true,
  });

  useEffect(() => {
    const initAuth = async () => {
      const token = localStorage.getItem("accessToken");
      if (token) {
        try {
          const response = await authService.refreshToken();
          updateAuthState(response.user, response.accessToken);
        } catch (error) {
          handleLogout();
        }
      }
      setState((prev) => ({ ...prev, isLoading: false }));
    };

    initAuth();
  }, []);

  const updateAuthState = (user: User, accessToken: string) => {
    localStorage.setItem("accessToken", accessToken);
    setState({
      user,
      accessToken,
      isAuthenticated: true,
      isLoading: false,
    });
  };

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    setState({
      user: null,
      accessToken: null,
      isAuthenticated: false,
      isLoading: false,
    });
  };

  const login = async (credentials: LoginCredentials) => {
    const response = await authService.login(credentials);
    updateAuthState(response.user, response.accessToken);
  };

  const loginWithGoogle = async (token: string) => {
    const response = await authService.loginWithGoogle(token);
    updateAuthState(response.user, response.accessToken);
  };

  const loginWithFacebook = async (token: string) => {
    const response = await authService.loginWithFacebook(token);
    updateAuthState(response.user, response.accessToken);
  };

  const logout = async () => {
    try {
      await authService.logout();
    } finally {
      handleLogout();
    }
  };

  return (
    <AuthContext.Provider
      value={{
        ...state,
        login,
        loginWithGoogle,
        loginWithFacebook,
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
