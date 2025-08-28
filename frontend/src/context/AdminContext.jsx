import React, { createContext, useState } from "react";
import axios from "axios";

export const AdminContext = createContext();

export const AdminProvider = ({ children }) => {
    
  const [admin, setAdmin] = useState(null);
  const [loading, setLoading] = useState(false);

  const BASE_URL = import.meta.env.VITE_BACKEND_ADMIN_URL;

  // Login
  const login = async (email, password) => {
    setLoading(true);
    try {
      const res = await axios.post(
        `${BASE_URL}/login`,
        { email, password },
        { withCredentials: true } 
      );

      setAdmin({ role: res.data.role });
      setLoading(false);
      return { success: true, message: res.data.message };
    } catch (err) {
      setLoading(false);
      return { success: false, message: err.response?.data?.message || "Login failed" };
    }
  };

  // Get Dashboard
const getDashboard = async () => {
  try {
    const res = await axios.get(`${BASE_URL}/dashboard`, {
      withCredentials: true, 
    });
    return res.data; 
  } catch (err) {
    return { message: err.response?.data?.message || "Access denied" };
  }
};


// Get Categories
const getCategories = async () => {
  try {
    const res = await axios.get("http://localhost:8000/api/categories", {
      withCredentials: true,
    });
    return res.data.data; 
  } catch (err) {
    console.error("Error fetching categories:", err);
    return [];
  }
};

// Get Authors
const getAuthors = async () => {
  try {
    const res = await axios.get("http://localhost:8000/api/authors", {
      withCredentials: true,
    });
    return res.data.data; 
  } catch (err) {
    console.error("Error fetching authors:", err);
    return [];
  }
};

// Get Stories
const getStories = async () => {
  try {
    const res = await axios.get("http://localhost:8000/api/stories", {
      withCredentials: true,
    });
    return res.data.data; 
  } catch (err) {
    console.error("Error fetching stories:", err);
    return [];
  }
};

// Get Blogs
const getBlogs = async () => {
  try {
    const res = await axios.get("http://localhost:8000/api/blogs", {
      withCredentials: true,
    });
    return res.data.blogs || []; 
  } catch (err) {
    console.error("Error fetching blogs:", err);
    return [];
  }
};



  return (
    <AdminContext.Provider value={{ admin, loading, login, getDashboard , getCategories, getAuthors,getStories,getBlogs }}>
      {children}
    </AdminContext.Provider>
  );
};


