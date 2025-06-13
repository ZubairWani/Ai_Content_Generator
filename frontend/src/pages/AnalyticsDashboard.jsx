import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import {
  BarChart3,
  Users,
  Heart,
  TrendingUp,
  Activity,
  Calendar,
  Download,
  Clock,
  Star,
  Target,
  Loader2,
  RefreshCw,
  Lightbulb
} from 'lucide-react';
import StatCard from '../components/statsCard/StatCard';

const AnalyticsDashboard = ({ data, isLoading, error, onRefresh }) => {
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await onRefresh();
    setTimeout(() => setIsRefreshing(false), 500);
  };

  const handleExport = () => {
    if (!data) return;

    const headers = ['Post', 'Likes', 'Comments', 'Shares'];
    const rows = data.engagement.map(post =>
      [post.post, post.likes, post.comments, post.shares].join(',')
    );
    const csvContent = [headers.join(','), ...rows].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', 'analytics_report.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (isLoading && !isRefreshing) {
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
        <span>{error ? error.message : 'Data could not be fetched.'}</span>
      </div>
    );
  }

  const followerChartData = data.followers.map((count, index) => ({
    day: `Day ${index + 1}`,
    followers: count,
  }));

  const engagementChartData = data.engagement.map((post, index) => ({
    post: `Post ${index + 1}`,
    likes: post.likes,
    comments: post.comments,
    shares: post.shares
  }));

  const totalLikes = data.engagement.reduce((sum, post) => sum + post.likes, 0);
  const totalComments = data.engagement.reduce((sum, post) => sum + post.comments, 0);

  const engagementRate = (((totalLikes + totalComments) / data.engagement.length) / data.followers[data.followers.length - 1] * 100).toFixed(2);

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold text-slate-800 mb-2">Welcome back! 👋</h1>
          <p className="text-slate-600">Here's your comprehensive performance overview.</p>
        </div>
        <div className="flex space-x-3">
          <button className="flex items-center space-x-2 px-4 py-2 bg-slate-100 text-slate-700 rounded-xl hover:bg-slate-200 transition-colors">
            <Calendar className="w-4 h-4" />
            <span>Last 7 Days</span>
          </button>
          <button
            onClick={handleRefresh}
            disabled={isRefreshing}
            className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl hover:from-blue-600 hover:to-purple-700 transition-all disabled:opacity-75"
          >
            <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin' : ''}`} />
            <span>{isRefreshing ? 'Refreshing...' : 'Refresh'}</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          icon={<Users className="w-6 h-6" />}
          title="Total Followers"
          value={data.followers[data.followers.length - 1].toLocaleString()}
          change={data.weeklyGrowth}
          trend="up"
          color="blue"
        />
        <StatCard
          icon={<Heart className="w-6 h-6" />}
          title="Engagement Rate"
          value={`${engagementRate}%`}
          change="+1.2%"
          trend="up"
          color="red"
        />
        <StatCard
          icon={<TrendingUp className="w-6 h-6" />}
          title="Total Reach"
          value={data.totalReach}
          change="+8.4%"
          trend="up"
          color="green"
        />
        <StatCard
          icon={<Activity className="w-6 h-6" />}
          title="Impressions"
          value={data.impressions}
          change="+15.3%"
          trend="up"
          color="purple"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-slate-800">Follower Growth</h2>
            <div className="flex items-center space-x-2 text-sm text-slate-600">
              <TrendingUp className="w-4 h-4 text-green-500" />
              <span>Last 7 days</span>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={followerChartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="day" axisLine={false} tickLine={false} />
              <YAxis axisLine={false} tickLine={false} />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'white',
                  border: '1px solid #e2e8f0',
                  borderRadius: '12px',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                }}
              />
              <Line
                type="monotone"
                dataKey="followers"
                stroke="url(#colorGradient)"
                strokeWidth={3}
                dot={{ fill: '#3b82f6', strokeWidth: 0, r: 6 }}
                activeDot={{ r: 8, fill: '#1d4ed8' }}
              />
              <defs>
                <linearGradient id="colorGradient" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#3b82f6" />
                  <stop offset="100%" stopColor="#8b5cf6" />
                </linearGradient>
              </defs>
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
          <h2 className="text-xl font-bold text-slate-800 mb-6">Key Insights</h2>
          <div className="space-y-4">
            <div className="flex items-center space-x-3 p-4 bg-blue-50 rounded-xl">
              <Clock className="w-5 h-5 text-blue-600" />
              <div>
                <p className="font-medium text-slate-800">Best Time to Post</p>
                <p className="text-sm text-slate-600">{data.bestPostTime}</p>
              </div>
            </div>
            <div className="flex items-center space-x-3 p-4 bg-green-50 rounded-xl">
              <TrendingUp className="w-5 h-5 text-green-600" />
              <div>
                <p className="font-medium text-slate-800">Top Performing Day</p>
                <p className="text-sm text-slate-600">Wednesday</p>
              </div>
            </div>
            <div className="flex items-center space-x-3 p-4 bg-purple-50 rounded-xl">
              <Star className="w-5 h-5 text-purple-600" />
              <div>
                <p className="font-medium text-slate-800">Avg. Post Engagement</p>
                <p className="text-sm text-slate-600">{Math.round((totalLikes + totalComments) / data.engagement.length)} interactions</p>
              </div>
            </div>
            <div className="flex items-center space-x-3 p-4 bg-orange-50 rounded-xl">
              <Target className="w-5 h-5 text-orange-600" />
              <div>
                <p className="font-medium text-slate-800">Growth Goal</p>
                <p className="text-sm text-slate-600">87% to 1,500 followers</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-slate-800">Post Engagement Breakdown</h2>
          <div className="flex items-center space-x-2 text-sm text-slate-600">
            <Heart className="w-4 h-4 text-red-500" />
            <span>Last 5 posts</span>
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
            <Bar dataKey="likes" fill="#ef4444" radius={[4, 4, 0, 0]} />
            <Bar dataKey="comments" fill="#3b82f6" radius={[4, 4, 0, 0]} />
            <Bar dataKey="shares" fill="#10b981" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
        <div className="flex justify-center space-x-6 mt-4">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
            <span className="text-sm text-slate-600">Likes</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
            <span className="text-sm text-slate-600">Comments</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            <span className="text-sm text-slate-600">Shares</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
          <h3 className="text-xl font-bold text-slate-800 mb-4">Quick Actions</h3>
          <div className="space-y-3">
            <NavLink to="/" className="flex items-center space-x-3 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl hover:from-blue-100 hover:to-purple-100 transition-all group">
              <Lightbulb className="w-5 h-5 text-blue-600" />
              <div>
                <p className="font-medium text-slate-800">Generate New Content Ideas</p>
                <p className="text-sm text-slate-600">Use AI to spark creativity</p>
              </div>
            </NavLink>
            <button
              onClick={handleExport}
              className="w-full flex items-center space-x-3 p-4 bg-green-50 rounded-xl hover:bg-green-100 transition-all text-left"
            >
              <Download className="w-5 h-5 text-green-600" />
              <div>
                <p className="font-medium text-slate-800">Export Full Report</p>
                <p className="text-sm text-slate-600">Download engagement data as a CSV</p>
              </div>
            </button>
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
              <p className="text-sm text-slate-600">Dashboard data refreshed</p>
              <span className="text-xs text-slate-400 ml-auto">1 hour ago</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
              <p className="text-sm text-slate-600">New follower milestone: 1.4K!</p>
              <span className="text-xs text-slate-400 ml-auto">3 hours ago</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsDashboard;