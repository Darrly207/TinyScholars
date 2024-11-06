import React, { createContext, useContext, useReducer, useEffect } from "react";
import axios from "axios";
import { AuthState, LoginCredentials, AuthResponse } from "../types/auth";

interface AuthContextType extends AuthState {
  login: (credentials: LoginCredentials) => Promise<void>;
  loginWithGoogle: (token: string) => Promise<void>;
  loginWithFacebook: (token: string) => Promise<void>;
  // register: (user: any) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const initialState: AuthState = {
  user: null,
  token: localStorage.getItem("token"),
  refreshToken: localStorage.getItem("refreshToken"),
  isAuthenticated: false,
  isLoading: true,
};

type AuthAction =
  | { type: "LOGIN_SUCCESS"; payload: AuthResponse }
  | { type: "LOGOUT" }
  | { type: "SET_LOADING"; payload: boolean };

const authReducer = (state: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case "LOGIN_SUCCESS":
      return {
        ...state,
        user: action.payload.user,
        token: action.payload.token,
        refreshToken: action.payload.refreshToken,
        isAuthenticated: true,
        isLoading: false,
      };
    case "LOGOUT":
      return {
        ...state,
        user: null,
        token: null,
        refreshToken: null,
        isAuthenticated: false,
        isLoading: false,
      };
    case "SET_LOADING":
      return {
        ...state,
        isLoading: action.payload,
      };
    default:
      return state;
  }
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  // Setup axios interceptor for token refresh
  useEffect(() => {
    const requestInterceptor = axios.interceptors.request.use(
      (config) => {
        const token = localStorage.getItem("token");
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    const responseInterceptor = axios.interceptors.response.use(
      (response) => response,
      async (error) => {
        const originalRequest = error.config;
        if (error.response?.status === 401 && !originalRequest._retry) {
          originalRequest._retry = true;
          try {
            const refreshToken = localStorage.getItem("refreshToken");
            const response = await axios.post("/api/auth/refresh-token", {
              refreshToken,
            });
            const { token, refreshToken: newRefreshToken } = response.data;

            localStorage.setItem("token", token);
            localStorage.setItem("refreshToken", newRefreshToken);

            originalRequest.headers.Authorization = `Bearer ${token}`;
            return axios(originalRequest);
          } catch (err) {
            dispatch({ type: "LOGOUT" });
            return Promise.reject(error);
          }
        }
        return Promise.reject(error);
      }
    );

    return () => {
      axios.interceptors.request.eject(requestInterceptor);
      axios.interceptors.response.eject(responseInterceptor);
    };
  }, []);

  const login = async (credentials: LoginCredentials) => {
    try {
      const response = await axios.post<AuthResponse>(
        "http://localhost:5000/api/auth/login",

        credentials
      );
      const { user, token, refreshToken } = response.data;

      localStorage.setItem("token", token);
      localStorage.setItem("refreshToken", refreshToken);

      dispatch({ type: "LOGIN_SUCCESS", payload: response.data });
    } catch (error) {
      throw error;
    }
  };
  // const register = async () => {
  //   try {
  //     const response = await axios.post<AuthResponse>(
  //       "http://localhost:3000/api/auth/login",
  //       email:
  //     );
  //     const { user, token, refreshToken } = response.data;

  //     localStorage.setItem("token", token);
  //     localStorage.setItem("refreshToken", refreshToken);

  //     dispatch({ type: "LOGIN_SUCCESS", payload: response.data });
  //   } catch (error) {
  //     throw error;
  //   }
  // };

  const loginWithGoogle = async (token: string) => {
    try {
      const response = await axios.post<AuthResponse>(
        "http://localhost:5000/api/auth/google",
        {
          token,
        }
      );
      const { user, token: authToken, refreshToken } = response.data;

      localStorage.setItem("token", authToken);
      localStorage.setItem("refreshToken", refreshToken);

      dispatch({ type: "LOGIN_SUCCESS", payload: response.data });
    } catch (error) {
      throw error;
    }
  };

  const loginWithFacebook = async (token: string) => {
    try {
      const response = await axios.post<AuthResponse>(
        "http://localhost:5000/api/auth/facebook",
        {
          accessToken: token,
        }
      );
      const { user, token: authToken, refreshToken } = response.data;

      localStorage.setItem("token", authToken);
      localStorage.setItem("refreshToken", refreshToken);

      dispatch({ type: "LOGIN_SUCCESS", payload: response.data });
    } catch (error) {
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("refreshToken");
    dispatch({ type: "LOGOUT" });
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
  if (undefined === context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
