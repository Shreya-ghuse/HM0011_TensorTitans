// src/hooks/useAuth.js
import { useContext } from 'react';
import AuthContext from '../context/AuthContext';

/**
 * Custom hook to access the authentication context
 * 
 * This hook provides a simpler way to access auth functionality throughout the app
 * rather than importing both useContext and AuthContext in every component.
 * 
 * @returns {Object} The auth context containing:
 *   - currentUser: The currently logged in user or null
 *   - loading: Boolean indicating if auth state is still being determined
 *   - error: Any error message from auth operations
 *   - login: Function to log in a user
 *   - register: Function to register a new user
 *   - logout: Function to log out the current user
 *   - updateProfile: Function to update user profile
 *   - resetPassword: Function to initiate password reset
 */
export const useAuth = () => {
  const context = useContext(AuthContext);
  
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  
  return context;
};

//export default useAuth;