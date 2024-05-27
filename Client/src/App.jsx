import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import LoginForm from './components/auth/LoginForm';
import SignupForm from './components/auth/SignupForm';
import Dashboard from './routes/Dashboard';
import AuthProvider, { AuthContext } from './contexts/AuthProvider'; // Asegúrate de importar AuthProvider correctamente
import './styles/app.css';

const App = () => {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route
            path="/login"
            element={
              <AuthContext.Consumer>
                {({ user }) => !user ? <LoginForm /> : <Navigate to="/dashboard" />}
              </AuthContext.Consumer>
            }
          />
          <Route
            path="/signup"
            element={
              <AuthContext.Consumer>
                {({ user }) => !user ? <SignupForm /> : <Navigate to="/dashboard" />}
              </AuthContext.Consumer>
            }
          />
          <Route
            path="/dashboard"
            element={
              <AuthContext.Consumer>
                {({ user }) => user ? <Dashboard /> : <Navigate to="/login" />}
              </AuthContext.Consumer>
            }
          />
          <Route
            path="/"
            element={
              <AuthContext.Consumer>
                {({ user }) => <Navigate to={user ? "/dashboard" : "/login"} />}
              </AuthContext.Consumer>
            }
          />
        </Routes>
      </AuthProvider>
    </Router>
  );
};

export default App;
