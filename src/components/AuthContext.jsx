import { createContext, useContext, useEffect, useState } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('customer')) || null);

  // Sync to localStorage
  useEffect(() => {
    if (token) localStorage.setItem('token', token);
    else localStorage.removeItem('token');

    if (user) localStorage.setItem('customer', JSON.stringify(user));
    else localStorage.removeItem('customer');
  }, [token, user]);

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.clear();
    window.location.href = 'http://localhost:5173/login'; // redirect to login app
  };

  return (
    <AuthContext.Provider value={{ token, user, setToken, setUser, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

// Custom hook
export const useAuth = () => useContext(AuthContext);
