import React, { useState } from 'react';
import { useNavigate} from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import InputField from '../common/InputField';
import Button from '../common/Button';


const LoginForm = () => {

  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });
  const [error, setError] = useState('');  
  const {login} = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { username, password } = formData;

    try {
      const response = await login(username, password);
      if (!response || !response.token) {
        setError('Username or password are not correct.');
      }
    } catch (error) {
      setError('Username or password are not correct.');
    }
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <h1>Login</h1>
      <InputField
        label="Username"
        value={formData.username}
        type="text"
        onChange={handleChange}
        name="username"
      />
      <InputField
        label="Password"
        value={formData.password}
        type="password"
        onChange={handleChange}
        name="password"
      />
      <Button text="Login" type="submit" />
      <Button text="Signup" onClick={() => navigate('/signup')} /> 
      {error && <p>{error}</p>} {/* Mostramos el error si existe */}
    </form>
  );
};

export default LoginForm;
