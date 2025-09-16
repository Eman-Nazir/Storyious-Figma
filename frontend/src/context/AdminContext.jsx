import React, { createContext, useState } from "react";
import axios from "axios";

export const AdminContext = createContext();

export const AdminProvider = ({ children }) => {
    
  const [admin, setAdmin] = useState(null);
  const [loading, setLoading] = useState(false);

  const BASE_URL = import.meta.env.VITE_BACKEND_ADMIN_URL;

  

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
    
    console.log("Blogs API response:", res.data);
    
    if (res.data.data && res.data.data.blogs) {
      return res.data.data.blogs;
    }
    else if (res.data.blogs) {
      return res.data.blogs;
    }
    else if (Array.isArray(res.data)) {
      return res.data;
    }
    else if (res.data.data && Array.isArray(res.data.data)) {
      return res.data.data;
    }
    else {
      console.error("Unexpected blogs response structure:", res.data);
      return [];
    }
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


