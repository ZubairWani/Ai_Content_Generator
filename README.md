# Creator Platform: AI Content Assistant & Analytics Dashboard

This is a full-stack MERN application designed to serve as a comprehensive toolkit for content creators. The platform features an AI-powered assistant for generating fresh content ideas and a secure, data-rich dashboard for tracking Instagram analytics.

---

## Core Features

### 1. AI-Powered Content Idea Generator
- **Intelligent Content Creation:** Users can input a topic and select a content niche (e.g., Fashion, Fitness, Tech) to receive AI-generated post ideas.
- **Secure OpenAI Integration:** The backend securely communicates with the OpenAI API (GPT-3.5-Turbo) to generate a complete content package, including a hook, a detailed reel/post concept, an engaging caption, and relevant hashtags.
- **Content Bank (Bonus Feature):** All generated content ideas are automatically saved to a dedicated MongoDB collection, creating a persistent "content bank" for the user to draw from.

### 2. Protected Instagram Analytics Dashboard
- **Secure JWT Authentication:** The dashboard is a protected route, exclusively accessible to authenticated users. The system uses a robust JSON Web Token (JWT) strategy for managing user sessions securely.
- **Database-Backed User System:** User registration and login are handled through the backend, with all user credentials securely stored in MongoDB. Passwords are never stored in plain text, using `bcrypt.js` for one-way hashing.
- **Dynamic Data Visualization:** The dashboard renders analytics data fetched from a backend API endpoint, using the **Recharts** library to present information through dynamic and responsive charts.
- **Key Metrics Overview:** At-a-glance KPIs such as Total Followers, Engagement Rate, Total Reach, and Impressions are displayed in a clean, modern interface.

---

## Technology Stack

This project is built on the MERN stack, leveraging a suite of modern technologies to create a fast, secure, and scalable application.

-   **Frontend:** React.js, React Router, Tailwind CSS, Recharts, Lucide React, Vite
-   **Backend:** Node.js, Express.js
-   **Database:** MongoDB with Mongoose
-   **Authentication:** JSON Web Tokens (JWT), bcrypt.js
-   **External APIs:** OpenAI API

---

## Project Setup Guide

To run this application in a local development environment, please follow the steps below.

### Backend Configuration

The backend server is the core of the application, handling all business logic, database operations, and external API communication.

1.  **Navigate to the `server` directory and install the required npm packages:**
    ```
    cd server
    npm install
    ```

2.  **Set up Environment Variables:**
    Create a `.env` file within the `server` directory. This file will store all necessary environment variables. Populate it according to the following structure:

    ```ini
    # MongoDB Connection String from Atlas
    MONGO_URI=your_mongodb_connection_string

    # Port for the backend server
    PORT= PORT

    # OpenAI API Secret Key
    OPENAI_API_KEY=your_openai_api_key

    # Secret key for signing JSON Web Tokens
    JWT_SECRET=your_super_secret_jwt_string
    ```

3.  **Launch the Backend Server:**
    Run the development server. It will connect to the database and listen for incoming requests.
    ```
    npm run dev
    ```

### Frontend Configuration

The frontend is a modern React application built with Vite.

1.  **Navigate to the `frontend` directory in a new terminal and install dependencies:**
    ```
    cd frontend
    npm install
    ```

2.  **Launch the Frontend Application:**
    Start the Vite development server. It is pre-configured to proxy API requests to the backend.
    ```
    npm run dev
    ```

---