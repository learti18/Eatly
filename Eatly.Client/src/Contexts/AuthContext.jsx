import React, {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useReducer,
  useRef,
  useState,
} from "react";
import { AuthReducer, initialState } from "./../Utils/AuthReducer";
import { setAccessToken } from "./../Utils/TokenManager";
import { setupAuthInterceptors } from "./../Services/Api";
import {
  getCurrentEmail,
  hasAuthenticatedSession,
  setCurrentUser,
  setCurrentEmail,
} from "../Utils/UserStore";
import { STATUS } from "../Utils/AuthStatus";
import {
  authenticateWithStoredCredentials,
  calculateRefreshTime,
  formatUserData,
  refreshAuthToken,
} from "../Services/AuthService";
import { initializeFirebaseAuth } from "../Services/FirebaseService";

export const AuthContext = createContext({
  ...initialState,
  login: () => {},
  logout: () => {},
  updateUser: () => {},
  setAuthenticationStatus: () => {},
});

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AuthReducer, initialState);
  const isInitialAuthCheckComplete = useRef(false);

  const login = useCallback(async (user, token, expiresAt, firebaseToken) => {
    setAccessToken(token);
    
    // Initialize Firebase auth if we have a Firebase token
    if (firebaseToken) {
      try {
        await initializeFirebaseAuth(firebaseToken);
      } catch (error) {
        console.error('Failed to initialize Firebase auth:', error);
        // Continue with regular auth even if Firebase fails
      }
    }
    
    dispatch({ type: "login", payload: { user, token, expiresAt } });
  }, []);

  const logout = useCallback(() => {
    setAccessToken(null);
    dispatch({ type: "logout" });
  }, []);

  const updateUser = useCallback((user) => {
    dispatch({ type: "updateUser", payload: user });
  }, []);

  const setAuthenticationStatus = useCallback((status) => {
    dispatch({ type: "status", payload: status });
  }, []);

  useEffect(() => {
    const handleStorageChange = (event) => {
      if (event.key === "auth_status") {
        const isAuthenticated = event.newValue === "true";
        isAuthenticated ? window.location.reload() : logout();
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, [logout]);

  useEffect(() => {
    const checkStoredAuth = async () => {
      if (isInitialAuthCheckComplete.current) return;
      isInitialAuthCheckComplete.current = true;

      setupAuthInterceptors({ token: null, login, logout });

      const storedEmail = getCurrentEmail();
      const hasSession = hasAuthenticatedSession();

      if (!storedEmail && !hasSession) {
        setAuthenticationStatus(STATUS.IDLE);
        return;
      }

      setAuthenticationStatus(STATUS.PENDING);

      try {
        const response = await authenticateWithStoredCredentials(storedEmail);
        const { data } = response;

        if (data.email) {
          setCurrentEmail(data.email);
        }
        if (data) {
          setCurrentUser(data);
        }

        login(formatUserData(data), data.token, data.expiresAt, data.firebaseToken);
      } catch (error) {
        console.error("Initial authentication failed", error);
        setAuthenticationStatus(STATUS.FAILED);
      }
    };

    checkStoredAuth();
  }, [login, logout, setAuthenticationStatus]);

  useEffect(() => {
    if (!state.isAuthenticated || !state.expiresAt) return;

    const refreshTime = calculateRefreshTime(state.expiresAt);

    const tokenRefreshTimer = setTimeout(async () => {
      try {
        const { data } = await refreshAuthToken();
        login(formatUserData(data), data.token, data.expiresAt, data.firebaseToken);
      } catch (error) {
        console.error("Token refresh failed", error);
        logout();
      }
    }, refreshTime);

    return () => clearTimeout(tokenRefreshTimer);
  }, [state.isAuthenticated, state.expiresAt, state.token, login, logout]);

  const value = useMemo(
    () => ({
      ...state,
      login,
      logout,
      updateUser,
      setAuthenticationStatus,
    }),
    [state, login, logout, updateUser, setAuthenticationStatus]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
