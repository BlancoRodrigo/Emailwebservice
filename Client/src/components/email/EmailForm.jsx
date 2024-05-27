import React, { useState } from 'react';
import { sendEmail } from '../../services/emailService';
import InputField from '../common/InputField';
import Button from '../common/Button';

const EmailForm = () => {
  const [to, setTo] = useState('');
  const [subject, setSubject] = useState('');
  const [body, setBody] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const emailData = {
      to,
      subject,
      body,
    };

    try {
      const response = await sendEmail(emailData);
      console.log('Email sent successfully:', response);
  
    } catch (error) {
      console.error('Error sending email:', error);
    
    }
  };

  return (
    
    <form onSubmit={handleSubmit}>
      <InputField
        label="To:"
        type="email"
        value={to}
        onChange={(e) => setTo(e.target.value)}
        required
      />
      <InputField
        label="Subject:"
        type="text"
        value={subject}
        onChange={(e) => setSubject(e.target.value)}
        required
      />
      <InputField
        label="Body:"
        type="textarea"
        value={body}
        onChange={(e) => setBody(e.target.value)}
        required
      />
      <Button text="Send Email" type="submit" />
    </form>
  );
};

export default EmailForm;
