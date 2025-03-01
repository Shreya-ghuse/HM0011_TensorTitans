// src/components/pages/Appointments.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { 
  FaCalendarAlt, 
  FaVideo, 
  FaPhone, 
  FaMapMarkerAlt,
  FaEllipsisH,
  FaPlus,
  FaChevronLeft,
  FaChevronRight,
  FaUser,
  FaClock,
  FaCheckCircle,
  FaRegCalendarCheck
} from 'react-icons/fa';

const Appointments = () => {
  const { currentUser } = useAuth();
  const [loading, setLoading] = useState(true);
  const [appointments, setAppointments] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [calendarView, setCalendarView] = useState('upcoming'); // 'upcoming', 'week', 'month'
  const [showDetails, setShowDetails] = useState(null); // ID of appointment to show details for

  // Mock appointment data
  const mockAppointments = [
    {
      id: 1,
      title: 'Therapy Session',
      provider: {
        id: 101,
        name: 'Dr. Sarah Johnson',
        specialty: 'Clinical Psychologist',
        avatar: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80'
      },
      date: new Date(new Date().setDate(new Date().getDate() + 1)), // Tomorrow
      startTime: '14:00',
      endTime: '15:00',
      type: 'video',
      status: 'confirmed',
      notes: 'Follow-up on anxiety management techniques discussed last session.'
    },
    {
      id: 2,
      title: 'Group Support Session',
      provider: {
        id: 102,
        name: 'Anxiety Management Group',
        specialty: 'Support Group',
        participants: 8,
        facilitator: 'Dr. Michael Rodriguez'
      },
      date: new Date(new Date().setDate(new Date().getDate() + 3)), // In 3 days
      startTime: '18:00',
      endTime: '19:30',
      type: 'video',
      status: 'confirmed',
      notes: 'Weekly group session focusing on coping strategies for anxiety.'
    },
    {
      id: 3,
      title: 'Medication Review',
      provider: {
        id: 103,
        name: 'Dr. Lisa Chen',
        specialty: 'Psychiatrist',
        avatar: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80'
      },
      date: new Date(new Date().setDate(new Date().getDate() + 7)), // In a week
      startTime: '10:30',
      endTime: '11:00',
      type: 'phone',
      status: 'confirmed',
      notes: 'Monthly check-in to review medication effectiveness and any side effects.'
    },
    {
      id: 4,
      title: 'In-Person Therapy',
      provider: {
        id: 101,
        name: 'Dr. Sarah Johnson',
        specialty: 'Clinical Psychologist',
        avatar: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80'
      },
      date: new Date(new Date().setDate(new Date().getDate() + 14)), // In 2 weeks
      startTime: '15:30',
      endTime: '16:30',
      type: 'in-person',
      location: '123 Therapy Center, Suite 300, San Francisco, CA',
      status: 'confirmed',
      notes: 'Monthly in-person session.'
    },
    {
      id: 5,
      title: 'Wellness Check-in',
      provider: {
        id: 104,
        name: 'Jordan Taylor',
        specialty: 'Mental Health Coach',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80'
      },
      date: new Date(new Date().setDate(new Date().getDate() - 2)), // 2 days ago
      startTime: '13:00',
      endTime: '13:30',
      type: 'video',
      status: 'completed',
      notes: 'Brief check-in to discuss progress with wellness goals.'
    }
  ];

  // Load appointments
  useEffect(() => {
    const fetchAppointments = async () => {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Sort appointments by date
      const sortedAppointments = [...mockAppointments].sort((a, b) => 
        a.date.getTime() - b.date.getTime()
      );
      
      setAppointments(sortedAppointments);
      setLoading(false);
    };
    
    fetchAppointments();
  }, []);

  // Filter appointments based on view
  const filteredAppointments = appointments.filter(appointment => {
    if (calendarView === 'upcoming') {
      // Show all future appointments
      return appointment.date >= new Date().setHours(0, 0, 0, 0);
    } else if (calendarView === 'week') {
      // Show appointments in the selected week
      const startOfWeek = new Date(selectedDate);
      startOfWeek.setDate(selectedDate.getDate() - selectedDate.getDay());
      startOfWeek.setHours(0, 0, 0, 0);
      
      const endOfWeek = new Date(startOfWeek);
      endOfWeek.setDate(startOfWeek.getDate() + 6);
      endOfWeek.setHours(23, 59, 59, 999);
      
      return appointment.date >= startOfWeek && appointment.date <= endOfWeek;
    } else if (calendarView === 'month') {
      // Show appointments in the selected month
      return appointment.date.getMonth() === selectedDate.getMonth() && 
             appointment.date.getFullYear() === selectedDate.getFullYear();
    }
    return true;
  });

  // Helper function to format date
  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', { 
      weekday: 'long', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  // Helper function to get appointment type icon
  const getAppointmentTypeIcon = (type) => {
    switch(type) {
      case 'video':
        return <FaVideo className="w-4 h-4" />;
      case 'phone':
        return <FaPhone className="w-4 h-4" />;
      case 'in-person':
        return <FaMapMarkerAlt className="w-4 h-4" />;
      default:
        return <FaCalendarAlt className="w-4 h-4" />;
    }
  };

  // Helper to get type label
const getAppointmentTypeLabel = (type) => {
	switch(type) {
	  case 'video':
		return 'Video Call';
	  case 'phone':
		return 'Phone Call';
	  case 'in-person':
		return 'In-Person';
	  default:
		return 'Appointment';
	}
  };
  
  // Navigate to previous/next time period
  const navigatePrevious = () => {
	const newDate = new Date(selectedDate);
	if (calendarView === 'week') {
	  newDate.setDate(newDate.getDate() - 7);
	} else if (calendarView === 'month') {
	  newDate.setMonth(newDate.getMonth() - 1);
	}
	setSelectedDate(newDate);
  };
  
  const navigateNext = () => {
	const newDate = new Date(selectedDate);
	if (calendarView === 'week') {
	  newDate.setDate(newDate.getDate() + 7);
	} else if (calendarView === 'month') {
	  newDate.setMonth(newDate.getMonth() + 1);
	}
	setSelectedDate(newDate);
  };
  
  // Get current view title
  const getViewTitle = () => {
	if (calendarView === 'upcoming') {
	  return 'Upcoming Appointments';
	} else if (calendarView === 'week') {
	  const startOfWeek = new Date(selectedDate);
	  startOfWeek.setDate(selectedDate.getDate() - selectedDate.getDay());
	  
	  const endOfWeek = new Date(startOfWeek);
	  endOfWeek.setDate(startOfWeek.getDate() + 6);
	  
	  return `${startOfWeek.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} - ${endOfWeek.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}`;
	} else if (calendarView === 'month') {
	  return selectedDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
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
		  <h1 className="text-2xl font-bold text-gray-900 mb-2 md:mb-0">My Sessions</h1>
		  
		  <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
			<div className="inline-flex rounded-md shadow-sm">
			  <button
				onClick={() => setCalendarView('upcoming')}
				className={`px-4 py-2 text-sm font-medium rounded-l-md ${
				  calendarView === 'upcoming' 
					? 'bg-indigo-600 text-white' 
					: 'bg-white text-gray-700 hover:bg-gray-50'
				}`}
			  >
				Upcoming
			  </button>
			  <button
				onClick={() => setCalendarView('week')}
				className={`px-4 py-2 text-sm font-medium ${
				  calendarView === 'week' 
					? 'bg-indigo-600 text-white' 
					: 'bg-white text-gray-700 hover:bg-gray-50'
				}`}
			  >
				Week
			  </button>
			  <button
				onClick={() => setCalendarView('month')}
				className={`px-4 py-2 text-sm font-medium rounded-r-md ${
				  calendarView === 'month' 
					? 'bg-indigo-600 text-white' 
					: 'bg-white text-gray-700 hover:bg-gray-50'
				}`}
			  >
				Month
			  </button>
			</div>
			
			<Link 
			  to="/schedule-appointment" 
			  className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md shadow-sm hover:bg-indigo-700"
			>
			  <FaPlus className="mr-2" /> Schedule Session
			</Link>
		  </div>
		</div>
		
		{/* Calendar Navigation */}
		{calendarView !== 'upcoming' && (
		  <div className="flex items-center justify-between mb-6 bg-white p-4 rounded-lg shadow-sm">
			<button
			  onClick={navigatePrevious}
			  className="p-2 rounded-full hover:bg-gray-100"
			>
			  <FaChevronLeft className="h-5 w-5 text-gray-600" />
			</button>
			
			<h2 className="text-lg font-medium text-gray-900">
			  {getViewTitle()}
			</h2>
			
			<button
			  onClick={navigateNext}
			  className="p-2 rounded-full hover:bg-gray-100"
			>
			  <FaChevronRight className="h-5 w-5 text-gray-600" />
			</button>
		  </div>
		)}
		
		{/* Appointments List */}
		{filteredAppointments.length === 0 ? (
		  <div className="bg-white rounded-lg shadow-sm p-8 text-center">
			<div className="mx-auto h-16 w-16 rounded-full bg-indigo-100 flex items-center justify-center mb-4">
			  <FaRegCalendarCheck className="h-8 w-8 text-indigo-600" />
			</div>
			<h3 className="text-lg font-medium text-gray-900 mb-2">No appointments scheduled</h3>
			<p className="text-gray-500 mb-6">
			  {calendarView === 'upcoming' 
				? "You don't have any upcoming appointments." 
				: "No appointments found for this time period."}
			</p>
			<Link 
			  to="/schedule-appointment" 
			  className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md shadow-sm hover:bg-indigo-700"
			>
			  <FaPlus className="mr-2" /> Schedule a Session
			</Link>
		  </div>
		) : (
		  <div className="space-y-4">
			{filteredAppointments.map(appointment => (
			  <div 
				key={appointment.id} 
				className="bg-white rounded-lg shadow-sm overflow-hidden"
			  >
				{/* Appointment Header */}
<div 
  className={`px-6 py-4 border-l-4 ${
    appointment.status === 'completed' 
      ? 'border-gray-300 bg-gray-50' 
      : appointment.date < new Date() 
        ? 'border-red-500' 
        : 'border-indigo-500'
  }`}
>
  <div className="flex flex-col sm:flex-row sm:items-center justify-between">
    <div>
      <div className="flex items-center">
        <h3 className="text-lg font-medium text-gray-900">
          {appointment.title}
        </h3>
        <span className={`ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
          appointment.status === 'completed' 
            ? 'bg-gray-100 text-gray-800' 
            : 'bg-green-100 text-green-800'
        }`}>
          {appointment.status === 'completed' ? 'Completed' : 'Confirmed'}
        </span>
      </div>
      <p className="text-sm text-gray-500 mt-1">
        {formatDate(appointment.date)} • {appointment.startTime} - {appointment.endTime}
      </p>
    </div>
    
    <div className="flex items-center mt-3 sm:mt-0">
      <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-indigo-50 text-indigo-700 mr-2">
        {getAppointmentTypeIcon(appointment.type)}
        <span className="ml-1">{getAppointmentTypeLabel(appointment.type)}</span>
      </span>
      
      <button 
        onClick={() => setShowDetails(showDetails === appointment.id ? null : appointment.id)}
        className="p-2 rounded-full text-gray-400 hover:text-gray-500 hover:bg-gray-100"
      >
        {showDetails === appointment.id ? (
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 15l7-7 7 7" />
          </svg>
        ) : (
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
          </svg>
        )}
      </button>
    </div>
  </div>
</div>

{/* Appointment Details (Collapsible) */}
{showDetails === appointment.id && (
  <div className="px-6 py-4 bg-gray-50 border-t border-gray-100">
    <div className="flex flex-col md:flex-row">
      <div className="md:w-1/2 mb-4 md:mb-0 md:pr-4">
        <h4 className="text-sm font-medium text-gray-500 mb-2">Provider</h4>
        <div className="flex items-center">
          {appointment.provider.avatar ? (
            <img
              src={appointment.provider.avatar}
              alt={appointment.provider.name}
              className="h-10 w-10 rounded-full object-cover mr-3"
            />
          ) : (
            <div className="h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-500 mr-3">
              <FaUser className="h-5 w-5" />
            </div>
          )}
          <div>
            <p className="font-medium text-gray-900">{appointment.provider.name}</p>
            <p className="text-sm text-gray-500">{appointment.provider.specialty}</p>
            {appointment.provider.participants && (
              <p className="text-xs text-indigo-600 mt-1">
                {appointment.provider.participants} participants • Facilitated by {appointment.provider.facilitator}
              </p>
            )}
          </div>
        </div>
      </div>
      
      <div className="md:w-1/2 md:border-l md:border-gray-200 md:pl-4">
        <h4 className="text-sm font-medium text-gray-500 mb-2">Session Details</h4>
        <div className="space-y-2">
          <div className="flex items-start">
            <FaClock className="h-4 w-4 text-gray-400 mt-0.5 mr-2" />
            <div>
              <p className="text-sm text-gray-900">
                {formatDate(appointment.date)}
              </p>
              <p className="text-sm text-gray-700">
                {appointment.startTime} - {appointment.endTime}
              </p>
            </div>
          </div>
          
          <div className="flex items-start">
            {getAppointmentTypeIcon(appointment.type)}
            <span className="ml-2 text-sm text-gray-900">{getAppointmentTypeLabel(appointment.type)}</span>
          </div>
          
          {appointment.type === 'in-person' && appointment.location && (
            <div className="flex items-start">
              <FaMapMarkerAlt className="h-4 w-4 text-gray-400 mt-0.5 mr-2" />
              <span className="text-sm text-gray-900">{appointment.location}</span>
            </div>
          )}
          
          {appointment.notes && (
            <div className="pt-2">
              <h5 className="text-xs font-medium text-gray-500 mb-1">Notes</h5>
              <p className="text-sm text-gray-900">{appointment.notes}</p>
            </div>
          )}
        </div>
      </div>
    </div>
    
    {/* Action Buttons */}
    {appointment.status !== 'completed' && (
      <div className="mt-4 pt-4 border-t border-gray-200 flex flex-wrap gap-2">
        {appointment.type === 'video' && (
          <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
            <FaVideo className="mr-2" /> Join Session
          </button>
        )}
        
        <button className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md shadow-sm text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                          Reschedule
                        </button>
                        
                        <button className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md shadow-sm text-red-700 bg-white hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500">
                          Cancel
                        </button>
                      </div>
                    )}
                  </div>
                )}
                
                {/* Quick Actions (Always Visible) */}
                {appointment.status !== 'completed' && !showDetails && (
                  <div className="px-6 py-3 bg-gray-50 border-t border-gray-100 flex flex-wrap gap-2">
                    {appointment.type === 'video' && (
                      <button className="inline-flex items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                        <FaVideo className="mr-1.5" /> Join Session
                      </button>
                    )}
                    
                    <button className="inline-flex items-center px-3 py-1.5 border border-gray-300 text-sm font-medium rounded-md shadow-sm text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                      Reschedule
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
        
        {/* Past Appointments Link */}
        {calendarView === 'upcoming' && filteredAppointments.length > 0 && (
          <div className="mt-6 text-center">
            <Link 
              to="/appointment-history" 
              className="inline-flex items-center text-indigo-600 hover:text-indigo-500"
            >
              <FaCheckCircle className="mr-1.5" />
              View past appointments
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Appointments;