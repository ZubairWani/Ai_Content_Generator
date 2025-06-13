import React, { useState } from 'react';
import { Loader2, Sparkles, Target, Send, Zap, Activity, MessageCircle, TrendingUp } from 'lucide-react';

const ContentIdeaAssistant = () => {
  const [topic, setTopic] = useState('');
  const [niche, setNiche] = useState('fashion');
  const [result, setResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const contentNiches = [
    { value: 'fashion', label: 'Fashion & Style', icon: '👗' },
    { value: 'fitness', label: 'Fitness & Health', icon: '💪' },
    { value: 'finance', label: 'Finance & Money', icon: '💰' },
    { value: 'tech', label: 'Technology', icon: '📱' },
    { value: 'food', label: 'Food & Cooking', icon: '🍳' },
    { value: 'travel', label: 'Travel & Adventure', icon: '✈️' }
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!topic) {
      setError('Please enter a topic.');
      return;
    }

    setIsLoading(true);
    setError(null);
    setResult(null);

    try {
      const res = await fetch('/api/openai/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ topic, niche }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || 'Failed to generate content from the server.');
      }

      const generatedResult = await res.json();
      setResult(generatedResult);

    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center space-x-4">
        <div className="p-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl">
          <Sparkles className="w-8 h-8 text-white" />
        </div>
        <div>
          <h1 className="text-4xl font-bold text-slate-800">AI Content Generator</h1>
          <p className="text-slate-600">Create viral content ideas powered by AI</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 border-b border-slate-200">
          <h2 className="text-xl font-semibold text-slate-800 mb-2">Generate Your Next Viral Post</h2>
          <p className="text-slate-600">Tell us your topic and niche, and we'll create engaging content for you.</p>
        </div>
        
        <form onSubmit={handleSubmit} className="p-8 space-y-6">
          <div>
            <label htmlFor="topic" className="block text-sm font-semibold text-slate-700 mb-3">
              Content Topic
            </label>
            <div className="relative">
              <input
                type="text"
                id="topic"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                placeholder="e.g., 'Summer skincare routine for glowing skin'"
                className="w-full px-4 py-4 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all placeholder-slate-400"
              />
              <Target className="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
            </div>
          </div>

          <div>
            <label htmlFor="niche" className="block text-sm font-semibold text-slate-700 mb-3">
              Content Niche
            </label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {contentNiches.map((n) => (
                <label key={n.value} className="cursor-pointer">
                  <input
                    type="radio"
                    name="niche"
                    value={n.value}
                    checked={niche === n.value}
                    onChange={(e) => setNiche(e.target.value)}
                    className="sr-only"
                  />
                  <div className={`p-4 rounded-xl border-2 transition-all ${
                    niche === n.value 
                      ? 'border-blue-500 bg-blue-50 text-blue-700' 
                      : 'border-slate-200 hover:border-slate-300 text-slate-600'
                  }`}>
                    <div className="text-2xl mb-2">{n.icon}</div>
                    <div className="font-medium text-sm">{n.label}</div>
                  </div>
                </label>
              ))}
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold py-4 px-6 rounded-xl hover:from-blue-600 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center space-x-2"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                <span>Generating Magic...</span>
              </>
            ) : (
              <>
                <Send className="w-5 h-5" />
                <span>Generate Content Ideas</span>
              </>
            )}
          </button>
        </form>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-6 py-4 rounded-xl flex items-center space-x-3">
          <div className="w-2 h-2 bg-red-500 rounded-full"></div>
          <span>Error: {error}</span>
        </div>
      )}
      
      {result && (
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden animate-fade-in">
          <div className="bg-gradient-to-r from-green-50 to-blue-50 p-6 border-b border-slate-200">
            <div className="flex items-center space-x-3">
              <Sparkles className="w-6 h-6 text-green-600" />
              <h2 className="text-xl font-semibold text-slate-800">Your Generated Content ✨</h2>
            </div>
          </div>
          
          <div className="p-8 space-y-6">
            <div className="bg-gradient-to-r from-yellow-50 to-orange-50 p-6 rounded-xl border border-yellow-200">
              <h3 className="font-semibold text-lg text-slate-800 mb-3 flex items-center space-x-2">
                <Zap className="w-5 h-5 text-yellow-600" />
                <span>Hook / Opening Line</span>
              </h3>
              <p className="text-slate-700 text-lg italic">{result.hook}</p>
            </div>
            
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-xl border border-blue-200">
              <h3 className="font-semibold text-lg text-slate-800 mb-3 flex items-center space-x-2">
                <Activity className="w-5 h-5 text-blue-600" />
                <span>Reel Concept</span>
              </h3>
              <p className="text-slate-700 leading-relaxed">{result.reelIdea}</p>
            </div>
            
            <div className="bg-gradient-to-r from-green-50 to-teal-50 p-6 rounded-xl border border-green-200">
              <h3 className="font-semibold text-lg text-slate-800 mb-3 flex items-center space-x-2">
                <MessageCircle className="w-5 h-5 text-green-600" />
                <span>Engaging Caption</span>
              </h3>
              <p className="text-slate-700 leading-relaxed whitespace-pre-wrap">{result.caption}</p>
            </div>
            
            <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-6 rounded-xl border border-purple-200">
              <h3 className="font-semibold text-lg text-slate-800 mb-3 flex items-center space-x-2">
                <TrendingUp className="w-5 h-5 text-purple-600" />
                <span>Trending Hashtags</span>
              </h3>
              <div className="flex flex-wrap gap-2">
                {result.hashtags.map((tag, index) => (
                  <span key={index} className="bg-gradient-to-r from-purple-500 to-pink-500 text-white text-sm font-medium px-4 py-2 rounded-full">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ContentIdeaAssistant;