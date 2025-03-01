// src/components/pages/Resources.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  FaSearch, 
  FaBook, 
  FaVideo, 
  FaFileAlt, 
  FaHeadphones, 
  FaExclamationTriangle,
  FaChevronRight
} from 'react-icons/fa';

const Resources = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  
  // Mock resource data
  const resources = [
    {
      id: 1,
      title: 'Understanding Anxiety: Causes and Management',
      description: 'Learn about the root causes of anxiety and evidence-based strategies for managing symptoms.',
      type: 'article',
      category: 'anxiety',
      readTime: '8 min read',
      featured: true,
      image: 'https://images.unsplash.com/photo-1499209974431-9dddcece7f88?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
    },
    {
      id: 2,
      title: 'Mindfulness Meditation for Beginners',
      description: 'A step-by-step guide to starting a mindfulness practice, with exercises for daily life.',
      type: 'article',
      category: 'mindfulness',
      readTime: '6 min read',
      featured: true,
      image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
    },
    {
      id: 3,
      title: 'Introduction to Cognitive Behavioral Therapy',
      description: 'Understanding the principles of CBT and how it can help reshape negative thought patterns.',
      type: 'video',
      category: 'therapy',
      duration: '15 min',
      image: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
    },
    {
      id: 4,
      title: 'Sleep Hygiene: Improving Your Rest',
      description: 'Practical tips for better sleep habits and creating a restful environment.',
      type: 'article',
      category: 'sleep',
      readTime: '7 min read',
      image: 'https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
    },
    {
      id: 5,
      title: 'Managing Depression: Self-Care Strategies',
      description: 'Self-care approaches that can help manage depression symptoms alongside professional treatment.',
      type: 'article',
      category: 'depression',
      readTime: '10 min read',
      image: 'https://images.unsplash.com/photo-1535890696255-dd5bcd79e6df?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
    },
    {
      id: 6,
      title: 'Guided Relaxation for Stress Relief',
      description: 'A calming audio session to help reduce stress and promote relaxation.',
      type: 'audio',
      category: 'stress',
      duration: '18 min',
      image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
    },
    {
      id: 7,
      title: 'Building Healthy Relationships',
      description: 'Understanding the foundations of healthy relationships and improving communication.',
      type: 'article',
      category: 'relationships',
      readTime: '9 min read',
      image: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
    },
    {
      id: 8,
      title: 'Coping with Grief and Loss',
      description: 'Understanding the grief process and strategies for coping with loss.',
      type: 'pdf',
      category: 'grief',
      pages: '12 pages',
      image: 'https://images.unsplash.com/photo-1476231682828-37e571bc172f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
    }
  ];
  
  // Filter resources based on search and category
  const filteredResources = resources.filter(resource => {
    const matchesSearch = resource.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          resource.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = activeCategory === 'all' || resource.category === activeCategory;
    
    return matchesSearch && matchesCategory;
  });
  
  // Get featured resources
  const featuredResources = resources.filter(resource => resource.featured);
  
  // Resource type icon mapping
  const getResourceIcon = (type) => {
    switch(type) {
      case 'article':
        return <FaBook className="w-5 h-5" />;
      case 'video':
        return <FaVideo className="w-5 h-5" />;
      case 'audio':
        return <FaHeadphones className="w-5 h-5" />;
      case 'pdf':
        return <FaFileAlt className="w-5 h-5" />;
      default:
        return <FaBook className="w-5 h-5" />;
    }
  };
  
  // Categories for filter
  const categories = [
    { id: 'all', name: 'All Resources' },
    { id: 'anxiety', name: 'Anxiety' },
    { id: 'depression', name: 'Depression' },
    { id: 'mindfulness', name: 'Mindfulness' },
    { id: 'stress', name: 'Stress Management' },
    { id: 'sleep', name: 'Sleep' },
    { id: 'relationships', name: 'Relationships' },
    { id: 'therapy', name: 'Therapy Types' },
    { id: 'grief', name: 'Grief & Loss' }
  ];

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20">
          <div className="text-center">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              Mental Health Resources
            </h1>
            <p className="text-xl mb-8 text-indigo-100 max-w-3xl mx-auto">
              Access evidence-based articles, videos, and tools to support your mental wellbeing journey.
            </p>
            
            {/* Search Bar */}
      <div className="max-w-2xl mx-auto relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <FaSearch className="h-5 w-5 text-gray-400" />
        </div>
        <input
          type="text"
          className="block w-full pl-10 pr-3 py-3 border border-transparent rounded-md leading-5 bg-white bg-opacity-90 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-indigo-600"
          placeholder="Search for resources..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
    </div>
  </div>
