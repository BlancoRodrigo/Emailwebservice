import React, { useState } from 'react';
import Sidebar from '../components/layout/Sidebar';
import '../styles/dashboard.css';

import EmailForm from '../components/email/EmailForm';
import EmailInbox from '../components/email/EmailInbox';

import useAuth from '../hooks/useAuth';


const Dashboard = () => {
  const [selectedSection, setSelectedSection] = useState('inbox');


  const renderContent = () => {
    switch (selectedSection) {
      case 'newEmail':
        return <EmailForm/>;
      case 'inbox':
        return <EmailInbox/>;
      case 'sent':
        return <div>Sent content</div>;
      default:
        return <div>Inbox content</div>;
    }
  };

  return (
    <div className="dashboard">
      <Sidebar onSelect={setSelectedSection} />
      <div className="content">
        {renderContent()}
      </div>
    </div>
  );
};

export default Dashboard;
