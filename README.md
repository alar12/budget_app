# Budget App

The Budget App is a web application designed to help users manage their finances effectively.

## Features

- **Login**: Users can log in to their accounts securely.
- **Registration**: New users can create accounts to start managing their finances.
- **Home Dashboard**: Provides an overview of expenses, income, and budget progress.
- **Forgot Password**: Option to reset password through email verification.
- **Monthly Budget Forecasting**: Users can input their income and expenses to forecast their monthly budgets.
- **Savings Goals**: Users can set savings goals and forecast the time required to achieve them.

## Technologies Used

- **Frontend**: React, Material-UI
- **Backend**: Node.js, Express.js
- **Authentication**: JSON Web Tokens (JWT)
- **Database**: MongoDB

## Getting Started

To get a local copy of the project up and running, follow these steps:

### Prerequisites

- **Node.js** (v14 or higher) installed on your local machine
- **MongoDB** (v4 or higher) installed and running locally or a MongoDB Atlas account

### Compatible Operating Systems

- Windows 10 or higher
- macOS 10.13 High Sierra or higher
- Linux (any modern distribution)

### System Requirements

- At least 4 GB of RAM
- 10 GB of free disk space
- Internet connection for dependency installation and API access

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/alar12/budget_app.git
   ```

2. Navigate into the project directory:

   ```bash
   cd budget_app
   ```

3. Install dependencies for both frontend and backend:

   ```bash
   # Install backend dependencies
   cd backend
   npm install

   # Install frontend dependencies
   cd ../frontend
   npm install
   ```

### Configuration

1. **Backend Configuration**:

   - Create a `.env` file in the `backend` directory and add the following variables:

     ```plaintext
     MONGO_URL=your_mongodb_connection_string
     ```

     Replace `your_mongodb_connection_string` with your actual MongoDB connection string.

2. **Starting the Application**:

   - Start the backend server:

     ```bash
     # From the backend directory
     npm start

     # backend will be running on port 5000.
     ```

   - Start the frontend development server:

     ```bash
     # From the frontend directory
     npm start
     ```

3. **Accessing the Application**:

   - Open your browser and go to `http://localhost:3000` to view the Budget App.

## Library Requirements

### Backend

- **Express.js**: A fast, unopinionated, minimalist web framework for Node.js
- **Mongoose**: Elegant MongoDB object modeling for Node.js
- **JSON Web Token**: For authentication
- **bcrypt**: For password hashing

### Frontend

- **React**: A JavaScript library for building user interfaces
- **Material-UI**: React components for faster and easier web development
- **Axios**: Promise-based HTTP client for the browser and Node.js
- **Redux**: A predictable state container for JavaScript apps (if used for state management)

## Usage

- **Login**: Use existing credentials or register if new to the app.
- **Register**: Create a new account with a username, email, and password.
- **Home Dashboard**: View your financial overview and manage your budget.

## Development

- **Version Control**: Git and GitHub for source code management and collaboration.
- **Project Management**: Git Issue Board for task tracking and sprint planning.

## Design Document
https://github.com/alar12/budget_app/blob/main/design-document.md
