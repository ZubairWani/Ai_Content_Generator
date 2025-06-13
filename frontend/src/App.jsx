import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import ContentIdeaAssistant from './pages/ContentIdeaAssistant';
import AnalyticsDashboard from './pages/AnalyticsDashboard';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Sidebar from './components/sidebar/sidebar';
import MobileMenuBar from './components/MobileMenuBar'; 
import { Menu, X } from 'lucide-react'; 

const MainLayout = ({ children, isSidebarOpen, setIsSidebarOpen }) => {
  return (
    <div className="relative flex bg-gradient-to-br from-slate-50 to-slate-100 min-h-screen w-full">
      <Sidebar isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />

      <button
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        className="lg:hidden fixed top-4 right-4 z-50 p-2 bg-slate-800 text-white rounded-full shadow-lg"
        aria-label="Toggle menu"
      >
        {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      <main className="flex-1 p-4 sm:p-8 overflow-auto pb-24 lg:pb-8">
        {children}
      </main>

      <MobileMenuBar />
    </div>
  );
};

function App() {
  const [analyticsData, setAnalyticsData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

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
                <MainLayout isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen}>
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
              <MainLayout isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen}>
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