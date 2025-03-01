// src/components/pages/ClientManagement.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { 
  FaSearch, 
  FaUser, 
  FaCalendarAlt, 
  FaComments, 
  FaFileAlt,
  FaPlus,
  FaSort,
  FaFilter,
  FaEllipsisH,
  FaUserPlus,
  FaChartLine,
  FaClock
} from 'react-icons/fa';

const ClientManagement = () => {
  const { currentUser } = useAuth();
  const [loading, setLoading] = useState(true);
  const [clients, setClients] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('lastSession');
  const [filterStatus, setFilterStatus] = useState('all');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedClient, setSelectedClient] = useState(null);
  
  // Mock client data
  const mockClients = [
    {
      id: 1,
      name: 'James Wilson',
      email: 'james.wilson@example.com',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80',
      status: 'active',
      lastSession: new Date(new Date().setDate(new Date().getDate() - 5)), // 5 days ago
      nextSession: new Date(new Date().setDate(new Date().getDate() + 2)), // 2 days from now
      sessionsCompleted: 8,
      issuesTags: ['anxiety', 'stress', 'work-life balance'],
      notes: 'Making good progress with anxiety management techniques. Needs to focus more on work boundaries.',
      startDate: new Date(new Date().setMonth(new Date().getMonth() - 3)) // 3 months ago
    },
    {
      id: 2,
      name: 'Emily Johnson',
      email: 'emily.johnson@example.com',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80',
      status: 'active',
      lastSession: new Date(new Date().setDate(new Date().getDate() - 1)), // 1 day ago
      nextSession: new Date(new Date().setDate(new Date().getDate() + 6)), // 6 days from now
      sessionsCompleted: 15,
      issuesTags: ['depression', 'grief', 'family'],
      notes: 'Continues to work through grief process. Family support improving. Medication seems to be helping with depression symptoms.',
      startDate: new Date(new Date().setMonth(new Date().getMonth() - 6)) // 6 months ago
    },
    {
      id: 3,
      name: 'Michael Chen',
      email: 'michael.chen@example.com',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80',
      status: 'inactive',
      lastSession: new Date(new Date().setDate(new Date().getDate() - 45)), // 45 days ago
      nextSession: null,
      sessionsCompleted: 3,
      issuesTags: ['relationship', 'communication'],
      notes: 'Stopped sessions after initial progress. Follow up recommended.',
      startDate: new Date(new Date().setMonth(new Date().getMonth() - 2)) // 2 months ago
    },
    {
      id: 4,
      name: 'Sarah Martinez',
      email: 'sarah.martinez@example.com',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80',
      status: 'active',
      lastSession: new Date(new Date().setDate(new Date().getDate() - 3)), // 3 days ago
      nextSession: new Date(new Date().setDate(new Date().getDate() + 4)), // 4 days from now
      sessionsCompleted: 12,
      issuesTags: ['anxiety', 'panic attacks', 'social anxiety'],
      notes: 'Exposure therapy showing good results. Panic attacks reduced in frequency.',
      startDate: new Date(new Date().setMonth(new Date().getMonth() - 4)) // 4 months ago
    },
    {
      id: 5,
      name: 'David Kim',
      email: 'david.kim@example.com',
      avatar: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80',
      status: 'new',
      lastSession: new Date(new Date().setDate(new Date().getDate() - 2)), // 2 days ago (initial session)
      nextSession: new Date(new Date().setDate(new Date().getDate() + 5)), // 5 days from now
      sessionsCompleted: 1,
      issuesTags: ['stress', 'sleep', 'work'],
      notes: 'Initial assessment completed. Sleep hygiene plan created. Experiencing significant work stress.',
      startDate: new Date(new Date().setDate(new Date().getDate() - 2)) // 2 days ago
    }
  ];
  
  // Load clients
  useEffect(() => {
    const fetchClients = async () => {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setClients(mockClients);
      setLoading(false);
    };
    
    fetchClients();
  }, []);
  
  // Filter and sort clients
  const filteredAndSortedClients = clients
    .filter(client => {
      // Search filter
      const matchesSearch = client.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                            client.email.toLowerCase().includes(searchTerm.toLowerCase());
      
      // Status filter
      const matchesStatus = filterStatus === 'all' || client.status === filterStatus;
      
      return matchesSearch && matchesStatus;
    })
    .sort((a, b) => {
      // Sort logic
      switch(sortBy) {
        case 'name':
          return a.name.localeCompare(b.name);
        case 'lastSession':
          return b.lastSession.getTime() - a.lastSession.getTime();
        case 'nextSession':
          // Handle null nextSession values
          if (!a.nextSession) return 1;
          if (!b.nextSession) return -1;
          return a.nextSession.getTime() - b.nextSession.getTime();
        case 'startDate':
          return b.startDate.getTime() - a.startDate.getTime();
        default:
          return 0;
      }
    });
  
