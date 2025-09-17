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
  Animated,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useAuth } from '../hooks/useAuth';
import Header from '../components/Header';

export default function ForgotPasswordPage() {
  const router = useRouter();
  const { forgotPassword, signInWithGoogle, loading, error, isAuthenticated, clearError } = useAuth();
  
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [fadeAnim] = useState(new Animated.Value(0));
  const [scaleAnim] = useState(new Animated.Value(0.95));

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      router.push('/' as any);
    }
  }, [isAuthenticated, router]);

  // Animation on mount
  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const handleSubmit = async () => {
    setSubmitError('');
    clearError();

    if (!email.trim()) {
      setSubmitError('Please enter your email address');
      return;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      setSubmitError('Please enter a valid email address');
      return;
    }

    const result = await forgotPassword(email);
    
    if (result.success) {
      setIsSubmitted(true);
    } else {
      setSubmitError(result.error || 'Failed to send reset email. Please try again.');
    }
  };

  const handleGoogleLogin = async () => {
    setSubmitError('');
    clearError();
    
    const result = await signInWithGoogle();
    if (!result.success) {
      setSubmitError(result.error || 'Google login failed. Please try again.');
    }
  };

  const handleSendAnother = () => {
    setIsSubmitted(false);
    setEmail('');
    setSubmitError('');
    clearError();
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#0B1D39" />
      <Header />
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardAvoidingView}
      >
        <ScrollView 
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <Animated.View 
            style={[
              styles.content,
              {
                opacity: fadeAnim,
                transform: [{ translateY: fadeAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: [40, 0]
                })}]
              }
            ]}
          >
            {/* Logo + Title */}
            <View style={styles.header}>
              <TouchableOpacity 
                onPress={() => router.push('/' as any)}
                style={styles.logoContainer}
              >
                <Animated.View
                  style={[
                    styles.logo,
                    {
                      transform: [{ scale: scaleAnim }]
                    }
                  ]}
                >
                  <Ionicons name="home" size={40} color="#0B1D39" />
                </Animated.View>
              </TouchableOpacity>
              <Text style={styles.title}>Reset Password</Text>
              <Text style={styles.subtitle}>
                Enter your email to receive reset instructions
              </Text>
            </View>

            {/* Card */}
            <Animated.View
              style={[
                styles.card,
                {
                  transform: [{ scale: scaleAnim }]
                }
              ]}
            >
              {!isSubmitted ? (
                <>
                  <View style={styles.form}>
                    {/* Email Field */}
                    <View style={styles.inputContainer}>
                      <Text style={styles.label}>Email Address</Text>
                      <TextInput
                        style={[
                          styles.input,
                          (submitError || error) && styles.inputError
                        ]}
                        value={email}
                        onChangeText={setEmail}
                        placeholder="Enter your email address"
                        placeholderTextColor="#9ca3af"
                        keyboardType="email-address"
                        autoCapitalize="none"
                        autoCorrect={false}
                      />
                      {(submitError || error) && (
                        <Text style={styles.errorText}>{submitError || error}</Text>
                      )}
                    </View>

                    {/* Submit Button */}
                    <TouchableOpacity
                      style={[
                        styles.submitButton,
                        loading && styles.submitButtonDisabled
                      ]}
                      onPress={handleSubmit}
                      disabled={loading}
                    >
                      {loading ? (
                        <ActivityIndicator color="#0B1D39" />
                      ) : (
                        <Text style={styles.submitButtonText}>Send Reset Link</Text>
                      )}
                    </TouchableOpacity>
                  </View>

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
                      loading && styles.googleButtonDisabled
                    ]}
                    onPress={handleGoogleLogin}
                    disabled={loading}
                  >
                    <Ionicons name="logo-google" size={20} color="#4285F4" />
                    <Text style={styles.googleButtonText}>Continue with Google</Text>
                  </TouchableOpacity>
                </>
              ) : (
                /* Success Message */
                <Animated.View
                  style={[
                    styles.successContainer,
                    {
                      opacity: fadeAnim
                    }
                  ]}
                >
                  <View style={styles.successIcon}>
                    <Ionicons name="checkmark" size={32} color="#10b981" />
                  </View>
                  <Text style={styles.successTitle}>Check Your Email</Text>
                  <Text style={styles.successMessage}>
                    We've sent a password reset link to{' '}
                    <Text style={styles.emailText}>{email}</Text>
                  </Text>
                  <TouchableOpacity
                    style={styles.sendAnotherButton}
                    onPress={handleSendAnother}
                  >
                    <Text style={styles.sendAnotherButtonText}>Send Another Email</Text>
                  </TouchableOpacity>
                </Animated.View>
              )}

              {/* Navigation Links */}
              <View style={styles.navigationLinks}>
                <View style={styles.navigationItem}>
                  <Text style={styles.navigationText}>
                    Remember your password?{' '}
                    <TouchableOpacity onPress={() => router.push('/login' as any)}>
                      <Text style={styles.navigationLink}>Sign in</Text>
                    </TouchableOpacity>
                  </Text>
                </View>
                <View style={styles.navigationItem}>
                  <Text style={styles.navigationText}>
                    Don't have an account?{' '}
                    <TouchableOpacity onPress={() => router.push('/signup' as any)}>
                      <Text style={styles.navigationLink}>Sign up</Text>
                    </TouchableOpacity>
                  </Text>
                </View>
              </View>
            </Animated.View>

            {/* Back to Home */}
            <TouchableOpacity
              style={styles.backToHome}
              onPress={() => router.push('/' as any)}
            >
              <Ionicons name="arrow-back" size={16} color="#D4AF37" />
              <Text style={styles.backToHomeText}>Back to Home</Text>
            </TouchableOpacity>
          </Animated.View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0B1D39',
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
    justifyContent: 'center',
  },
  header: {
    alignItems: 'center',
    marginBottom: 40,
  },
  logoContainer: {
    marginBottom: 24,
  },
  logo: {
    width: 80,
    height: 80,
    backgroundColor: '#D4AF37',
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
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
    color: 'rgba(212, 175, 55, 0.8)',
    textAlign: 'center',
  },
  card: {
    backgroundColor: 'rgba(15, 35, 73, 0.7)',
    borderRadius: 16,
    padding: 32,
    borderWidth: 1,
    borderColor: 'rgba(212, 175, 55, 0.4)',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
  form: {
    marginBottom: 24,
  },
  inputContainer: {
    marginBottom: 24,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#D4AF37',
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: 'rgba(212, 175, 55, 0.4)',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#13294B',
    color: '#ffffff',
    fontSize: 16,
  },
  inputError: {
    borderColor: '#ef4444',
  },
  errorText: {
    color: '#fca5a5',
    fontSize: 14,
    marginTop: 4,
  },
  submitButton: {
    backgroundColor: '#D4AF37',
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
  },
  submitButtonDisabled: {
    backgroundColor: '#4b5563',
  },
  submitButtonText: {
    color: '#0B1D39',
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
    backgroundColor: 'rgba(212, 175, 55, 0.3)',
  },
  dividerText: {
    marginHorizontal: 16,
    fontSize: 14,
    color: 'rgba(212, 175, 55, 0.7)',
  },
  googleButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  googleButtonDisabled: {
    backgroundColor: '#4b5563',
  },
  googleButtonText: {
    color: '#374151',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
  successContainer: {
    alignItems: 'center',
    paddingVertical: 32,
  },
  successIcon: {
    width: 64,
    height: 64,
    backgroundColor: 'rgba(16, 185, 129, 0.1)',
    borderRadius: 32,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  successTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#D4AF37',
    marginBottom: 8,
    textAlign: 'center',
  },
  successMessage: {
    fontSize: 16,
    color: 'rgba(212, 175, 55, 0.8)',
    textAlign: 'center',
    marginBottom: 24,
    lineHeight: 24,
  },
  emailText: {
    fontWeight: '600',
    color: '#D4AF37',
  },
  sendAnotherButton: {
    backgroundColor: '#D4AF37',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 24,
    width: '100%',
  },
  sendAnotherButtonText: {
    color: '#0B1D39',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  navigationLinks: {
    marginTop: 32,
  },
  navigationItem: {
    marginBottom: 12,
  },
  navigationText: {
    fontSize: 14,
    color: '#D4AF37',
    textAlign: 'center',
  },
  navigationLink: {
    fontWeight: '600',
    textDecorationLine: 'underline',
  },
  backToHome: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 24,
  },
  backToHomeText: {
    color: 'rgba(212, 175, 55, 0.7)',
    fontSize: 14,
    marginLeft: 4,
  },
});
