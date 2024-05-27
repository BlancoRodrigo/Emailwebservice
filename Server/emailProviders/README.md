# Email Service API

This API allows users to send emails using different email providers. It is built using Node.js, Express, and Sequelize, and uses an abstract class to define the structure for different email providers.

## Table of Contents

- [Installation](#installation)
- [Configuration](#configuration)
- [Adding a New Email Provider](#adding-a-new-email-provider)
  - [Example: SendGrid Provider](#example-sendgrid-provider)
  - [Example: Mailgun Provider](#example-mailgun-provider)
- [Base Class Explanation](#base-class-explanation)


## Installation

To install the dependencies, run:
```bash
npm install
```

## Configuration
Make sure to set up your database and update the config/database.js file with your database credentials.

## Adding a New Email Provider
To add a new email provider, follow these steps:

1 -Install the necessary library for the provider:
    Examples:
        For SendGrid: npm install @sendgrid/mail
        For Mailgun: npm install mailgun.js form-data
2 -Create a new provider class that extends the EmailProvider abstract class.

## Example: SendGrid Provider
```javascript
// emailProviders/SendGridProvider.js
import EmailProvider from './EmailProvider';
import sgMail from '@sendgrid/mail';

export default class SendGridProvider extends EmailProvider {
  constructor(apiKey) {
    super();
    sgMail.setApiKey(apiKey);
  }

  async sendMail(to, subject, body) {
    const msg = {
      to,
      from: 'your-email@example.com', // Use your verified sender
      subject,
      text: body,
      html: `<strong>${body}</strong>`,
    };

    try {
      await sgMail.send(msg);
      console.log('Email sent via SendGrid');
    } catch (error) {
      console.error('Error sending email via SendGrid', error);
      throw error;
    }
  }
}
```

## Example: Mailgun Provider
```javascript
// emailProviders/MailgunProvider.js
import EmailProvider from './EmailProvider';
import formData from 'form-data';
import Mailgun from 'mailgun.js';

const mailgun = new Mailgun(formData);

export default class MailgunProvider extends EmailProvider {
  constructor(apiKey, domain) {
    super();
    this.client = mailgun.client({ username: 'api', key: apiKey });
    this.domain = domain;
  }

  async sendMail(to, subject, body) {
    const data = {
      from: 'your-email@example.com', // Use your verified sender
      to,
      subject,
      text: body,
    };

    try {
      await this.client.messages.create(this.domain, data);
      console.log('Email sent via Mailgun');
    } catch (error) {
      console.error('Error sending email via Mailgun', error);
      throw error;
    }
  }
}
```
## Base Class Explanation
The EmailProvider class is an abstract class that defines a contract for all email provider classes. It ensures that any class extending EmailProvider implements the sendMail method.
```javascript
// emailProviders/EmailProvider.js
export default class EmailProvider {
  constructor() {
    if (new.target === EmailProvider) {
      throw new TypeError("Cannot construct Abstract instances directly");
    }
  }

  async sendMail(to, subject, body) {
    throw new Error("sendMail method must be implemented");
  }
}
```

Explanation
1- Constructor Check:
    The constructor includes a check if (new.target === EmailProvider), which ensures that the EmailProvider class cannot be instantiated directly. It must be extended by other classes.
2- Abstract Method:
    The sendMail method is an abstract method. It throws an error if not implemented. This forces any subclass to provide its own implementation of sendMail.
    
Why Use an Abstract Class?
    Using an abstract class allows us to define a common interface for all email providers. This ensures that all providers have a sendMail method, making it easier to switch between providers or add new ones without changing the rest of the codebase.

By following this structure, you can easily integrate new email providers and maintain a consistent interface for sending emails.