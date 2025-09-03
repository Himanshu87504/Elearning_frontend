import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { server } from "../main";
import toast, { Toaster } from "react-hot-toast";

const UserContext = createContext();

export const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState(null); // Initialize user as null
  const [isAuth, setIsAuth] = useState(false);
  const [btnLoading, setBtnLoading] = useState(false);
  const [loading, setLoading] = useState(true);

  // Function to handle user login
  async function loginUser(email, password, navigate, fetchMyCourse) {
    setBtnLoading(true);
    try {
      const { data } = await axios.post(`${server}/api/user/login`, {
        email,
        password,
      });

      toast.success(data.message);
      localStorage.setItem("token", data.token);
      setUser(data.user);
      setIsAuth(true);
      navigate("/"); // Redirect to home or a specific page
      fetchMyCourse(); // Fetch courses or other data if needed
    } catch (error) {
      toast.error(error.response?.data?.message || "Login failed");
    } finally {
      setBtnLoading(false);
    }
  }

  // Function to handle user registration
  async function registerUser(name, email, password, navigate) {
    setBtnLoading(true);
    try {
      const { data } = await axios.post(`${server}/api/user/register`, {
        name,
        email,
        password,
      });

      toast.success(data.message);
      localStorage.setItem("activationToken", data.activationToken);
      navigate("/verify");
    } catch (error) {
      toast.error(error.response?.data?.message || "Registration failed");
    } finally {
      setBtnLoading(false);
    }
  }

  // Function to verify OTP
  async function verifyOtp(otp, navigate) {
    setBtnLoading(true);
    const activationToken = localStorage.getItem("activationToken");
    try {
      const { data } = await axios.post(`${server}/api/user/verify`, {
        otp,
        activationToken,
      });

      toast.success(data.message);
      navigate("/login");
      localStorage.clear(); // Clear tokens
    } catch (error) {
      toast.error(error.response?.data?.message || "OTP verification failed");
    } finally {
      setBtnLoading(false);
    }
  }

  // Function to fetch user data
  async function fetchUser() {
    try {
      const { data } = await axios.get(`${server}/api/user/me`, {
        headers: {
          token: localStorage.getItem("token"),
        },
      });
      
      setUser(data.user);
      setIsAuth(true);
    } catch (error) {
      console.error("Failed to fetch user data:", error);
      setIsAuth(false); // Set authentication state to false if fetching fails
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchUser(); // Fetch user data on initial render
  }, []); // Empty dependency array to run only once

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        setIsAuth,
        isAuth,
        loginUser,
        btnLoading,
        loading,
        registerUser,
        verifyOtp,
        fetchUser,
      }}
    >
      {children}
      <Toaster />
    </UserContext.Provider>
  );
};

// Custom hook to use UserContext
export const UserData = () => useContext(UserContext);
