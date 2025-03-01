// src/components/pages/Dashboard.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { 
  FaCalendarAlt, 
  FaComments, 
  FaBook, 
  FaChartLine, 
  FaUserMd,
  FaRegSmile,
  FaRegMeh,
  FaRegFrown,
  FaCheck,
  FaArrowRight
} from 'react-icons/fa';

const Dashboard = () => {
  const { currentUser } = useAuth();
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    upcomingSessions: 0,
    unreadMessages: 0,
    completedSessions: 0,
    moodScore: 0
  });
  const [mood, setMood] = useState(null);

  // Simulate loading data
  useEffect(() => {
    // This would be an API call in a real app
    const fetchDashboardData = async () => {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock data
      setStats({
        upcomingSessions: 2,
        unreadMessages: 3,
        completedSessions: 8,
        moodScore: 75
      });
      
      setLoading(false);
    };
    
    fetchDashboardData();
}, []);

  const handleMoodSelection = (selectedMood) => {
    setMood(selectedMood);
    // In a real app, you would save this to your backend
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">
            Welcome back, {currentUser?.fullName?.split(' ')[0] || 'User'}
          </h1>
          <p className="text-gray-600 mt-1">
            {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
          </p>
        </div>
        
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* Upcoming Sessions */}
          <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-blue-100 text-blue-500 mr-4">
                <FaCalendarAlt className="w-6 h-6" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">Upcoming Sessions</p>
                <p className="text-2xl font-semibold text-gray-900">{stats.upcomingSessions}</p>
              </div>
            </div>
            <div className="mt-4">
              <Link 
                to="/appointments" 
                className="text-blue-500 hover:text-blue-600 text-sm font-medium flex items-center"
              >
                View schedule <FaArrowRight className="ml-1 w-3 h-3" />
              </Link>
            </div>
          </div>
          
          {/* Messages */}
          <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-purple-100 text-purple-500 mr-4">
                <FaComments className="w-6 h-6" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">Unread Messages</p>
                <p className="text-2xl font-semibold text-gray-900">{stats.unreadMessages}</p>
              </div>
            </div>
            <div className="mt-4">
              <Link 
                to="/messages" 
                className="text-purple-500 hover:text-purple-600 text-sm font-medium flex items-center"
              >
                Open inbox <FaArrowRight className="ml-1 w-3 h-3" />
              </Link>
            </div>
          </div>
          
          {/* Completed Sessions */}
          <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-green-100 text-green-500 mr-4">
                <FaCheck className="w-6 h-6" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">Completed Sessions</p>
                <p className="text-2xl font-semibold text-gray-900">{stats.completedSessions}</p>
              </div>
            </div>
            <div className="mt-4">
              <Link 
                to="/history" 
                className="text-green-500 hover:text-green-600 text-sm font-medium flex items-center"
              >
                View history <FaArrowRight className="ml-1 w-3 h-3" />
              </Link>
            </div>
          </div>
          
          {/* Wellness Score */}
          <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-indigo-100 text-indigo-500 mr-4">
                <FaChartLine className="w-6 h-6" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">Wellness Score</p>
                <p className="text-2xl font-semibold text-gray-900">{stats.moodScore}%</p>
              </div>
            </div>
            <div className="mt-4">
              <Link 
                to="/progress" 
                className="text-indigo-500 hover:text-indigo-600 text-sm font-medium flex items-center"
              >
                See progress <FaArrowRight className="ml-1 w-3 h-3" />
              </Link>
            </div>
          </div>
        </div>
        
        {/* Main Dashboard Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-8">
            {/* Daily Check-in */}
            <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">How are you feeling today?</h2>
              
              {mood ? (
                <div className="bg-green-50 text-green-700 p-4 rounded-lg">
                  <p className="font-medium flex items-center">
                    <FaCheck className="mr-2" />
          Thanks for checking in! Your mood has been recorded.
        </p>
      </div>
    ) : (
      <div className="flex flex-wrap gap-4">
        <button 
          onClick={() => handleMoodSelection('great')}
          className="flex flex-col items-center justify-center bg-gray-50 hover:bg-green-50 text-gray-700 hover:text-green-600 p-4 rounded-lg transition-colors w-24 h-24"
        >
          <FaRegSmile className="w-10 h-10 mb-2" />
          <span>Great</span>
        </button>
        
        <button 
          onClick={() => handleMoodSelection('okay')}
          className="flex flex-col items-center justify-center bg-gray-50 hover:bg-blue-50 text-gray-700 hover:text-blue-600 p-4 rounded-lg transition-colors w-24 h-24"
        >
          <FaRegMeh className="w-10 h-10 mb-2" />
          <span>Okay</span>
        </button>
        
        <button 
          onClick={() => handleMoodSelection('not-great')}
          className="flex flex-col items-center justify-center bg-gray-50 hover:bg-orange-50 text-gray-700 hover:text-orange-600 p-4 rounded-lg transition-colors w-24 h-24"
        >
          <FaRegFrown className="w-10 h-10 mb-2" />
          <span>Not Great</span>
        </button>
      </div>
    )}
  </div>
  
  {/* Upcoming Sessions */}
  <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
    <div className="flex justify-between items-center mb-4">
      <h2 className="text-lg font-semibold text-gray-900">Upcoming Sessions</h2>
      <Link 
        to="/appointments" 
        className="text-sm text-indigo-600 hover:text-indigo-500"
      >
        View all
      </Link>
    </div>
    
    {stats.upcomingSessions > 0 ? (
      <div className="space-y-4">
        <div className="flex items-start p-4 border border-gray-100 rounded-lg hover:bg-gray-50 transition-colors">
          <div className="p-2 bg-blue-100 text-blue-500 rounded-md mr-4">
            <FaCalendarAlt className="w-6 h-6" />
          </div>
          <div className="flex-grow">
            <p className="font-medium text-gray-900">Therapy Session with Dr. Johnson</p>
            <p className="text-gray-600 text-sm">Tomorrow, 2:00 PM - 3:00 PM</p>
            <div className="mt-2 flex">
              <button className="text-sm bg-indigo-600 text-white px-3 py-1 rounded-md hover:bg-indigo-700 mr-2">
                Join Session
              </button>
              <button className="text-sm bg-white text-gray-700 border border-gray-300 px-3 py-1 rounded-md hover:bg-gray-50">
                Reschedule
              </button>
            </div>
          </div>
        </div>
        
        <div className="flex items-start p-4 border border-gray-100 rounded-lg hover:bg-gray-50 transition-colors">
          <div className="p-2 bg-blue-100 text-blue-500 rounded-md mr-4">
            <FaCalendarAlt className="w-6 h-6" />
          </div>
          <div className="flex-grow">
            <p className="font-medium text-gray-900">Group Support Session: Anxiety Management</p>
            <p className="text-gray-600 text-sm">Friday, 6:00 PM - 7:30 PM</p>
            <div className="mt-2 flex">
              <button className="text-sm bg-indigo-600 text-white px-3 py-1 rounded-md hover:bg-indigo-700 mr-2">
                Join Session
              </button>
              <button className="text-sm bg-white text-gray-700 border border-gray-300 px-3 py-1 rounded-md hover:bg-gray-50">
                Reschedule
              </button>
            </div>
          </div>
        </div>
      </div>
    ) : (
      <div className="text-center py-8">
        <p className="text-gray-500 mb-4">You don't have any upcoming sessions</p>
        <Link 
          to="/find-professional" 
          className="inline-block bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
        >
          Find a Professional
        </Link>
      </div>
    )}
  </div>
</div>

{/* Right Column */}
<div className="space-y-8">
  {/* Recommended Resources */}
  <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
    <h2 className="text-lg font-semibold text-gray-900 mb-4">Recommended Resources</h2>
    
    <div className="space-y-4">
      <Link 
        to="/resources/anxiety-management" 
        className="flex items-start p-3 border border-gray-100 rounded-lg hover:bg-gray-50 transition-colors"
      >
        <div className="p-2 bg-purple-100 text-purple-500 rounded-md mr-3">
          <FaBook className="w-5 h-5" />
        </div>
        <div>
          <p className="font-medium text-gray-900">Anxiety Management Techniques</p>
          <p className="text-gray-600 text-sm">5 min read</p>
        </div>
      </Link>
      
      <Link 
        to="/resources/meditation-basics" 
        className="flex items-start p-3 border border-gray-100 rounded-lg hover:bg-gray-50 transition-colors"
      >
        <div className="p-2 bg-purple-100 text-purple-500 rounded-md mr-3">
          <FaBook className="w-5 h-5" />
        </div>
        <div>
          <p className="font-medium text-gray-900">Introduction to Meditation</p>
          <p className="text-gray-600 text-sm">8 min read</p>
        </div>
      </Link>
      
      <Link 
        to="/resources/sleep-improvement" 
        className="flex items-start p-3 border border-gray-100 rounded-lg hover:bg-gray-50 transition-colors"
      >
        <div className="p-2 bg-purple-100 text-purple-500 rounded-md mr-3">
          <FaBook className="w-5 h-5" />
        </div>
        <div>
          <p className="font-medium text-gray-900">Improving Sleep Quality</p>
                    <p className="text-gray-600 text-sm">7 min read</p>
                  </div>
                </Link>
              </div>
              
              <div className="mt-4">
                <Link 
                  to="/resources" 
                  className="text-sm text-indigo-600 hover:text-indigo-500 flex items-center justify-center"
                >
                  Browse all resources <FaArrowRight className="ml-1 w-3 h-3" />
                </Link>
              </div>
            </div>
            
            {/* Your Therapist */}
            <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Your Therapist</h2>
              
              <div className="flex items-center mb-4">
                <img 
                  src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80" 
                  alt="Dr. Sarah Johnson" 
                  className="w-16 h-16 rounded-full object-cover mr-4"
                />
                <div>
                  <h3 className="font-medium text-gray-900">Dr. Sarah Johnson</h3>
                  <p className="text-gray-600 text-sm">Licensed Clinical Psychologist</p>
                </div>
              </div>
              
              <div className="flex space-x-2 mb-4">
                <button className="flex-1 bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700 flex items-center justify-center">
                  <FaComments className="mr-2" /> Message
                </button>
                <button className="flex-1 bg-white text-gray-700 border border-gray-300 py-2 rounded-md hover:bg-gray-50 flex items-center justify-center">
                  <FaCalendarAlt className="mr-2" /> Schedule
                </button>
              </div>
              
              <Link 
                to="/profile/therapist" 
                className="text-sm text-indigo-600 hover:text-indigo-500 flex items-center justify-center"
              >
                View full profile <FaArrowRight className="ml-1 w-3 h-3" />
              </Link>
            </div>
            
            {/* Quick Actions */}
            <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
              
              <div className="grid grid-cols-2 gap-3">
                <Link 
                  to="/journal" 
                  className="bg-indigo-50 hover:bg-indigo-100 p-4 rounded-lg text-center"
                >
                  <span className="block text-indigo-600 font-medium">Journal Entry</span>
                </Link>
                
                <Link 
                  to="/exercises" 
                  className="bg-green-50 hover:bg-green-100 p-4 rounded-lg text-center"
                >
                  <span className="block text-green-600 font-medium">Mindfulness</span>
                </Link>
                
                <Link 
                  to="/goals" 
                  className="bg-blue-50 hover:bg-blue-100 p-4 rounded-lg text-center"
                >
                  <span className="block text-blue-600 font-medium">Set Goals</span>
                </Link>
                
                <Link 
                  to="/crisis-resources" 
                  className="bg-red-50 hover:bg-red-100 p-4 rounded-lg text-center"
                >
                  <span className="block text-red-600 font-medium">Crisis Help</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;