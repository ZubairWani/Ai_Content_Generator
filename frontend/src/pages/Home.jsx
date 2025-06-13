import React from 'react';
import { NavLink } from 'react-router-dom';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Lightbulb, TrendingUp, Users, Target, Download, RefreshCw, Heart, BarChart3, Loader2, Activity } from 'lucide-react';

const Home = ({ data, isLoading, error }) => {
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-center">
          <Loader2 className="w-12 h-12 animate-spin text-blue-500 mx-auto mb-4" />
          <p className="text-slate-600">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="bg-red-50 border border-red-200 text-red-700 px-6 py-4 rounded-xl flex items-center space-x-3">
        <div className="w-2 h-2 bg-red-500 rounded-full"></div>
        <span>Error loading data: {error?.message || 'Data could not be fetched.'}</span>
      </div>
    );
  }

  const engagementChartData = data.engagement.map((post, index) => ({
    post: `Post ${index + 1}`,
    likes: post.likes,
    comments: post.comments,
    shares: post.shares
  }));

  const totalLikes = data.engagement.reduce((sum, post) => sum + post.likes, 0);

  const stats = [
    { icon: <Lightbulb className="w-6 h-6" />, label: "Ideas Generated", value: "1,247", change: "+12%" },
    { icon: <TrendingUp className="w-6 h-6" />, label: "Engagement Rate", value: "8.4%", change: "+3.2%" },
    { icon: <Users className="w-6 h-6" />, label: "Followers", value: data.followers[data.followers.length - 1].toLocaleString(), change: data.weeklyGrowth },
    { icon: <Target className="w-6 h-6" />, label: "Conversion", value: "4.2%", change: "+0.8%" }
  ];

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold text-slate-800 mb-2">Welcome back! 👋</h1>
          <p className="text-slate-600">Here's what's happening with your content today.</p>
        </div>
        <div className="flex space-x-3">
          <button className="flex items-center space-x-2 px-4 py-2 bg-slate-100 text-slate-700 rounded-xl hover:bg-slate-200 transition-colors">
            <Download className="w-4 h-4" />
            <span>Export</span>
          </button>
          <button className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl hover:from-blue-600 hover:to-purple-700 transition-all">
            <RefreshCw className="w-4 h-4" />
            <span>Refresh</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-xl text-blue-600">
                {stat.icon}
              </div>
              <span className="text-sm font-medium text-green-600 bg-green-50 px-2 py-1 rounded-full">
                {stat.change}
              </span>
            </div>
            <h3 className="text-2xl font-bold text-slate-800 mb-1">{stat.value}</h3>
            <p className="text-slate-600 text-sm">{stat.label}</p>
          </div>
        ))}
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
              <h3 className="text-xl font-bold text-slate-800 mb-4">Quick Actions</h3>
              <div className="space-y-3">
                  <NavLink to="/idea-generator" className="flex items-center space-x-3 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl hover:from-blue-100 hover:to-purple-100 transition-all group">
                      <Lightbulb className="w-5 h-5 text-blue-600" />
                      <div>
                          <p className="font-medium text-slate-800">Generate Content Ideas</p>
                          <p className="text-sm text-slate-600">Wednesday (+12% reach)</p>
                      </div>
                  </NavLink>
                  <div className="flex items-center space-x-3 p-4 bg-purple-50 rounded-xl">
                      <Heart className="w-5 h-5 text-purple-600" />
                      <div>
                          <p className="font-medium text-slate-800">Avg. Likes per Post</p>
                          <p className="text-sm text-slate-600">{Math.round(totalLikes / data.engagement.length)}</p>
                      </div>
                  </div>
              </div>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
              <h3 className="text-xl font-bold text-slate-800 mb-4">Recent Activity</h3>
              <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <p className="text-sm text-slate-600">Generated 5 new content ideas</p>
                      <span className="text-xs text-slate-400 ml-auto">2 min ago</span>
                  </div>
                  <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <p className="text-sm text-slate-600">Analytics data updated</p>
                      <span className="text-xs text-slate-400 ml-auto">1 hour ago</span>
                  </div>
                  <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                      <p className="text-sm text-slate-600">New follower milestone reached</p>
                      <span className="text-xs text-slate-400 ml-auto">3 hours ago</span>
                  </div>
              </div>
          </div>
      </div>


      <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-slate-800">Post Engagement Overview</h2>
          <div className="flex items-center space-x-2 text-sm text-slate-600">
            <Activity className="w-4 h-4" />
            <span>Recent 5 posts</span>
          </div>
        </div>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={engagementChartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
            <XAxis dataKey="post" axisLine={false} tickLine={false} />
            <YAxis axisLine={false} tickLine={false} />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: 'white', 
                border: '1px solid #e2e8f0', 
                borderRadius: '12px',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
              }} 
            />
            <Legend />
            <Bar dataKey="likes" fill="#3b82f6" radius={[4, 4, 0, 0]} />
            <Bar dataKey="comments" fill="#10b981" radius={[4, 4, 0, 0]} />
            <Bar dataKey="shares" fill="#8b5cf6" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Home;