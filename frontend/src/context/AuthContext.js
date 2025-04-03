import { createContext, useState, useEffect } from "react";
import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Function to fetch authenticated user
  const fetchUser = async () => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        const res = await axios.get("http://localhost:5000/api/auth/me");
        setUser(res.data.user);
      } catch (error) {
        console.error("Failed to fetch user", error);
        logout();
      }
    }
  };

  // Call fetchUser when component mounts
  useEffect(() => {
    fetchUser();
  });

  const register = async (firstName, lastName, email, password) => {
    try {
      const res = await axios.post("http://localhost:5000/api/auth/register", {
        firstName,
        lastName,
        email,
        password,
      });

      localStorage.setItem("token", res.data.token);
      setUser(res.data.user);
    } catch (error) {
      console.error(error.response?.data?.msg || "Registration failed");
      throw new Error(error.response?.data?.msg || "Registration failed");
    }
  };

  const login = async (email, password) => {
    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/login",
        { email, password },
        { headers: { "Content-Type": "application/json" } }
      );

      const token = res.data.token;
      if (!token) throw new Error("Token is missing!");

      localStorage.setItem("token", token);
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

      setUser(res.data.user);
    } catch (error) {
      console.error(error.response?.data?.msg || "Login failed");
      throw new Error(error.response?.data?.msg || "Login failed");
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    delete axios.defaults.headers.common["Authorization"];
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
