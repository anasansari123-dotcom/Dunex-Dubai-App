import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface AuthUser {
  id: string;
  email: string;
  name: string;
}

interface AuthState {
  user: AuthUser | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string;
}

export const useAuth = () => {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    isAuthenticated: false,
    loading: true,
    error: '',
  });

  // Check for existing authentication on mount
  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
      const token = await AsyncStorage.getItem('authToken');
      const userData = await AsyncStorage.getItem('userData');
      
      if (token && userData) {
        const user = JSON.parse(userData);
        setAuthState({
          user,
          isAuthenticated: true,
          loading: false,
          error: '',
        });
      } else {
        setAuthState(prev => ({
          ...prev,
          loading: false,
        }));
      }
    } catch (error) {
      setAuthState(prev => ({
        ...prev,
        loading: false,
        error: 'Failed to check authentication status',
      }));
    }
  };

  const login = async (email: string, password: string) => {
    setAuthState(prev => ({ ...prev, loading: true, error: '' }));

    try {
      // Simulate API call - replace with your actual authentication API
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Mock validation - replace with actual API call
      if (email === 'test@example.com' && password === 'password') {
        const user: AuthUser = {
          id: '1',
          email: email,
          name: 'Test User',
        };
        
        const token = 'mock-jwt-token';
        
        // Store authentication data
        await AsyncStorage.setItem('authToken', token);
        await AsyncStorage.setItem('userData', JSON.stringify(user));
        
        setAuthState({
          user,
          isAuthenticated: true,
          loading: false,
          error: '',
        });
        
        return { success: true };
      } else {
        setAuthState(prev => ({
          ...prev,
          loading: false,
          error: 'Invalid email or password',
        }));
        return { success: false, error: 'Invalid email or password' };
      }
    } catch (error) {
      const errorMessage = 'An unexpected error occurred';
      setAuthState(prev => ({
        ...prev,
        loading: false,
        error: errorMessage,
      }));
      return { success: false, error: errorMessage };
    }
  };

  const signup = async (email: string, password: string, userData: { first_name: string; last_name: string; full_name: string }) => {
    setAuthState(prev => ({ ...prev, loading: true, error: '' }));

    try {
      // Simulate API call - replace with your actual signup API
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Mock validation - replace with actual API call
      if (email && password && userData.first_name && userData.last_name) {
        const user: AuthUser = {
          id: 'new-user-' + Date.now(),
          email: email,
          name: userData.full_name,
        };
        
        const token = 'mock-jwt-token';
        
        // Store authentication data
        await AsyncStorage.setItem('authToken', token);
        await AsyncStorage.setItem('userData', JSON.stringify(user));
        
        setAuthState({
          user,
          isAuthenticated: true,
          loading: false,
          error: '',
        });
        
        return { success: true, needsConfirmation: false };
      } else {
        setAuthState(prev => ({
          ...prev,
          loading: false,
          error: 'Please fill in all required fields',
        }));
        return { success: false, error: 'Please fill in all required fields' };
      }
    } catch (error) {
      const errorMessage = 'An unexpected error occurred during signup';
      setAuthState(prev => ({
        ...prev,
        loading: false,
        error: errorMessage,
      }));
      return { success: false, error: errorMessage };
    }
  };

  const resendConfirmation = async (email: string) => {
    setAuthState(prev => ({ ...prev, loading: true, error: '' }));

    try {
      // Simulate API call - replace with actual resend confirmation API
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setAuthState(prev => ({
        ...prev,
        loading: false,
        error: '',
      }));
      
      return { success: true, message: 'Confirmation email sent successfully' };
    } catch (error) {
      const errorMessage = 'Failed to resend confirmation email';
      setAuthState(prev => ({
        ...prev,
        loading: false,
        error: errorMessage,
      }));
      return { success: false, error: errorMessage };
    }
  };

  const forgotPassword = async (email: string) => {
    setAuthState(prev => ({ ...prev, loading: true, error: '' }));

    try {
      // Simulate API call - replace with actual forgot password API
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Mock validation - replace with actual API call
      if (email && /\S+@\S+\.\S+/.test(email)) {
        setAuthState(prev => ({
          ...prev,
          loading: false,
          error: '',
        }));
        
        return { success: true, message: 'Password reset email sent successfully' };
      } else {
        setAuthState(prev => ({
          ...prev,
          loading: false,
          error: 'Please enter a valid email address',
        }));
        return { success: false, error: 'Please enter a valid email address' };
      }
    } catch (error) {
      const errorMessage = 'Failed to send reset email. Please try again.';
      setAuthState(prev => ({
        ...prev,
        loading: false,
        error: errorMessage,
      }));
      return { success: false, error: errorMessage };
    }
  };

  const signInWithGoogle = async () => {
    setAuthState(prev => ({ ...prev, loading: true, error: '' }));

    try {
      // Simulate Google sign-in - replace with actual Google authentication
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const user: AuthUser = {
        id: 'google-user-1',
        email: 'user@gmail.com',
        name: 'Google User',
      };
      
      const token = 'mock-google-jwt-token';
      
      // Store authentication data
      await AsyncStorage.setItem('authToken', token);
      await AsyncStorage.setItem('userData', JSON.stringify(user));
      
      setAuthState({
        user,
        isAuthenticated: true,
        loading: false,
        error: '',
      });
      
      return { success: true };
    } catch (error) {
      const errorMessage = 'Google sign-in failed';
      setAuthState(prev => ({
        ...prev,
        loading: false,
        error: errorMessage,
      }));
      return { success: false, error: errorMessage };
    }
  };

  const logout = async () => {
    try {
      await AsyncStorage.removeItem('authToken');
      await AsyncStorage.removeItem('userData');
      
      setAuthState({
        user: null,
        isAuthenticated: false,
        loading: false,
        error: '',
      });
    } catch (error) {
      setAuthState(prev => ({
        ...prev,
        error: 'Failed to logout',
      }));
    }
  };

  const clearError = () => {
    setAuthState(prev => ({ ...prev, error: '' }));
  };

  return {
    user: authState.user,
    isAuthenticated: authState.isAuthenticated,
    loading: authState.loading,
    error: authState.error,
    login,
    signup,
    resendConfirmation,
    forgotPassword,
    signInWithGoogle,
    logout,
    clearError,
  };
};
