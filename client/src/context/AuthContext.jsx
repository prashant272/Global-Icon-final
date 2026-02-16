import { createContext, useContext, useEffect, useState, useCallback, useMemo } from "react";
import { loginUser, registerUser, adminLogin, verifyOTP, resendOTP } from "../services/api.js";

const AuthContext = createContext(null);

const STORAGE_KEY = "primetime_auth";

function loadStoredAuth() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return { user: null, token: null };
    return JSON.parse(raw);
  } catch {
    return { user: null, token: null };
  }
}

function storeAuth(value) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(value));
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [initialised, setInitialised] = useState(false);
  const [isAuthenticating, setIsAuthenticating] = useState(false);

  useEffect(() => {
    const { user: storedUser, token: storedToken } = loadStoredAuth();
    if (storedUser && storedToken) {
      setUser(storedUser);
      setToken(storedToken);
    }
    setInitialised(true);
  }, []);

  const handleAuthSuccess = useCallback((payload) => {
    const { user: nextUser, token: nextToken } = payload;
    storeAuth({ user: nextUser, token: nextToken });
    setUser(nextUser);
    setToken(nextToken);
  }, []);

  const socialLoginSync = useCallback((payload) => {
    setIsAuthenticating(true);
    const { user: nextUser, token: nextToken } = payload;

    // 1. Store in localStorage immediately
    storeAuth({ user: nextUser, token: nextToken });

    // 2. Update React state
    setUser(nextUser);
    setToken(nextToken);

    // 3. Keep 'isAuthenticating' true for 1.5 seconds
    setTimeout(() => {
      setIsAuthenticating(false);
    }, 1500);
  }, []);

  const login = useCallback(async (email, password) => {
    try {
      const data = await loginUser({ email, password });
      handleAuthSuccess(data);
      return data;
    } catch (error) {
      throw error;
    }
  }, [handleAuthSuccess]);

  const register = useCallback(async (name, email, password, secretCode) => {
    const data = await registerUser({ name, email, password, secretCode });
    return data;
  }, []);

  const verifyOtp = useCallback(async (email, otp) => {
    const data = await verifyOTP({ email, otp });
    handleAuthSuccess(data);
    return data;
  }, [handleAuthSuccess]);

  const resendOtp = useCallback(async (email) => {
    return await resendOTP({ email });
  }, []);

  const loginAsAdmin = useCallback(async (email, password) => {
    const data = await adminLogin({ email, password });
    handleAuthSuccess(data);
    return data;
  }, [handleAuthSuccess]);

  const logout = useCallback(() => {
    setUser(null);
    setToken(null);
    localStorage.removeItem(STORAGE_KEY);
  }, []);

  const value = useMemo(() => ({
    user,
    token,
    initialised,
    isAuthenticating,
    isAuthenticated: Boolean(user && token),
    login,
    register,
    verifyOtp,
    resendOtp,
    loginAsAdmin,
    logout,
    handleAuthSuccess,
    socialLoginSync,
  }), [
    user,
    token,
    initialised,
    isAuthenticating,
    login,
    register,
    verifyOtp,
    resendOtp,
    loginAsAdmin,
    logout,
    handleAuthSuccess,
    socialLoginSync
  ]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return ctx;
}







