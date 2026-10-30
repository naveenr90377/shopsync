// createContext = the global pipe. useContext = drink from it. useState = hold the data
import { createContext, useState, useContext } from 'react';

// Create the empty context container
const AuthContext = createContext();

// Provider wraps the whole app and supplies the auth data
export function AuthProvider({ children }) {
  // read localStorage ONCE on first load so refresh keeps user logged in
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('userInfo');
    return saved ? JSON.parse(saved) : null;
  });

  // login = save user into state AND localStorage
  const login = (userData) => {
    setUser(userData);
    localStorage.setItem('userInfo', JSON.stringify(userData));
  };

  // logout = clear state AND localStorage instantly app-wide
  const logout = () => {
    setUser(null);
    localStorage.removeItem('userInfo');
  };

  // push user + login + logout down to every component inside the Provider
  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

// custom hook = one-word access to the global auth pipe
export const useAuth = () => useContext(AuthContext);