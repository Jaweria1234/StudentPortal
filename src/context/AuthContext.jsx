import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("userId") || null);

  const login = (newToken) => {
    localStorage.setItem("userId", newToken);
    setToken(newToken);
  };

  const logout = () => {
    localStorage.removeItem("userId");  // ✅ Remove user session
    setToken(null);
  };

  return (
    <AuthContext.Provider value={{ token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
