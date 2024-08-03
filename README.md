# Node.js Registration and Login Backend

This is a Node.js backend application that provides login and registration functionalities using an SQL database. The database name is `registration_db`, and it contains a table named `registration`.

## Features

- User Registration
- User Login
- Token-based Authentication

## Technologies Used

- Node.js
- Express.js
- MySQL
- bcrypt (for password hashing)
- JWT (JSON Web Token for authentication)

## Prerequisites

- Node.js (v18 or later)
- MySQL

## Getting Started

Follow these instructions to set up and run the project on your local machine.

### 1. Clone the repository

```bash
git clone https://github.com/your-username/your-repo.git
cd your-repo
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up the database
Start MySQL and log in to your MySQL server.

Create the database:
```bash
CREATE DATABASE registration_db;
```

Switch to the database:
```bash
USE registration_db;
```

Create the registration table:
```bash
CREATE TABLE registration (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### 4. Configure environment variables
Create a .env file in the root directory of your project and add the following environment variables:

```bash
DB_HOST=your_database_host
DB_USER=your_database_user
DB_PASSWORD=your_database_password
DB_NAME=registration_db
JWT_SECRET=your_jwt_secret
PORT=3000
```

Replace your_database_host, your_database_user, your_database_password, and your_jwt_secret with your actual database credentials and a secret key for JWT.

### 5. Run the application
```bash
npm start
```

The server will start on the port specified in the .env file (default is 3000).

## API Endpoints
### Register a new user
 - URL: /api/v1/register
 - Method: POST
 - Body:

```bash
{
    "username": "your_username",
    "email": "your_email",
    "password": "your_password"
}
```
Response:
 - 201 Created: Registration successful
 - 400 Bad Request: Validation error or user already exists
### Login
 - URL: /api/v1/login
 - Method: POST
 - Body:
```bash
{
    "email": "your_email",
    "password": "your_password"
}
```

Response:
 - 200 OK: Login successful, returns a JWT token
 - 400 Bad Request: Validation error
 - 401 Unauthorized: Incorrect email or password

## Project Structure

```bash
├── src
│   ├── config
│   │   └── db.js
│   ├── controllers
│   │   ├── authController.js
│   ├── middleware
│   │   └── authMiddleware.js
│   ├── models
│   │   └── userModel.js
│   ├── routes
│   │   └── authRoutes.js
│   ├── utils
│   │   └── jwt.js
│   └── app.js
├── .env
├── .gitignore
├── package.json
└── README.md
```

## Contributing
Contributions are welcome! Please open an issue or submit a pull request for any changes.
