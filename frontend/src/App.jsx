import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import ContentIdeaAssistant from './pages/ContentIdeaAssistant';
import AnalyticsDashboard from './pages/AnalyticsDashboard';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Sidebar from './components/sidebar/sidebar';

const MainLayout = ({ children }) => {
  return (
    <div className="flex bg-gradient-to-br from-slate-50 to-slate-100 min-h-screen w-full">
      <Sidebar />
      <main className="flex-1 p-8 overflow-auto">{children}</main>
    </div>
  );
};

function App() {
  const [analyticsData, setAnalyticsData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchAnalyticsData = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/analytics');
      if (!res.ok) {
        throw new Error('Failed to fetch analytics data from server');
      }
      const apiData = await res.json();
      setAnalyticsData(apiData);
    } catch (err) {
      setError(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAnalyticsData();
  }, []);

  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <MainLayout>
                  <AnalyticsDashboard
                    data={analyticsData}
                    isLoading={isLoading}
                    error={error}
                    onRefresh={fetchAnalyticsData}
                  />
                </MainLayout>
              </ProtectedRoute>
            }
          />

          <Route
            path="/"
            element={
              <MainLayout>
                <ContentIdeaAssistant />
              </MainLayout>
            }
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;