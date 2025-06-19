import React, { useState, useEffect } from 'react';
import LoginForm from './components/LoginForm';
import Dashboard from './components/Dashboard';

export default function App() {
  const [token, setToken] = useState(null);
  const [userEmail, setUserEmail] = useState(null);


  // Check for token on mount
  useEffect(() => {
    const storedToken = localStorage.getItem('authToken') || sessionStorage.getItem('authToken');
    const storedEmail = localStorage.getItem('userEmail') || sessionStorage.getItem('userEmail');

    if (storedToken && storedEmail) {
      setToken(storedToken);
      setUserEmail(storedEmail);
    }
  }, []);


  // Handle login, store token and email either in localStorage or sessionStorage depending on rememberMe
  const handleLogin = (token, email, rememberMe) => {
    if (rememberMe) {
      localStorage.setItem('authToken', token);
      localStorage.setItem('userEmail', email);
    } else {
      sessionStorage.setItem('authToken', token);
      sessionStorage.setItem('userEmail', email);
    }
    setToken(token);
    setUserEmail(email);
  };

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('userEmail');
    sessionStorage.removeItem('authToken');
    sessionStorage.removeItem('userEmail');
    setToken(null);
    setUserEmail(null);
  };

  if (!token) {
    return <LoginForm onLogin={handleLogin} />;
  }

  return <Dashboard userEmail={userEmail} onLogout={handleLogout} />;
}
