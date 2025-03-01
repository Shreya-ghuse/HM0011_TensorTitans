// src/components/pages/Messages.js
import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '../hooks/useAuth';
import { 
  FaSearch, 
  FaPaperPlane, 
  FaPaperclip, 
  FaEllipsisV, 
  FaVideo,
  FaPhone,
  FaUser,
  FaCircle,
  FaComments
} from 'react-icons/fa';

const Messages = () => {
  const { currentUser } = useAuth();
  const [loading, setLoading] = useState(true);
  const [conversations, setConversations] = useState([]);
  const [activeConversation, setActiveConversation] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const messagesEndRef = useRef(null);
  
  // Mock data for conversations
  const mockConversations = [
    {
      id: 1,
      recipient: {
        id: 101,
        name: 'Dr. Sarah Johnson',
        avatar: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80',
        role: 'Therapist',
        isOnline: true,
        lastSeen: null
      },
      lastMessage: {
        text: 'How have you been feeling since our last session?',
        timestamp: '10:30 AM',
        isRead: true,
        sender: 'them'
      },
      unreadCount: 0
    },
    {
      id: 2,
      recipient: {
        id: 102,
        name: 'Dr. Michael Rodriguez',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80',
        role: 'Psychiatrist',
        isOnline: false,
        lastSeen: '2 hours ago'
      },
      lastMessage: {
        text: 'Your prescription has been renewed. Let me know if you have any questions.',
        timestamp: 'Yesterday',
        isRead: false,
        sender: 'them'
      },
      unreadCount: 1
    },
    {
      id: 3,
      recipient: {
        id: 103,
        name: 'Support Group: Anxiety',
        avatar: null,
        role: 'Group',
        isOnline: true,
        lastSeen: null,
        participants: 8
      },
      lastMessage: {
        text: 'Lisa: I found the breathing technique really helpful!',
        timestamp: '2 days ago',
        isRead: true,
        sender: 'them'
      },
      unreadCount: 0
    }
  ];
  
  // Mock data for messages in a conversation
  const mockMessages = [
    {
      id: 1,
      text: 'Hello! How are you feeling today?',
      timestamp: '10:00 AM',
      sender: 'them',
      senderName: 'Dr. Sarah Johnson',
      isRead: true
    },
    {
      id: 2,
      text: "I'm doing better than last week. The exercises you suggested have been helping with my anxiety.",
      timestamp: '10:05 AM',
      sender: 'me',
      isRead: true
    },
    {
      id: 3,
      text: "That's great to hear! Can you tell me more about which exercises you found most helpful?",
      timestamp: '10:10 AM',
      sender: 'them',
      senderName: 'Dr. Sarah Johnson',
      isRead: true
    },
    {
      id: 4,
      text: 'The deep breathing and progressive muscle relaxation techniques have been the most effective. I use them whenever I start feeling overwhelmed.',
      timestamp: '10:15 AM',
      sender: 'me',
      isRead: true
    },
    {
      id: 5,
      text: 'Excellent! Those are great tools for managing acute anxiety. Have you been keeping up with your anxiety journal as well?',
      timestamp: '10:20 AM',
      sender: 'them',
      senderName: 'Dr. Sarah Johnson',
      isRead: true
    },
    {
      id: 6,
      text: "Yes, I've been writing in it every evening. It's helping me identify some patterns in what triggers my anxiety.",
      timestamp: '10:25 AM',
      sender: 'me',
      isRead: true
    },
    {
      id: 7,
      text: 'How have you been feeling since our last session?',
      timestamp: '10:30 AM',
      sender: 'them',
      senderName: 'Dr. Sarah Johnson',
      isRead: true
    }
  ];
  
  // Simulate loading conversations
  useEffect(() => {
    const fetchConversations = async () => {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setConversations(mockConversations);
      setLoading(false);
    };
    
    fetchConversations();
  }, []);
  
  // Load messages when a conversation is selected
  useEffect(() => {
    if (activeConversation) {
      setLoading(true);
      
      // Simulate API delay
      setTimeout(() => {
        setMessages(mockMessages);
        setLoading(false);
        
        // Mark conversation as read
        setConversations(prevConversations => 
          prevConversations.map(conv => 
            conv.id === activeConversation.id 
              ? { ...conv, unreadCount: 0, lastMessage: { ...conv.lastMessage, isRead: true } }
              : conv
          )
        );
      }, 500);
    }
  }, [activeConversation]);
  
  // Scroll to bottom of messages
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);
  
  // Filter conversations by search term
  const filteredConversations = conversations.filter(conversation => 
    conversation.recipient.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  // Handle sending a new message
  const handleSendMessage = (e) => {
    e.preventDefault();
    
    if (newMessage.trim() === '' || !activeConversation) return;
    
    const newMsg = {
      id: messages.length + 1,
      text: newMessage,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      sender: 'me',
      isRead: false
    };
    
    setMessages([...messages, newMsg]);
    
    // Update conversation with new last message
    setConversations(prevConversations => 
      prevConversations.map(conv => 
        conv.id === activeConversation.id 
          ? { 
              ...conv, 
              lastMessage: {
                text: newMessage,
                timestamp: 'Just now',
                isRead: true,
                sender: 'me'
              }
            }
          : conv
      )
    );
    
    setNewMessage('');
  };

  if (loading && conversations.length === 0) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  return (
	<div className="bg-gray-50 min-h-screen">
	  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
		<h1 className="text-2xl font-bold text-gray-900 mb-6">Messages</h1>
		
		<div className="bg-white rounded-lg shadow-sm overflow-hidden">
		  <div className="flex h-[calc(100vh-12rem)]">
			{/* Conversations Sidebar */}
			<div className="w-full md:w-1/3 lg:w-1/4 border-r border-gray-200 flex flex-col">
			  {/* Search */}
			  <div className="p-4 border-b border-gray-200">
				<div className="relative">
				  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
					<FaSearch className="h-4 w-4 text-gray-400" />
				  </div>
				  <input
					type="text"
					className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
					placeholder="Search conversations"
					value={searchTerm}
					onChange={(e) => setSearchTerm(e.target.value)}
				  />
				</div>
			  </div>
			  
			  {/* Conversation List */}
			  <div className="flex-1 overflow-y-auto">
				{filteredConversations.length === 0 ? (
				  <div className="text-center py-8 px-4">
					<p className="text-gray-500">No conversations found</p>
				  </div>
				) : (
				  filteredConversations.map(conversation => (
					<button
					  key={conversation.id}
					  className={`w-full text-left px-4 py-3 border-b border-gray-100 hover:bg-gray-50 transition-colors flex items-start ${
						activeConversation?.id === conversation.id ? 'bg-indigo-50' : ''
					  }`}
					  onClick={() => setActiveConversation(conversation)}
					>
					  <div className="relative flex-shrink-0">
						{conversation.recipient.avatar ? (
						  <img
							src={conversation.recipient.avatar}
							alt={conversation.recipient.name}
							className="h-12 w-12 rounded-full object-cover"
						  />
						) : (
						  <div className="h-12 w-12 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-500">
							<FaUser className="h-6 w-6" />
						  </div>
						)}
						{conversation.recipient.isOnline && (
						  <span className="absolute bottom-0 right-0 block h-3 w-3 rounded-full bg-green-400 ring-2 ring-white"></span>
						)}
					  </div>
					  <div className="ml-3 flex-1 min-w-0">
						<div className="flex justify-between items-baseline">
						  <h3 className="text-sm font-medium text-gray-900 truncate">
							{conversation.recipient.name}
						  </h3>
						  <span className="text-xs text-gray-500">
							{conversation.lastMessage.timestamp}
						  </span>
						</div>
						<p className="text-sm text-gray-500 truncate">
						  {conversation.lastMessage.sender === 'me' ? 'You: ' : ''}
						  {conversation.lastMessage.text}
						</p>
						{conversation.recipient.role && (
						  <p className="text-xs text-indigo-600 mt-1">
							{conversation.recipient.role}
							{conversation.recipient.participants && ` · ${conversation.recipient.participants} members`}
						  </p>
						)}
					  </div>
					  {conversation.unreadCount > 0 && (
						<div className="ml-2 flex-shrink-0">
						  <span className="inline-flex items-center justify-center h-5 w-5 rounded-full bg-indigo-600 text-white text-xs">
							{conversation.unreadCount}
						  </span>
						</div>
					  )}
					</button>
				  ))
				)}
			  </div>
			</div>
			
			{/* Message Area */}
			{activeConversation ? (
			  <div className="hidden md:flex md:w-2/3 lg:w-3/4 flex-col">
				{/* Conversation Header */}
				<div className="px-6 py-3 border-b border-gray-200 flex items-center justify-between">
				  <div className="flex items-center">
					{activeConversation.recipient.avatar ? (
					  <img
						src={activeConversation.recipient.avatar}
						alt={activeConversation.recipient.name}
						className="h-10 w-10 rounded-full object-cover"
					  />
					) : (
					  <div className="h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-500">
						<FaUser className="h-5 w-5" />
					  </div>
					)}
					<div className="ml-3">
					  <h3 className="text-sm font-medium text-gray-900">
						{activeConversation.recipient.name}
					  </h3>
					  <p className="text-xs text-gray-500 flex items-center">
						{activeConversation.recipient.isOnline ? (
						  <>
							<FaCircle className="h-2 w-2 text-green-500 mr-1" /> Online
						  </>
						) : (
						  `Last seen ${activeConversation.recipient.lastSeen}`
						)}
					  </p>
					</div>
				  </div>
				  <div className="flex space-x-2">
					<button className="p-2 rounded-full text-gray-500 hover:text-gray-700 hover:bg-gray-100">
					  <FaPhone className="h-5 w-5" />
					</button>
					<button className="p-2 rounded-full text-gray-500 hover:text-gray-700 hover:bg-gray-100">
					  <FaVideo className="h-5 w-5" />
					</button>
					<button className="p-2 rounded-full text-gray-500 hover:text-gray-700 hover:bg-gray-100">
					  <FaEllipsisV className="h-5 w-5" />
					</button>
				  </div>
				</div>
				
				{/* Messages */}
				<div className="flex-1 p-4 overflow-y-auto bg-gray-50">
      {loading ? (
        <div className="flex justify-center items-center h-full">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-500"></div>
        </div>
      ) : (
        <div className="space-y-4">
          {messages.map(message => (
            <div 
              key={message.id}
              className={`flex ${message.sender === 'me' ? 'justify-end' : 'justify-start'}`}
            >
              <div 
                className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                  message.sender === 'me' 
                    ? 'bg-indigo-600 text-white' 
                    : 'bg-white text-gray-900 border border-gray-200'
                }`}
              >
                {message.sender !== 'me' && message.senderName && (
                  <p className="text-xs font-medium text-indigo-500 mb-1">
                    {message.senderName}
                  </p>
                )}
                <p className="text-sm">{message.text}</p>
                <p 
                  className={`text-xs mt-1 text-right ${
                    message.sender === 'me' ? 'text-indigo-100' : 'text-gray-500'
                  }`}
                >
                  {message.timestamp}
                </p>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
      )}
    </div>
    
    {/* Message Input */}
    <div className="p-4 border-t border-gray-200">
      <form onSubmit={handleSendMessage} className="flex items-center">
        <button
          type="button"
          className="p-2 rounded-full text-gray-500 hover:text-gray-700"
        >
          <FaPaperclip className="h-5 w-5" />
        </button>
        <input
          type="text"
          className="flex-1 mx-2 px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
          placeholder="Type a message..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
        />
        <button
          type="submit"
          className="p-2 rounded-full bg-indigo-600 text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          disabled={newMessage.trim() === ''}
        >
          <FaPaperPlane className="h-5 w-5" />
        </button>
      </form>
    </div>
  </div>
) : (
  <div className="hidden md:flex md:w-2/3 lg:w-3/4 items-center justify-center bg-gray-50">
    <div className="text-center p-8">
      <div className="mx-auto h-16 w-16 rounded-full bg-indigo-100 flex items-center justify-center mb-4">
        <FaComments className="h-8 w-8 text-indigo-600" />
      </div>
      <h3 className="text-lg font-medium text-gray-900 mb-2">Your Messages</h3>
      <p className="text-gray-500 max-w-md">
        Select a conversation to view messages or start a new conversation with your mental health professionals.
      </p>
    </div>
  </div>
)}

{/* Mobile Message View (shown when a conversation is selected on mobile) */}
{activeConversation && (
  <div className="fixed inset-0 z-40 md:hidden bg-white">
    <div className="flex flex-col h-full">
      {/* Mobile Header */}
      <div className="px-4 py-3 border-b border-gray-200 flex items-center">
        <button
          className="mr-2 p-1 rounded-full text-gray-500 hover:text-gray-700 hover:bg-gray-100"
          onClick={() => setActiveConversation(null)}
        >
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        
        <div className="flex items-center">
          {activeConversation.recipient.avatar ? (
            <img
              src={activeConversation.recipient.avatar}
              alt={activeConversation.recipient.name}
              className="h-8 w-8 rounded-full object-cover"
            />
          ) : (
            <div className="h-8 w-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-500">
              <FaUser className="h-4 w-4" />
            </div>
          )}
          <div className="ml-3">
            <h3 className="text-sm font-medium text-gray-900">
              {activeConversation.recipient.name}
            </h3>
          </div>
        </div>
        
        <div className="ml-auto flex space-x-2">
          <button className="p-1 rounded-full text-gray-500 hover:text-gray-700 hover:bg-gray-100">
            <FaPhone className="h-5 w-5" />
          </button>
          <button className="p-1 rounded-full text-gray-500 hover:text-gray-700 hover:bg-gray-100">
            <FaVideo className="h-5 w-5" />
          </button>
        </div>
      </div>
      
      {/* Mobile Messages */}
	  <div className="flex-1 p-4 overflow-y-auto bg-gray-50">
                    {loading ? (
                      <div className="flex justify-center items-center h-full">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-500"></div>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        {messages.map(message => (
                          <div 
                            key={message.id}
                            className={`flex ${message.sender === 'me' ? 'justify-end' : 'justify-start'}`}
                          >
                            <div 
                              className={`max-w-xs px-4 py-2 rounded-lg ${
                                message.sender === 'me' 
                                  ? 'bg-indigo-600 text-white' 
                                  : 'bg-white text-gray-900 border border-gray-200'
                              }`}
                            >
                              {message.sender !== 'me' && message.senderName && (
                                <p className="text-xs font-medium text-indigo-500 mb-1">
                                  {message.senderName}
                                </p>
                              )}
                              <p className="text-sm">{message.text}</p>
                              <p 
                                className={`text-xs mt-1 text-right ${
                                  message.sender === 'me' ? 'text-indigo-100' : 'text-gray-500'
                                }`}
                              >
                                {message.timestamp}
                              </p>
                            </div>
                          </div>
                        ))}
                        <div ref={messagesEndRef} />
                      </div>
                    )}
                  </div>
                  
                  {/* Mobile Message Input */}
                  <div className="p-3 border-t border-gray-200">
                    <form onSubmit={handleSendMessage} className="flex items-center">
                      <button
                        type="button"
                        className="p-2 rounded-full text-gray-500 hover:text-gray-700"
                      >
                        <FaPaperclip className="h-5 w-5" />
                      </button>
                      <input
                        type="text"
                        className="flex-1 mx-2 px-3 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
                        placeholder="Type a message..."
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                      />
                      <button
                        type="submit"
                        className="p-2 rounded-full bg-indigo-600 text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        disabled={newMessage.trim() === ''}
                      >
                        <FaPaperPlane className="h-5 w-5" />
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Messages;