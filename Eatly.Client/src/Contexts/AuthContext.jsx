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
  clearCurrentEmail,
  clearCurrentUser,
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
    if (firebaseToken) {
      try {
        await initializeFirebaseAuth(firebaseToken);
      } catch (error) {
        console.error("Failed to initialize Firebase auth:", error);
      }
    }
    dispatch({ type: "login", payload: { user, token, expiresAt } });
    // Do NOT broadcast login event to other tabs to avoid infinite reload loop
  }, []);

  // Helper to clear all auth-related state (context + localStorage)
  const clearAllAuthState = useCallback(() => {
    setAccessToken(null);
    clearCurrentEmail();
    clearCurrentUser();
  }, []);

  const logout = useCallback(() => {
    clearAllAuthState();
    dispatch({ type: "logout" });
    // Broadcast logout event to other tabs
    if (authChannel.current) authChannel.current.postMessage('logout');
  }, [clearAllAuthState]);

  const updateUser = useCallback((user) => {
    dispatch({ type: "updateUser", payload: user });
  }, []);

  const setAuthenticationStatus = useCallback((status) => {
    dispatch({ type: "status", payload: status });
  }, []);

  // Setup BroadcastChannel for cross-tab auth sync (after logout is defined)
  const authChannel = useRef(null);
  useEffect(() => {
    authChannel.current = new window.BroadcastChannel('auth');
    // Listen for auth events from other tabs
    authChannel.current.onmessage = (event) => {
      if (event.data === 'logout') {
        logout();
      }
      // Do not handle 'login' event to avoid reload loops
    };
    return () => {
      if (authChannel.current) authChannel.current.close();
    };
  }, [logout]);

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

      setAuthenticationStatus(STATUS.PENDING);

      try {
        // Always attempt to refresh token on mount
        const response = await authenticateWithStoredCredentials();
        const { data } = response;

        if (data.email) {
          setCurrentEmail(data.email);
        }
        if (data) {
          setCurrentUser(data);
        }

        login(
          formatUserData(data),
          data.token,
          data.expiresAt,
          data.firebaseToken
        );
      } catch (error) {
        console.error("Initial authentication failed", error);
        // Always clear all state and set to idle
        clearAllAuthState();
        setAuthenticationStatus(STATUS.IDLE);
      }
    };

    checkStoredAuth();
  }, [login, logout, setAuthenticationStatus, clearAllAuthState]);

  useEffect(() => {
    if (!state.isAuthenticated || !state.expiresAt) return;

    const refreshTime = calculateRefreshTime(state.expiresAt);

    const tokenRefreshTimer = setTimeout(async () => {
      try {
        const { data } = await refreshAuthToken();
        login(
          formatUserData(data),
          data.token,
          data.expiresAt,
          data.firebaseToken
        );
      } catch (error) {
        console.error("Token refresh failed", error);
        // Always clear all state and set auth_status to false
        clearAllAuthState();
        logout();
      }
    }, refreshTime);

    return () => clearTimeout(tokenRefreshTimer);
  }, [state.isAuthenticated, state.expiresAt, state.token, login, logout, clearAllAuthState]);

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