// Format date helper
const formatDate = (date) => {
	if (!date) return 'Not scheduled';
	
	const today = new Date();
	const tomorrow = new Date();
	tomorrow.setDate(today.getDate() + 1);
	
	if (date.toDateString() === today.toDateString()) {
	  return `Today at ${date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
	} else if (date.toDateString() === tomorrow.toDateString()) {
	  return `Tomorrow at ${date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
	} else {
	  // Check if date is within the past week
	  const diffTime = Math.abs(today - date);
	  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
	  
	  if (diffDays <= 7 && date < today) {
		return `${diffDays} day${diffDays !== 1 ? 's' : ''} ago`;
	  } else {
		return date.toLocaleDateString('en-US', { 
		  month: 'short', 
		  day: 'numeric',
		  year: today.getFullYear() !== date.getFullYear() ? 'numeric' : undefined
		});
	  }
	}
  };
  
  // Get status badge styling
  const getStatusBadgeClass = (status) => {
	switch(status) {
	  case 'active':
		return 'bg-green-100 text-green-800';
	  case 'inactive':
		return 'bg-gray-100 text-gray-800';
	  case 'new':
		return 'bg-blue-100 text-blue-800';
	  default:
		return 'bg-gray-100 text-gray-800';
	}
  };
  
  if (loading) {
	return (
	  <div className="flex justify-center items-center min-h-screen bg-gray-50">
		<div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-500"></div>
	  </div>
	);
  }
  
  return (
	<div className="bg-gray-50 min-h-screen">
	  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
		<div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
		  <h1 className="text-2xl font-bold text-gray-900 mb-2 md:mb-0">Client Management</h1>
		  
		  <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
			<Link 
			  to="/add-client" 
			  className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md shadow-sm hover:bg-indigo-700"
			>
			  <FaUserPlus className="mr-2" /> Add New Client
			</Link>
		  </div>
		</div>
		
		{/* Search and Filters */}
		<div className="bg-white rounded-lg shadow-sm p-4 mb-6">
		  <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
			{/* Search */}
			<div className="w-full md:w-1/3 relative">
			  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
				<FaSearch className="h-4 w-4 text-gray-400" />
			  </div>
			  <input
				type="text"
				className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
				placeholder="Search clients by name or email"
				value={searchTerm}
				onChange={(e) => setSearchTerm(e.target.value)}
			  />
			</div>
			
			{/* Sort and Filter */}
			<div className="flex space-x-2">
			  <div className="relative">
				<button
				  className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
				  onClick={() => setShowFilters(!showFilters)}
				>
				  <FaFilter className="mr-2 h-4 w-4 text-gray-500" />
				  Filter
				</button>
				
				{showFilters && (
				  <div className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-10">
					<div className="py-1 px-3">
					  <div className="mb-2">
						<label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
						<select
						  className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
						  value={filterStatus}
						  onChange={(e) => setFilterStatus(e.target.value)}
						>
						  <option value="all">All Clients</option>
						  <option value="active">Active</option>
						  <option value="inactive">Inactive</option>
						  <option value="new">New</option>
						</select>
					  </div>
					  
					  <div className="mb-2">
						<label className="block text-sm font-medium text-gray-700 mb-1">Sort By</label>
						<select
						  className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
						  value={sortBy}
						  onChange={(e) => setSortBy(e.target.value)}
						>
						  <option value="lastSession">Last Session</option>
						  <option value="nextSession">Next Session</option>
						  <option value="name">Name</option>
						  <option value="startDate">Start Date</option>
						</select>
					  </div>
					  
					  <button
						className="w-full mt-2 px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
						onClick={() => setShowFilters(false)}
					  >
						Apply Filters
					  </button>
					</div>
				  </div>
				)}
			  </div>
			  
			  <div>
			  <select
          className="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
        >
          <option value="lastSession">Sort: Last Session</option>
          <option value="nextSession">Sort: Next Session</option>
          <option value="name">Sort: Name</option>
          <option value="startDate">Sort: Start Date</option>
        </select>
      </div>
    </div>
  </div>
</div>

{/* Client List */}
{filteredAndSortedClients.length === 0 ? (
  <div className="bg-white rounded-lg shadow-sm p-8 text-center">
    <div className="mx-auto h-16 w-16 rounded-full bg-indigo-100 flex items-center justify-center mb-4">
      <FaUser className="h-8 w-8 text-indigo-600" />
    </div>
    <h3 className="text-lg font-medium text-gray-900 mb-2">No clients found</h3>
    <p className="text-gray-500 mb-6">
      {searchTerm 
        ? "No clients match your search criteria." 
        : "You don't have any clients yet."}
    </p>
    <Link 
      to="/add-client" 
      className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md shadow-sm hover:bg-indigo-700"
    >
      <FaUserPlus className="mr-2" /> Add New Client
    </Link>
  </div>
) : (
  <div className="bg-white overflow-hidden shadow-sm rounded-lg">
    <ul className="divide-y divide-gray-200">
      {filteredAndSortedClients.map(client => (
        <li 
          key={client.id}
          className={`hover:bg-gray-50 transition-colors ${selectedClient === client.id ? 'bg-indigo-50' : ''}`}
        >
          <div className="px-6 py-5">
            <div className="flex flex-col md:flex-row md:items-center">
              {/* Client Basic Info */}
              <div className="flex items-center md:w-1/3">
                {client.avatar ? (
                  <img
                    src={client.avatar}
                    alt={client.name}
                    className="h-12 w-12 rounded-full object-cover"
                  />
                ) : (
                  <div className="h-12 w-12 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-500">
                    <FaUser className="h-6 w-6" />
                  </div>
                )}
                <div className="ml-4">
                  <h3 className="text-lg font-medium text-gray-900">{client.name}</h3>
                  <p className="text-sm text-gray-500">{client.email}</p>
                  <div className="mt-1">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusBadgeClass(client.status)}`}>
                      {client.status.charAt(0).toUpperCase() + client.status.slice(1)}
                    </span>
                  </div>
                </div>
              </div>
              
              {/* Session Info */}
              <div className="mt-4 md:mt-0 md:ml-6 md:w-1/3 space-y-1">
                <div className="flex items-center">
                  <FaClock className="h-4 w-4 text-gray-400 mr-2" />
                  <span className="text-sm text-gray-500">Last Session:</span>
                  <span className="ml-2 text-sm text-gray-900">{formatDate(client.lastSession)}</span>
                </div>
                <div className="flex items-center">
                  <FaCalendarAlt className="h-4 w-4 text-gray-400 mr-2" />
                  <span className="text-sm text-gray-500">Next Session:</span>
                  <span className="ml-2 text-sm text-gray-900">{formatDate(client.nextSession)}</span>
                </div>
                <div className="flex items-center">
                  <FaChartLine className="h-4 w-4 text-gray-400 mr-2" />
                  <span className="text-sm text-gray-500">Sessions Completed:</span>
                  <span className="ml-2 text-sm text-gray-900">{client.sessionsCompleted}</span>
                </div>
              </div>
              
              {/* Tags */}
              <div className="mt-4 md:mt-0 md:ml-6 md:w-1/3 flex flex-wrap">
                {client.issuesTags.map(tag => (
                  <span 
                    key={tag} 
                    className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800 mr-2 mb-2"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            
            {/* Expanded Details */}
            {selectedClient === client.id && (
              <div className="mt-4 pt-4 border-t border-gray-200">
                <div className="mb-4">
                  <h4 className="text-sm font-medium text-gray-500 mb-2">Notes</h4>
                  <p className="text-sm text-gray-900">{client.notes}</p>
                </div>
                
                <div className="flex flex-wrap gap-2">
                  <Link 
                    to={`/client/${client.id}`}
                    className="inline-flex items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    <FaUser className="mr-1.5" /> View Profile
                  </Link>
                  <Link 
                    to={`/schedule/${client.id}`}
                    className="inline-flex items-center px-3 py-1.5 border border-gray-300 text-sm font-medium rounded-md shadow-sm text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    <FaCalendarAlt className="mr-1.5" /> Schedule Session
                  </Link>
                  <Link 
                            to={`/messages?client=${client.id}`}
                            className="inline-flex items-center px-3 py-1.5 border border-gray-300 text-sm font-medium rounded-md shadow-sm text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                          >
                            <FaComments className="mr-1.5" /> Message
                          </Link>
                          <Link 
                            to={`/notes/${client.id}`}
                            className="inline-flex items-center px-3 py-1.5 border border-gray-300 text-sm font-medium rounded-md shadow-sm text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                          >
                            <FaFileAlt className="mr-1.5" /> Session Notes
                          </Link>
                        </div>
                      </div>
                    )}
                    
                    {/* Action Button */}
                    <div className="mt-4 text-right">
                      <button
                        onClick={() => setSelectedClient(selectedClient === client.id ? null : client.id)}
                        className="inline-flex items-center px-2 py-1 text-sm text-indigo-600 hover:text-indigo-900"
                      >
                        {selectedClient === client.id ? 'Show Less' : 'Show More'}
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}
        
        {/* Total Count */}
        {filteredAndSortedClients.length > 0 && (
          <div className="mt-4 text-right text-sm text-gray-500">
            Showing {filteredAndSortedClients.length} of {clients.length} clients
          </div>
        )}
      </div>
    </div>
  );
};

export default ClientManagement;