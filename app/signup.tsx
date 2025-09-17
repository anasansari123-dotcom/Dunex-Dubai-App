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

export default function SignupPage() {
  const router = useRouter();
  const { signup, resendConfirmation, signInWithGoogle, loading, error, isAuthenticated, clearError } = useAuth();
  
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    agreeToTerms: false,
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [flash, setFlash] = useState('');
  const [submitError, setSubmitError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [needsConfirmation, setNeedsConfirmation] = useState(false);
  const [confirmationEmail, setConfirmationEmail] = useState('');
  const [resendCooldown, setResendCooldown] = useState(0);

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      router.push('/');
    }
  }, [isAuthenticated, router]);

  // Cooldown timer for resend confirmation
  useEffect(() => {
    if (resendCooldown > 0) {
      const timer = setTimeout(() => {
        setResendCooldown(resendCooldown - 1);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [resendCooldown]);

  const onChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }));
    setErrors(prev => ({ ...prev, [field]: '' }));
    if (flash) setFlash('');
    if (submitError) setSubmitError('');
    if (error) clearError();
  };

  const validate = () => {
    const v: { [key: string]: string } = {};
    
    // First name validation
    if (!formData.firstName.trim()) {
      v.firstName = 'First name is required';
    } else if (formData.firstName.trim().length < 2) {
      v.firstName = 'First name must be at least 2 characters';
    }
    
    // Last name validation
    if (!formData.lastName.trim()) {
      v.lastName = 'Last name is required';
    } else if (formData.lastName.trim().length < 2) {
      v.lastName = 'Last name must be at least 2 characters';
    }
    
    // Email validation
    if (!formData.email.trim()) {
      v.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      v.email = 'Please enter a valid email address';
    }
    
    // Password validation
    if (!formData.password) {
      v.password = 'Password is required';
    } else if (formData.password.length < 8) {
      v.password = 'Password must be at least 8 characters';
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.password)) {
      v.password = 'Password must contain at least one uppercase letter, one lowercase letter, and one number';
    }
    
    // Confirm password validation
    if (!formData.confirmPassword) {
      v.confirmPassword = 'Please confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      v.confirmPassword = 'Passwords do not match';
    }
    
    // Terms agreement validation
    if (!formData.agreeToTerms) {
      v.agreeToTerms = 'You must agree to the terms and conditions';
    }
    
    setErrors(v);
    return Object.keys(v).length === 0;
  };

  const onSubmit = async () => {
    setSubmitError('');
    clearError();
    
    if (!validate()) {
      return;
    }

    setIsSubmitting(true);

    try {
      const result = await signup(
        formData.email, 
        formData.password, 
        {
          first_name: formData.firstName.trim(),
          last_name: formData.lastName.trim(),
          full_name: `${formData.firstName.trim()} ${formData.lastName.trim()}`
        }
      );

      if (result.success) {
        if (result.needsConfirmation) {
          setNeedsConfirmation(true);
          setConfirmationEmail(formData.email);
          setFlash(result.message);
        } else {
          setFlash('Account created successfully! Redirecting...');
          setTimeout(() => {
            router.push('/');
          }, 2000);
        }
        
        // Clear form only if no email confirmation needed
        if (!result.needsConfirmation) {
          setFormData({
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            confirmPassword: '',
            agreeToTerms: false,
          });
        }
      } else {
        setSubmitError(result.error || 'Signup failed. Please try again.');
      }
    } catch (err) {
      setSubmitError('An unexpected error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleResendConfirmation = async () => {
    if (!confirmationEmail || resendCooldown > 0) return;
    
    setSubmitError('');
    clearError();
    
    const result = await resendConfirmation(confirmationEmail);
    if (result.success) {
      setFlash(result.message);
      setResendCooldown(60); // 60 second cooldown
    } else {
      setSubmitError(result.error || 'Failed to resend confirmation email.');
    }
  };

  const handleGoogleSignup = async () => {
    setSubmitError('');
    clearError();
    
    const result = await signInWithGoogle();
    if (!result.success) {
      setSubmitError(result.error || 'Google signup failed. Please try again.');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#0B1A36" />
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
            {/* Header */}
            <View style={styles.header}>
              <Text style={styles.title}>Create Account</Text>
              <Text style={styles.subtitle}>Luxury return month after month</Text>
            </View>

            {/* Success/Info Messages */}
            {flash ? (
              <View style={styles.flashMessage}>
                <Text style={styles.flashText}>{flash}</Text>
                {needsConfirmation && (
                  <TouchableOpacity
                    onPress={handleResendConfirmation}
                    disabled={loading || resendCooldown > 0}
                    style={styles.resendButton}
                  >
                    <Text style={[
                      styles.resendButtonText,
                      (loading || resendCooldown > 0) && styles.resendButtonDisabled
                    ]}>
                      {loading ? 'Sending...' : resendCooldown > 0 ? `Resend in ${resendCooldown}s` : 'Resend Confirmation Email'}
                    </Text>
                  </TouchableOpacity>
                )}
              </View>
            ) : null}

            {/* Error Messages */}
            {(error || submitError) ? (
              <View style={styles.errorMessage}>
                <Text style={styles.errorText}>{error || submitError}</Text>
              </View>
            ) : null}

            {/* Form */}
            <View style={styles.formContainer}>
              {/* Name Fields */}
              <View style={styles.nameRow}>
                <View style={styles.nameField}>
                  <TextInput
                    style={[
                      styles.input,
                      errors.firstName && styles.inputError
                    ]}
                    value={formData.firstName}
                    onChangeText={(value) => onChange('firstName', value)}
                    placeholder="First name"
                    placeholderTextColor="#9ca3af"
                    autoCapitalize="words"
                    autoCorrect={false}
                  />
                  {errors.firstName && (
                    <Text style={styles.errorText}>{errors.firstName}</Text>
                  )}
                </View>
                <View style={styles.nameField}>
                  <TextInput
                    style={[
                      styles.input,
                      errors.lastName && styles.inputError
                    ]}
                    value={formData.lastName}
                    onChangeText={(value) => onChange('lastName', value)}
                    placeholder="Last name"
                    placeholderTextColor="#9ca3af"
                    autoCapitalize="words"
                    autoCorrect={false}
                  />
                  {errors.lastName && (
                    <Text style={styles.errorText}>{errors.lastName}</Text>
                  )}
                </View>
              </View>

              {/* Email Field */}
              <View style={styles.inputContainer}>
                <TextInput
                  style={[
                    styles.input,
                    errors.email && styles.inputError
                  ]}
                  value={formData.email}
                  onChangeText={(value) => onChange('email', value)}
                  placeholder="Email"
                  placeholderTextColor="#9ca3af"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  autoCorrect={false}
                />
                {errors.email && (
                  <Text style={styles.errorText}>{errors.email}</Text>
                )}
              </View>

              {/* Password Field */}
              <View style={styles.inputContainer}>
                <View style={styles.passwordContainer}>
                  <TextInput
                    style={[
                      styles.passwordInput,
                      errors.password && styles.inputError
                    ]}
                    value={formData.password}
                    onChangeText={(value) => onChange('password', value)}
                    placeholder="Password"
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
                {errors.password && (
                  <Text style={styles.errorText}>{errors.password}</Text>
                )}
              </View>

              {/* Confirm Password Field */}
              <View style={styles.inputContainer}>
                <View style={styles.passwordContainer}>
                  <TextInput
                    style={[
                      styles.passwordInput,
                      errors.confirmPassword && styles.inputError
                    ]}
                    value={formData.confirmPassword}
                    onChangeText={(value) => onChange('confirmPassword', value)}
                    placeholder="Confirm password"
                    placeholderTextColor="#9ca3af"
                    secureTextEntry={!showConfirmPassword}
                    autoCapitalize="none"
                    autoCorrect={false}
                  />
                  <TouchableOpacity
                    onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                    style={styles.eyeButton}
                  >
                    <Ionicons
                      name={showConfirmPassword ? 'eye-off' : 'eye'}
                      size={20}
                      color="#9ca3af"
                    />
                  </TouchableOpacity>
                </View>
                {errors.confirmPassword && (
                  <Text style={styles.errorText}>{errors.confirmPassword}</Text>
                )}
              </View>

              {/* Terms Agreement */}
              <View style={styles.termsContainer}>
                <TouchableOpacity
                  style={styles.checkboxContainer}
                  onPress={() => onChange('agreeToTerms', !formData.agreeToTerms)}
                >
                  <View style={[
                    styles.checkbox,
                    formData.agreeToTerms && styles.checkboxChecked
                  ]}>
                    {formData.agreeToTerms && (
                      <Ionicons name="checkmark" size={16} color="#0B1A36" />
                    )}
                  </View>
                  <View style={styles.termsTextContainer}>
                    <Text style={styles.termsText}>
                      I agree to the{' '}
                      <TouchableOpacity onPress={() => router.push('/terms')}>
                        <Text style={styles.termsLink}>Terms & Conditions</Text>
                      </TouchableOpacity>
                      {' '}and{' '}
                      <TouchableOpacity onPress={() => router.push('/privacy')}>
                        <Text style={styles.termsLink}>Privacy Policy</Text>
                      </TouchableOpacity>
                    </Text>
                    {errors.agreeToTerms && (
                      <Text style={styles.errorText}>{errors.agreeToTerms}</Text>
                    )}
                  </View>
                </TouchableOpacity>
              </View>

              {/* Submit Button */}
              <TouchableOpacity
                style={[
                  styles.submitButton,
                  (isSubmitting || loading) && styles.submitButtonDisabled
                ]}
                onPress={onSubmit}
                disabled={isSubmitting || loading}
              >
                {isSubmitting || loading ? (
                  <ActivityIndicator color="#0B1A36" />
                ) : (
                  <Text style={styles.submitButtonText}>Create Account</Text>
                )}
              </TouchableOpacity>
            </View>

            {/* Divider */}
            <View style={styles.dividerContainer}>
              <View style={styles.dividerLine} />
              <Text style={styles.dividerText}>Or continue with</Text>
              <View style={styles.dividerLine} />
            </View>

            {/* Google Signup Button */}
            <TouchableOpacity
              style={[
                styles.googleButton,
                (loading || isSubmitting) && styles.googleButtonDisabled
              ]}
              onPress={handleGoogleSignup}
              disabled={loading || isSubmitting}
            >
              <Ionicons name="logo-google" size={20} color="#4285F4" />
              <Text style={styles.googleButtonText}>Continue with Google</Text>
            </TouchableOpacity>

            {/* Sign In Link */}
            <View style={styles.signinContainer}>
              <Text style={styles.signinText}>
                Already have an account?{' '}
                <TouchableOpacity onPress={() => router.push('/login')}>
                  <Text style={styles.signinLink}>Sign in</Text>
                </TouchableOpacity>
              </Text>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0B1A36',
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
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFD700',
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#d1d5db',
    textAlign: 'center',
  },
  formContainer: {
    backgroundColor: 'rgba(15, 34, 63, 0.9)',
    borderRadius: 16,
    padding: 24,
    borderWidth: 1,
    borderColor: 'rgba(255, 215, 0, 0.3)',
    marginBottom: 24,
  },
  flashMessage: {
    backgroundColor: 'rgba(34, 197, 94, 0.2)',
    borderLeftWidth: 4,
    borderLeftColor: '#22c55e',
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
  },
  flashText: {
    color: '#86efac',
    fontSize: 14,
    marginBottom: 8,
  },
  resendButton: {
    marginTop: 8,
  },
  resendButtonText: {
    color: '#FFD700',
    fontSize: 14,
    textDecorationLine: 'underline',
  },
  resendButtonDisabled: {
    opacity: 0.5,
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
  nameRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 16,
  },
  nameField: {
    flex: 1,
  },
  inputContainer: {
    marginBottom: 16,
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
  inputError: {
    borderColor: '#ef4444',
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
  termsContainer: {
    marginBottom: 24,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
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
    marginRight: 12,
    marginTop: 2,
  },
  checkboxChecked: {
    backgroundColor: '#FFD700',
    borderColor: '#FFD700',
  },
  termsTextContainer: {
    flex: 1,
  },
  termsText: {
    color: '#d1d5db',
    fontSize: 14,
    lineHeight: 20,
  },
  termsLink: {
    color: '#FFD700',
    textDecorationLine: 'underline',
  },
  submitButton: {
    backgroundColor: '#FFD700',
    borderRadius: 8,
    paddingVertical: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  submitButtonDisabled: {
    backgroundColor: '#4b5563',
  },
  submitButtonText: {
    color: '#0B1A36',
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
  signinContainer: {
    alignItems: 'center',
  },
  signinText: {
    color: '#9ca3af',
    fontSize: 14,
  },
  signinLink: {
    color: '#FFD700',
    fontWeight: '600',
    textDecorationLine: 'underline',
  },
});
