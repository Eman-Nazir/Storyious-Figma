import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        console.log('Checking authentication status...');
        const response = await axios.get('http://localhost:8000/api/users/me', {
          withCredentials: true
        });
        
        console.log('Auth check response:', response.data);
        
        if (response.data.user) {
          setUser(response.data.user);
        } else {
          console.log('No user data in response');
          setUser(null);
        }
      } catch (error) {
        if (error.response?.status !== 401) {
          console.error('Auth check failed:', error);
        } else {
          console.log('User not authenticated (401) - this is normal');
        }
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuthStatus();
  }, []);

  const login = (userData) => {
    console.log('User logged in:', userData);
    setUser(userData);
  };

  const logout = async () => {
    try {
      await axios.post('http://localhost:8000/api/users/logout', {}, {
        withCredentials: true
      });
      console.log('User logged out successfully');
    } catch (error) {
      if (error.response?.status !== 401) {
        console.error('Logout error:', error);
      }
    } finally {
      setUser(null);
    }
  };

  return (
    <UserContext.Provider value={{ user, login, logout, isLoading }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};