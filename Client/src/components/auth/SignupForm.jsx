import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import InputField from '../common/InputField';
import Button from '../common/Button';

import { signup } from '../../services/authService';



const SignupForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    surname: '',
    username: '',
    password: '',
    email: '',
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData, 
      [e.target.name]: e.target.value,
    });
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, surname, username, email, password } = formData;
    console.log({ name, surname, username, email, password });
    try {
      const response = await signup(name, surname, username, email, password);
      console.log('User signed up', response);
      navigate('/login');
    } catch (error) {
      console.log('Failed to signup', error);
      if (error.response && error.response.status === 400) {
        setError(error.response.data.message);
      } else {
        setError('Failed to signup. Please try again.');
      }
    }
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <h1>Signup</h1>
      <InputField
        label="Name"
        value={formData.name}
        type="text"
        onChange={handleChange}
        name="name"
      />
      <InputField
        label="Surname"
        value={formData.surname}
        type="text"
        onChange={handleChange}
        name="surname"
      />
      <InputField
        label="Username"
        value={formData.username}
        type="text"
        onChange={handleChange}
        name="username"
      />
      <InputField
        label="Email"
        value={formData.email}
        type="email"
        onChange={handleChange}
        name="email"
      />
      <InputField
        label="Password"
        value={formData.password}
        type="password"
        onChange={handleChange}
        name="password"
      />
      <Button text="Signup" type="submit" />
      <Button text="Login" onClick={() => navigate('/login')} />  
      {error && <p>{error}</p>}
    </form>
  );
};

export default SignupForm;
