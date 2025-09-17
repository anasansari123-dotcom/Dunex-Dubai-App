import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
  KeyboardAvoidingView,
  Platform,
  StatusBar,
  SafeAreaView,
  ActivityIndicator,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useAuth } from '../hooks/useAuth';
import Header from '../components/Header';

export default function LoginPage() {
  const router = useRouter();
  const { login, signInWithGoogle, loading, error, isAuthenticated, clearError } = useAuth();
  
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false,
  });
  const [submitError, setSubmitError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [flash, setFlash] = useState('');

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      router.push('/');
    }
  }, [isAuthenticated, router]);

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }));
    // Clear errors when user starts typing
    if (submitError) setSubmitError('');
    if (error) clearError();
    if (flash) setFlash('');
  };

  const validateForm = () => {
    const errors: { [key: string]: string } = {};
    
    if (!formData.email.trim()) {
      errors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = 'Please enter a valid email address';
    }
    
    if (!formData.password) {
      errors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      errors.password = 'Password must be at least 6 characters';
    }
    
    return errors;
  };

  const handleSubmit = async () => {
    setSubmitError('');
    clearError();
    setFlash('');

    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setSubmitError('Please fix the errors below');
      return;
    }

    setIsSubmitting(true);

    try {
      const result = await login(formData.email.trim(), formData.password);
      
      if (result.success) {
        setFlash('Login successful! Redirecting...');
        setTimeout(() => {
          router.push('/');
        }, 1000);
      } else {
        setSubmitError(result.error || 'Login failed. Please try again.');
      }
    } catch (err) {
      setSubmitError('An unexpected error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleGoogleLogin = async () => {
    setSubmitError('');
    clearError();
    setFlash('');
    
    const result = await signInWithGoogle();
    if (!result.success) {
      setSubmitError(result.error || 'Google login failed. Please try again.');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#071538" />
      <Header />
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardAvoidingView}
      >
        <ScrollView 
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.content}>
            {/* Logo and Back to Home */}
            <View style={styles.header}>
              <TouchableOpacity 
                onPress={() => router.push('/')}
                style={styles.logoContainer}
              >
                <View style={styles.logo}>
                  <Ionicons name="home" size={32} color="#071538" />
                </View>
              </TouchableOpacity>
              <Text style={styles.title}>Welcome Back</Text>
              <Text style={styles.subtitle}>
                Sign in to your Dubai Real Estate account
              </Text>
            </View>

            {/* Login Form */}
            <View style={styles.formContainer}>
              {/* Success/Info Messages */}
              {flash ? (
                <View style={styles.flashMessage}>
                  <Text style={styles.flashText}>{flash}</Text>
                </View>
              ) : null}

              {/* Error Messages */}
              {(error || submitError) ? (
                <View style={styles.errorMessage}>
                  <Text style={styles.errorText}>{error || submitError}</Text>
                </View>
              ) : null}

              {/* Email Field */}
              <View style={styles.inputContainer}>
                <Text style={styles.label}>Email Address</Text>
                <TextInput
                  style={styles.input}
                  value={formData.email}
                  onChangeText={(value) => handleInputChange('email', value)}
                  placeholder="Enter your email"
                  placeholderTextColor="#9ca3af"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  autoCorrect={false}
                />
              </View>

              {/* Password Field */}
              <View style={styles.inputContainer}>
                <Text style={styles.label}>Password</Text>
                <View style={styles.passwordContainer}>
                  <TextInput
                    style={styles.passwordInput}
                    value={formData.password}
                    onChangeText={(value) => handleInputChange('password', value)}
                    placeholder="Enter your password"
                    placeholderTextColor="#9ca3af"
                    secureTextEntry={!showPassword}
                    autoCapitalize="none"
                    autoCorrect={false}
                  />
                  <TouchableOpacity
                    onPress={() => setShowPassword(!showPassword)}
                    style={styles.eyeButton}
                  >
                    <Ionicons
                      name={showPassword ? 'eye-off' : 'eye'}
                      size={20}
                      color="#9ca3af"
                    />
                  </TouchableOpacity>
                </View>
              </View>

              {/* Remember Me & Forgot Password */}
              <View style={styles.optionsContainer}>
                <TouchableOpacity
                  style={styles.checkboxContainer}
                  onPress={() => handleInputChange('rememberMe', !formData.rememberMe)}
                >
                  <View style={[
                    styles.checkbox,
                    formData.rememberMe && styles.checkboxChecked
                  ]}>
                    {formData.rememberMe && (
                      <Ionicons name="checkmark" size={16} color="#071538" />
                    )}
                  </View>
                  <Text style={styles.checkboxLabel}>Remember me</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => router.push('/forgot-password')}>
                  <Text style={styles.forgotPassword}>Forgot password?</Text>
                </TouchableOpacity>
              </View>

              {/* Login Button */}
              <TouchableOpacity
                style={[
                  styles.loginButton,
                  (loading || isSubmitting) && styles.loginButtonDisabled
                ]}
                onPress={handleSubmit}
                disabled={loading || isSubmitting}
              >
                {loading || isSubmitting ? (
                  <ActivityIndicator color="#071538" />
                ) : (
                  <Text style={styles.loginButtonText}>Sign In</Text>
                )}
              </TouchableOpacity>

              {/* Divider */}
              <View style={styles.dividerContainer}>
                <View style={styles.dividerLine} />
                <Text style={styles.dividerText}>Or continue with</Text>
                <View style={styles.dividerLine} />
              </View>

              {/* Google Login Button */}
              <TouchableOpacity
                style={[
                  styles.googleButton,
                  (loading || isSubmitting) && styles.googleButtonDisabled
                ]}
                onPress={handleGoogleLogin}
                disabled={loading || isSubmitting}
              >
                <Ionicons name="logo-google" size={20} color="#4285F4" />
                <Text style={styles.googleButtonText}>Continue with Google</Text>
              </TouchableOpacity>

              {/* Sign Up Link */}
              <View style={styles.signupContainer}>
                <Text style={styles.signupText}>
                  Don't have an account?{' '}
                  <TouchableOpacity onPress={() => router.push('/signup')}>
                    <Text style={styles.signupLink}>Sign up</Text>
                  </TouchableOpacity>
                </Text>
              </View>
            </View>

            {/* Back to Home Link */}
            <TouchableOpacity
              style={styles.backToHome}
              onPress={() => router.push('/')}
            >
              <Ionicons name="arrow-back" size={16} color="#9ca3af" />
              <Text style={styles.backToHomeText}>Back to Home</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#071538',
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 40,
  },
  header: {
    alignItems: 'center',
    marginBottom: 32,
  },
  logoContainer: {
    marginBottom: 24,
  },
  logo: {
    width: 64,
    height: 64,
    backgroundColor: '#D4AF37',
    borderRadius: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#D4AF37',
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#d1d5db',
    textAlign: 'center',
  },
  formContainer: {
    backgroundColor: '#0d1b3f',
    borderRadius: 16,
    padding: 24,
    borderWidth: 1,
    borderColor: 'rgba(212, 175, 55, 0.4)',
    marginBottom: 24,
  },
  flashMessage: {
    backgroundColor: 'rgba(34, 197, 94, 0.2)',
    borderWidth: 1,
    borderColor: 'rgba(34, 197, 94, 0.5)',
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
  },
  flashText: {
    color: '#86efac',
    fontSize: 14,
  },
  errorMessage: {
    backgroundColor: 'rgba(239, 68, 68, 0.2)',
    borderWidth: 1,
    borderColor: 'rgba(239, 68, 68, 0.5)',
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
  },
  errorText: {
    color: '#fca5a5',
    fontSize: 14,
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#d1d5db',
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#4b5563',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: 'transparent',
    color: '#ffffff',
    fontSize: 16,
  },
  passwordContainer: {
    position: 'relative',
  },
  passwordInput: {
    borderWidth: 1,
    borderColor: '#4b5563',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    paddingRight: 48,
    backgroundColor: 'transparent',
    color: '#ffffff',
    fontSize: 16,
  },
  eyeButton: {
    position: 'absolute',
    right: 12,
    top: 12,
    padding: 4,
  },
  optionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkbox: {
    width: 16,
    height: 16,
    borderWidth: 1,
    borderColor: '#4b5563',
    borderRadius: 4,
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  checkboxChecked: {
    backgroundColor: '#D4AF37',
    borderColor: '#D4AF37',
  },
  checkboxLabel: {
    fontSize: 14,
    color: '#d1d5db',
  },
  forgotPassword: {
    fontSize: 14,
    color: '#D4AF37',
    fontWeight: '600',
  },
  loginButton: {
    backgroundColor: '#D4AF37',
    borderRadius: 8,
    paddingVertical: 16,
    alignItems: 'center',
    marginBottom: 24,
  },
  loginButtonDisabled: {
    backgroundColor: '#4b5563',
  },
  loginButtonText: {
    color: '#071538',
    fontSize: 16,
    fontWeight: 'bold',
  },
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#4b5563',
  },
  dividerText: {
    color: '#9ca3af',
    fontSize: 14,
    paddingHorizontal: 16,
  },
  googleButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#4b5563',
    borderRadius: 8,
    paddingVertical: 16,
    backgroundColor: 'transparent',
    marginBottom: 24,
  },
  googleButtonDisabled: {
    backgroundColor: '#4b5563',
  },
  googleButtonText: {
    color: '#d1d5db',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
  signupContainer: {
    alignItems: 'center',
  },
  signupText: {
    color: '#9ca3af',
    fontSize: 14,
  },
  signupLink: {
    color: '#D4AF37',
    fontWeight: '600',
  },
  backToHome: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  backToHomeText: {
    color: '#9ca3af',
    fontSize: 14,
    marginLeft: 4,
  },
});