</section>

{/* Crisis Resources Banner */}
<div className="bg-red-50 border-l-4 border-red-500 p-4 mx-4 sm:mx-6 lg:mx-8 my-6 max-w-7xl lg:mx-auto rounded-md">
  <div className="flex">
    <div className="flex-shrink-0">
      <FaExclamationTriangle className="h-5 w-5 text-red-500" />
    </div>
    <div className="ml-3">
      <p className="text-sm text-red-700">
        <span className="font-medium">Need immediate help?</span> If you're in crisis or having thoughts of suicide, call the National Suicide Prevention Lifeline at 988 or text HOME to 741741 to reach the Crisis Text Line.
        <Link to="/crisis-resources" className="ml-2 font-medium underline">
          View all crisis resources
        </Link>
      </p>
    </div>
  </div>
</div>

{/* Main Content */}
<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
  {/* Featured Resources */}
  <section className="mb-12">
    <h2 className="text-2xl font-bold text-gray-900 mb-6">Featured Resources</h2>
    <div className="grid md:grid-cols-2 gap-6">
      {featuredResources.map(resource => (
        <Link 
          key={resource.id} 
          to={`/resources/${resource.id}`} 
          className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 flex flex-col h-full"
        >
          <div className="h-48 overflow-hidden">
            <img 
              src={resource.image} 
              alt={resource.title} 
              className="w-full h-full object-cover"
            />
          </div>
          <div className="p-6 flex-grow">
            <div className="flex items-center mb-2">
              <span className="bg-indigo-100 text-indigo-800 text-xs font-medium px-2.5 py-0.5 rounded-full flex items-center">
                {getResourceIcon(resource.type)}
                <span className="ml-1 capitalize">{resource.type}</span>
              </span>
              <span className="ml-2 text-sm text-gray-500">
                {resource.readTime || resource.duration || resource.pages}
              </span>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">{resource.title}</h3>
            <p className="text-gray-600 mb-4">{resource.description}</p>
            <div className="text-indigo-600 font-medium flex items-center mt-auto">
              Read more <FaChevronRight className="ml-1 w-3 h-3" />
            </div>
          </div>
        </Link>
      ))}
    </div>
  </section>

  {/* Categories and Resources */}
  <div className="flex flex-col lg:flex-row">
    {/* Categories Sidebar */}
    <div className="w-full lg:w-64 mb-6 lg:mb-0 lg:mr-8">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Categories</h3>
      <nav className="space-y-1">
        {categories.map(category => (
          <button
            key={category.id}
            onClick={() => setActiveCategory(category.id)}
            className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-md ${
              activeCategory === category.id 
                ? 'bg-indigo-100 text-indigo-700' 
                : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            {category.name}
          </button>
        ))}
      </nav>
    </div>

    {/* Resources Grid */}
    <div className="flex-1">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">
        {activeCategory === 'all' ? 'All Resources' : categories.find(c => c.id === activeCategory)?.name}
      </h2>
      
      {filteredResources.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-lg">
          <p className="text-gray-500 mb-4">No resources found matching your criteria.</p>
          <button
            onClick={() => {
              setSearchTerm('');
              setActiveCategory('all');
            }}
            className="text-indigo-600 font-medium"
          >
            Clear filters
          </button>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredResources.map(resource => (
            <Link 
              key={resource.id} 
              to={`/resources/${resource.id}`} 
              className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 flex flex-col h-full"
            >
              <div className="h-40 overflow-hidden">
                <img 
                  src={resource.image} 
                  alt={resource.title} 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-4 flex-grow">
                <div className="flex items-center mb-2">
                  <span className="bg-indigo-100 text-indigo-800 text-xs font-medium px-2.5 py-0.5 rounded-full flex items-center">
                    {getResourceIcon(resource.type)}
                    <span className="ml-1 capitalize">{resource.type}</span>
                  </span>
                  <span className="ml-2 text-xs text-gray-500">
                    {resource.readTime || resource.duration || resource.pages}
                  </span>
					<h3 className="text-lg font-semibold text-gray-900 mb-1">{resource.title}</h3>
					<p className="text-sm text-gray-600 mb-3 line-clamp-2">{resource.description}</p>
					Read more <FaChevronRight className="ml-1 w-3 h-3" />
					</div>
				</div>
			</Link>
			))}
		</div>
		)}
		</div>
		</div>
        
        {/* Self-Assessment Tools Section */}
        <section className="my-12 bg-white rounded-xl p-8 shadow-sm">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Self-Assessment Tools</h2>
          <p className="text-gray-600 mb-6">
            These screening tools can help you better understand your symptoms and decide if you should seek professional support.
            Please note that these assessments are not diagnostic tools but can provide helpful insights.
          </p>
          
          <div className="grid md:grid-cols-3 gap-6">
            <div className="border border-gray-200 rounded-lg p-5 hover:border-indigo-300 transition-colors">
              <h3 className="font-semibold text-gray-900 mb-2">Anxiety Screening</h3>
              <p className="text-sm text-gray-600 mb-4">
                Evaluate symptoms of generalized anxiety disorder with this 7-question assessment.
              </p>
              <Link 
                to="/assessments/anxiety" 
                className="text-indigo-600 text-sm font-medium flex items-center"
              >
                Take assessment <FaChevronRight className="ml-1 w-3 h-3" />
              </Link>
            </div>
            
            <div className="border border-gray-200 rounded-lg p-5 hover:border-indigo-300 transition-colors">
              <h3 className="font-semibold text-gray-900 mb-2">Depression Screening</h3>
              <p className="text-sm text-gray-600 mb-4">
                Based on the PHQ-9, this assessment helps identify depression symptoms and their severity.
              </p>
              <Link 
                to="/assessments/depression" 
                className="text-indigo-600 text-sm font-medium flex items-center"
              >
                Take assessment <FaChevronRight className="ml-1 w-3 h-3" />
              </Link>
            </div>
            
            <div className="border border-gray-200 rounded-lg p-5 hover:border-indigo-300 transition-colors">
              <h3 className="font-semibold text-gray-900 mb-2">Stress Assessment</h3>
              <p className="text-sm text-gray-600 mb-4">
                Measure your current stress levels and identify potential stressors in your life.
              </p>
              <Link 
                to="/assessments/stress" 
                className="text-indigo-600 text-sm font-medium flex items-center"
              >
                Take assessment <FaChevronRight className="ml-1 w-3 h-3" />
              </Link>
            </div>
          </div>
        </section>
        
        {/* Newsletter Signup */}
        <section className="my-12 bg-indigo-50 rounded-xl p-8">
          <div className="md:flex md:items-center md:justify-between">
            <div className="md:w-2/3">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Stay Updated</h2>
              <p className="text-gray-600 mb-4 md:mb-0">
                Subscribe to receive new resources, wellness tips, and mental health insights delivered to your inbox.
              </p>
            </div>
            <div className="md:w-1/3">
              <form className="flex">
                <input
                  type="email"
                  className="flex-1 min-w-0 px-3 py-2 rounded-l-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="Your email address"
                />
                <button
                  type="submit"
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-r-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  Subscribe
                </button>
              </form>
              <p className="text-xs text-gray-500 mt-2">
                We respect your privacy. Unsubscribe at any time.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Resources;