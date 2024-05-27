import React from 'react';
import '../../styles/dashboard.css'; // Asegúrate de que esta ruta sea correcta
import useAuth from '../../hooks/useAuth';

const Sidebar = ({ onSelect }) => {
  const {logout} = useAuth(); 

  return (
    <div className="sidebar">
      <div className="sidebar-header">
        Email Web Service
      </div>
      <button onClick={() => onSelect('newEmail')}>New email</button>
      <button onClick={() => onSelect('inbox')}>Inbox</button>
      <button onClick={() => onSelect('sent')}>Sent</button>
      <button onClick={logout}>Logout</button>
    </div>
  );
};

export default Sidebar;
