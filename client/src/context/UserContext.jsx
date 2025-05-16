import { createContext, useContext, useEffect, useState } from "react";

const UserProvider = createContext();

export const UserContext = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkUser = localStorage.getItem("user");
    if (!checkUser) {
      setUser(null);
      setLoading(true);
    }
    setUser(JSON.parse(checkUser));
    setLoading(false);
  }, []);

  return (
    <UserProvider.Provider value={{ user, setUser, loading }}>
      {children}
    </UserProvider.Provider>
  );
};

export const useAuth = () => useContext(UserProvider);
