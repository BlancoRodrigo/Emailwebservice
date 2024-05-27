import React, { createContext, useEffect, useState } from 'react';
import {useNavigate} from 'react-router-dom';
import {login as loginUser } from '../services/authService';

//AuthProvider maneja la logica de autenticacion y redireccionamiento

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); 
  const navigate = useNavigate();


  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setUser({token});
    }
  }, []); 

  const login = async (username, password) => {
    try {
      const data = await loginUser(username, password);
      if (!data) {
        return;
      } 
      localStorage.setItem ('token', data.token);
      setUser(data);
      navigate('/dashboard');
    } catch (error) {
        console.log('Failed to login',error);
    }

  };

  const logout = () => {  
    localStorage.removeItem('token');
    setUser(null);
    navigate('/');
  };
    
  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
export default AuthProvider;