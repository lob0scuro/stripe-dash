import { createContext, useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
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

  const logout = async () => {
    const response = await fetch("/auth/logout");
    const data = await response.json();
    if (!response.ok) {
      toast.error(data.error);
    }
    toast.success(data.message);
    setUser(null);
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <UserContext.Provider value={{ user, setUser, loading, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export const useAuth = () => useContext(UserContext);
