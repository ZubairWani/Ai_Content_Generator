# Creator Platform: AI Content Assistant & Analytics Dashboard

This is a full-stack MERN application designed to serve as a comprehensive toolkit for content creators. The platform features an AI-powered assistant for generating fresh content ideas and a secure, data-rich dashboard for tracking Instagram analytics.

**Live Application:** [**https://ai-content-generator-atpo.onrender.com/**](https://ai-content-generator-atpo.onrender.com/)

*(Note: The backend is hosted on Render's free tier, which may spin down due to inactivity. The first request might take 30-60 seconds to "wake up" the server.)*

---

## Core Features

### 1. AI-Powered Content Idea Generator
- **Intelligent Content Creation:** Users can input a topic and select a content niche (e.g., Fashion, Fitness, Tech) to receive AI-generated post ideas.
- **Secure OpenAI Integration:** The backend securely communicates with the OpenAI API (GPT-3.5-Turbo) to generate a complete content package, including a hook, a detailed reel/post concept, an engaging caption, and relevant hashtags.
- **Content Bank (Bonus Feature):** All generated ideas are automatically saved to a MongoDB database for future reference.
- **Fully Responsive UI:** The interface is designed to provide an excellent experience on both desktop and mobile devices, featuring a slide-out sidebar and a mobile-friendly bottom navigation bar.

### 2. Protected Instagram Analytics Dashboard
- **Secure JWT Authentication:** The dashboard is a protected route, exclusively accessible to authenticated users. The system uses a robust JSON Web Token (JWT) strategy for managing user sessions securely.
- **Database-Backed User System:** User registration and login are handled through the backend, with all user credentials securely stored in MongoDB. Passwords are never stored in plain text, using `bcrypt.js` for one-way hashing.
- **Dynamic Data Visualization:** The dashboard renders simulated analytics data fetched from the backend API, using the **Recharts** library to present information through dynamic and responsive charts.
- **Interactive Controls:** Features functional buttons for refreshing data and exporting engagement metrics as a downloadable CSV report.

---

## Technology Stack

This project is built on the **MERN** stack, leveraging a suite of modern technologies to create a fast, secure, and scalable application.

-   **Frontend:** React.js, React Router, Tailwind CSS, Recharts, Lucide React, Axios, Vite
-   **Backend:** Node.js, Express.js
-   **Database:** MongoDB with Mongoose
-   **Authentication:** JSON Web Tokens (JWT), bcrypt.js
-   **External APIs:** OpenAI API
-   **Deployment:** Render

---

## Local Development Environment

The project is structured as a monorepo with separate `frontend` and `server` directories. Both services must be running concurrently for local development.

### Backend Server (`/server`)

1.  **Install Dependencies:** All required backend packages are listed in the `package.json` file within the `/server` directory.
2.  **Configure Environment Variables:** A `.env` file must be created in the `/server` directory. It should contain the following secret keys and configuration variables:
    ```ini
    # MongoDB Connection String from Atlas or another provider
    MONGO_URI=your_mongodb_connection_string

    # OpenAI API Secret Key
    OPENAI_API_KEY=your_openai_api_key

    # Secret key for signing JSON Web Tokens
    JWT_SECRET=your_super_secret_jwt_string
    ```
3.  **Launch the Server:** Run the development script from the `/server` directory to start the backend. The server will connect to the database and listen for incoming API requests.

### Frontend Application (`/frontend`)

1.  **Install Dependencies:** All required frontend packages are listed in the `package.json` file within the `/frontend` directory.
2.  **Launch the Application:** Run the development script from the `/frontend` directory. The Vite development server will start and is pre-configured to proxy all API requests to the running backend.

---