import React, { useState, useEffect } from 'react';
import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  TextInput,
  Alert,
  StatusBar,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import Header from '../../components/Header';

const { width, height } = Dimensions.get('window');

export default function ProfileScreen() {
  const router = useRouter();
  const [editing, setEditing] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [flash, setFlash] = useState('');
  const [submitError, setSubmitError] = useState('');
  const [investments, setInvestments] = useState([]);
  const [investmentSummary, setInvestmentSummary] = useState(null);
  const [loadingInvestments, setLoadingInvestments] = useState(false);
  
  // Mock user data - replace with actual auth context
  const [user] = useState({
    email: 'john.doe@example.com',
    created_at: '2024-01-15T10:30:00Z',
    email_confirmed_at: '2024-01-15T11:00:00Z',
  });

  const [profile] = useState({
    first_name: 'John',
    last_name: 'Doe',
    email: 'john.doe@example.com',
    phone: '+971 50 123 4567',
    country: 'India',
    address: '123 Main Street, Downtown',
    city: 'Mumbai',
    state: 'Maharashtra',
    postal_code: '400001',
  });

  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    country: 'India',
    address: '',
    city: '',
    state: '',
    postalCode: '',
  });

  // Mock investment data
  const mockInvestments = [
    {
      id: 1,
      properties: {
        title: 'Downtown Dubai Apartment',
        location: 'Downtown Dubai, UAE',
        expected_roi: 12,
      },
      amount: 500000,
      currency: 'AED',
      status: 'active',
      payment_status: 'completed',
      created_at: '2024-01-20T10:30:00Z',
    },
    {
      id: 2,
      properties: {
        title: 'Dubai Marina Villa',
        location: 'Dubai Marina, UAE',
        expected_roi: 15,
      },
      amount: 750000,
      currency: 'AED',
      status: 'pending',
      payment_status: 'processing',
      created_at: '2024-02-15T14:20:00Z',
    },
  ];

  const mockInvestmentSummary = {
    total_invested: 1250000,
    active_investments: 1,
    completed_investments: 0,
    avg_expected_return: 13.5,
  };

  // Update form when profile data loads
  useEffect(() => {
    if (profile) {
      setForm({
        firstName: profile.first_name || '',
        lastName: profile.last_name || '',
        email: profile.email || user?.email || '',
        phone: profile.phone || '',
        country: profile.country || 'India',
        address: profile.address || '',
        city: profile.city || '',
        state: profile.state || '',
        postalCode: profile.postal_code || '',
      });
    }
  }, [profile, user]);

  // Load investments and summary
  useEffect(() => {
    if (user) {
      loadInvestmentData();
    }
  }, [user]);

  const loadInvestmentData = async () => {
    setLoadingInvestments(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      setInvestments(mockInvestments);
      setInvestmentSummary(mockInvestmentSummary);
    } catch (err) {
      console.error('Error loading investment data:', err);
    } finally {
      setLoadingInvestments(false);
    }
  };

  const handleChange = (name: string, value: string) => {
    setForm(prev => ({ ...prev, [name]: value }));
    if (submitError) setSubmitError('');
    if (flash) setFlash('');
  };

  const validateForm = () => {
    const errors: any = {};
    
    if (!form.firstName.trim()) {
      errors.firstName = 'First name is required';
    }
    
    if (!form.lastName.trim()) {
      errors.lastName = 'Last name is required';
    }
    
    if (!form.email.trim()) {
      errors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      errors.email = 'Please enter a valid email address';
    }
    
    if (form.phone && !/^[+]?[0-9\s\-\(\)]{10,20}$/.test(form.phone)) {
      errors.phone = 'Please enter a valid phone number';
    }
    
    return errors;
  };

  const handleSave = async () => {
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setSubmitError('Please fix the errors below');
      return;
    }

    setIsSubmitting(true);
    setSubmitError('');

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      setFlash('Profile updated successfully!');
      setEditing(false);
      setTimeout(() => setFlash(''), 3000);
    } catch (err) {
      setSubmitError('An unexpected error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    if (profile) {
      setForm({
        firstName: profile.first_name || '',
        lastName: profile.last_name || '',
        email: profile.email || user?.email || '',
        phone: profile.phone || '',
        country: profile.country || 'India',
        address: profile.address || '',
        city: profile.city || '',
        state: profile.state || '',
        postalCode: profile.postal_code || '',
      });
    }
    setEditing(false);
    setSubmitError('');
  };

  const formatCurrency = (amount: number, currency: string = 'AED') => {
    return new Intl.NumberFormat('en-AE', {
      style: 'currency',
      currency: currency,
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return '#10b981';
      case 'pending': return '#f59e0b';
      case 'completed': return '#3b82f6';
      case 'cancelled': return '#ef4444';
      default: return '#9ca3af';
    }
  };

  const countries = [
    'India', 'UAE', 'USA', 'UK', 'Canada', 'Australia', 'Other'
  ];

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#0c1b3a" />
      <Header />
      <KeyboardAvoidingView 
        style={styles.keyboardAvoidingView}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView
          style={styles.scrollView}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.headerTitle}>My Dubai Property Investment Profile</Text>
            <TouchableOpacity 
              style={styles.backButton}
              onPress={() => router.push('/dashboard')}
            >
              <Ionicons name="arrow-back" size={20} color="#D4AF37" />
              <Text style={styles.backButtonText}>Back to Dashboard</Text>
            </TouchableOpacity>
          </View>

          {/* Flash Messages */}
          {flash ? (
            <View style={styles.flashMessage}>
              <Text style={styles.flashText}>{flash}</Text>
            </View>
          ) : null}

          {/* Error Messages */}
          {submitError ? (
            <View style={styles.errorMessage}>
              <Text style={styles.errorText}>{submitError}</Text>
            </View>
          ) : null}

          {/* Profile Header Card */}
          <View style={styles.profileHeaderCard}>
            <View style={styles.profileAvatar}>
              <Text style={styles.profileInitials}>
                {form.firstName.charAt(0).toUpperCase()}{form.lastName.charAt(0).toUpperCase()}
              </Text>
            </View>
            <View style={styles.profileInfo}>
              <Text style={styles.profileName}>
                {form.firstName} {form.lastName}
              </Text>
              <Text style={styles.profileEmail}>{form.email}</Text>
              <Text style={styles.profilePhone}>{form.phone || 'No phone number'}</Text>
              <Text style={styles.profileLocation}>
                {form.city && form.country ? `${form.city}, ${form.country}` : form.country}
              </Text>
            </View>
            <TouchableOpacity 
              style={styles.editButton}
              onPress={() => setEditing(!editing)}
            >
              <Text style={styles.editButtonText}>
                {editing ? 'Cancel' : 'Edit Profile'}
              </Text>
            </TouchableOpacity>
          </View>

          {/* Content Grid */}
          <View style={styles.contentGrid}>
            {/* Left: Profile Form */}
            <View style={styles.leftColumn}>
              <View style={styles.formCard}>
                <Text style={styles.formTitle}>Personal Information</Text>
                
                <View style={styles.formGrid}>
                  <View style={styles.formField}>
                    <Text style={styles.fieldLabel}>First Name *</Text>
                    <TextInput
                      style={[styles.textInput, !editing && styles.disabledInput]}
                      value={form.firstName}
                      onChangeText={(text) => handleChange('firstName', text)}
                      editable={editing}
                      placeholder="Enter first name"
                      placeholderTextColor="#9ca3af"
                    />
                  </View>
                  
                  <View style={styles.formField}>
                    <Text style={styles.fieldLabel}>Last Name *</Text>
                    <TextInput
                      style={[styles.textInput, !editing && styles.disabledInput]}
                      value={form.lastName}
                      onChangeText={(text) => handleChange('lastName', text)}
                      editable={editing}
                      placeholder="Enter last name"
                      placeholderTextColor="#9ca3af"
                    />
                  </View>
                  
                  <View style={styles.formField}>
                    <Text style={styles.fieldLabel}>Email *</Text>
                    <TextInput
                      style={[styles.textInput, !editing && styles.disabledInput]}
                      value={form.email}
                      onChangeText={(text) => handleChange('email', text)}
                      editable={editing}
                      keyboardType="email-address"
                      autoCapitalize="none"
                      placeholder="Enter email"
                      placeholderTextColor="#9ca3af"
                    />
                  </View>
                  
                  <View style={styles.formField}>
                    <Text style={styles.fieldLabel}>Phone</Text>
                    <TextInput
                      style={[styles.textInput, !editing && styles.disabledInput]}
                      value={form.phone}
                      onChangeText={(text) => handleChange('phone', text)}
                      editable={editing}
                      keyboardType="phone-pad"
                      placeholder="+971 50 123 4567"
                      placeholderTextColor="#9ca3af"
                    />
                  </View>
                  
                  <View style={styles.formField}>
                    <Text style={styles.fieldLabel}>Country</Text>
                    <View style={[styles.pickerContainer, !editing && styles.disabledInput]}>
                      <Text style={styles.pickerText}>{form.country}</Text>
                    </View>
                  </View>
                  
                  <View style={styles.formField}>
                    <Text style={styles.fieldLabel}>City</Text>
                    <TextInput
                      style={[styles.textInput, !editing && styles.disabledInput]}
                      value={form.city}
                      onChangeText={(text) => handleChange('city', text)}
                      editable={editing}
                      placeholder="Enter city"
                      placeholderTextColor="#9ca3af"
                    />
                  </View>
                  
                  <View style={styles.formField}>
                    <Text style={styles.fieldLabel}>State/Province</Text>
                    <TextInput
                      style={[styles.textInput, !editing && styles.disabledInput]}
                      value={form.state}
                      onChangeText={(text) => handleChange('state', text)}
                      editable={editing}
                      placeholder="Enter state"
                      placeholderTextColor="#9ca3af"
                    />
                  </View>
                  
                  <View style={styles.formField}>
                    <Text style={styles.fieldLabel}>Postal Code</Text>
                    <TextInput
                      style={[styles.textInput, !editing && styles.disabledInput]}
                      value={form.postalCode}
                      onChangeText={(text) => handleChange('postalCode', text)}
                      editable={editing}
                      placeholder="Enter postal code"
                      placeholderTextColor="#9ca3af"
                    />
                  </View>
                </View>
                
                <View style={styles.addressField}>
                  <Text style={styles.fieldLabel}>Address</Text>
                  <TextInput
                    style={[styles.textArea, !editing && styles.disabledInput]}
                    value={form.address}
                    onChangeText={(text) => handleChange('address', text)}
                    editable={editing}
                    multiline
                    numberOfLines={3}
                    placeholder="Enter address"
                    placeholderTextColor="#9ca3af"
                    textAlignVertical="top"
                  />
                </View>
                
                {editing && (
                  <View style={styles.formActions}>
                    <TouchableOpacity
                      style={[styles.saveButton, isSubmitting && styles.disabledButton]}
                      onPress={handleSave}
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <ActivityIndicator color="#071538" size="small" />
                      ) : (
                        <Text style={styles.saveButtonText}>Save Changes</Text>
                      )}
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={styles.cancelButton}
                      onPress={handleCancel}
                    >
                      <Text style={styles.cancelButtonText}>Cancel</Text>
                    </TouchableOpacity>
                  </View>
                )}
              </View>

              {/* Investment History */}
              <View style={styles.investmentCard}>
                <Text style={styles.cardTitle}>Investment History</Text>
                {loadingInvestments ? (
                  <View style={styles.loadingContainer}>
                    <ActivityIndicator color="#D4AF37" size="large" />
                    <Text style={styles.loadingText}>Loading investments...</Text>
                  </View>
                ) : investments.length > 0 ? (
                  <View style={styles.investmentList}>
                    {investments.map((investment) => (
                      <View key={investment.id} style={styles.investmentItem}>
                        <View style={styles.investmentHeader}>
                          <Text style={styles.investmentTitle}>
                            {investment.properties?.title}
                          </Text>
                          <View style={[styles.statusBadge, { backgroundColor: getStatusColor(investment.status) }]}>
                            <Text style={styles.statusText}>
                              {investment.status.toUpperCase()}
                            </Text>
                          </View>
                        </View>
                        <Text style={styles.investmentLocation}>
                          {investment.properties?.location}
                        </Text>
                        <View style={styles.investmentDetails}>
                          <View style={styles.investmentDetail}>
                            <Text style={styles.detailLabel}>Amount:</Text>
                            <Text style={styles.detailValue}>
                              {formatCurrency(investment.amount, investment.currency)}
                            </Text>
                          </View>
                          <View style={styles.investmentDetail}>
                            <Text style={styles.detailLabel}>Expected ROI:</Text>
                            <Text style={styles.detailValue}>
                              {investment.properties?.expected_roi}%
                            </Text>
                          </View>
                          <View style={styles.investmentDetail}>
                            <Text style={styles.detailLabel}>Date:</Text>
                            <Text style={styles.detailValue}>
                              {formatDate(investment.created_at)}
                            </Text>
                          </View>
                          <View style={styles.investmentDetail}>
                            <Text style={styles.detailLabel}>Payment:</Text>
                            <Text style={[styles.detailValue, { color: getStatusColor(investment.payment_status) }]}>
                              {investment.payment_status.toUpperCase()}
                            </Text>
                          </View>
                        </View>
                      </View>
                    ))}
                  </View>
                ) : (
                  <View style={styles.emptyState}>
                    <Text style={styles.emptyText}>No investments yet</Text>
                    <TouchableOpacity style={styles.browseButton}>
                      <Text style={styles.browseButtonText}>Browse Properties</Text>
                    </TouchableOpacity>
                  </View>
                )}
              </View>
            </View>

            {/* Right: Investment Summary */}
            <View style={styles.rightColumn}>
              <View style={styles.summaryCard}>
                <Text style={styles.cardTitle}>Investment Summary</Text>
                {loadingInvestments ? (
                  <View style={styles.loadingContainer}>
                    <ActivityIndicator color="#D4AF37" size="small" />
                    <Text style={styles.loadingText}>Loading...</Text>
                  </View>
                ) : investmentSummary ? (
                  <View style={styles.summaryList}>
                    <View style={styles.summaryItem}>
                      <Text style={styles.summaryLabel}>Total Invested</Text>
                      <Text style={styles.summaryValue}>
                        {formatCurrency(investmentSummary.total_invested || 0)}
                      </Text>
                    </View>
                    <View style={styles.summaryItem}>
                      <Text style={styles.summaryLabel}>Active Investments</Text>
                      <Text style={styles.summaryValue}>
                        {investmentSummary.active_investments || 0}
                      </Text>
                    </View>
                    <View style={styles.summaryItem}>
                      <Text style={styles.summaryLabel}>Completed</Text>
                      <Text style={styles.summaryValue}>
                        {investmentSummary.completed_investments || 0}
                      </Text>
                    </View>
                    <View style={styles.summaryItem}>
                      <Text style={styles.summaryLabel}>Avg. Expected Return</Text>
                      <Text style={styles.summaryValue}>
                        {investmentSummary.avg_expected_return ? 
                          `${investmentSummary.avg_expected_return.toFixed(1)}%` : 
                          'N/A'
                        }
                      </Text>
                    </View>
                  </View>
                ) : (
                  <View style={styles.emptyState}>
                    <Text style={styles.emptyText}>No data available</Text>
                  </View>
                )}
                <TouchableOpacity style={styles.browseButton}>
                  <Text style={styles.browseButtonText}>Browse Properties</Text>
                </TouchableOpacity>
              </View>

              {/* Account Status */}
              <View style={styles.statusCard}>
                <Text style={styles.cardTitle}>Account Status</Text>
                <View style={styles.statusList}>
                  <View style={styles.statusItem}>
                    <Text style={styles.statusLabel}>Email Verified</Text>
                    <Text style={[styles.statusValue, { color: user?.email_confirmed_at ? '#10b981' : '#ef4444' }]}>
                      {user?.email_confirmed_at ? 'Yes' : 'No'}
                    </Text>
                  </View>
                  <View style={styles.statusItem}>
                    <Text style={styles.statusLabel}>Profile Complete</Text>
                    <Text style={[styles.statusValue, { color: profile ? '#10b981' : '#f59e0b' }]}>
                      {profile ? 'Yes' : 'Partial'}
                    </Text>
                  </View>
                  <View style={styles.statusItem}>
                    <Text style={styles.statusLabel}>Member Since</Text>
                    <Text style={styles.statusValue}>
                      {user?.created_at ? formatDate(user.created_at) : 'N/A'}
                    </Text>
                  </View>
                </View>
              </View>
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
    backgroundColor: '#0c1b3a',
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 40,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    marginBottom: 20,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#D4AF37',
    flex: 1,
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  backButtonText: {
    color: '#D4AF37',
    fontSize: 14,
    textDecorationLine: 'underline',
  },
  flashMessage: {
    backgroundColor: 'rgba(34, 197, 94, 0.2)',
    borderWidth: 1,
    borderColor: 'rgba(34, 197, 94, 0.5)',
    borderRadius: 8,
    padding: 16,
    marginHorizontal: 20,
    marginBottom: 20,
  },
  flashText: {
    color: '#10b981',
    fontSize: 14,
  },
  errorMessage: {
    backgroundColor: 'rgba(239, 68, 68, 0.2)',
    borderWidth: 1,
    borderColor: 'rgba(239, 68, 68, 0.5)',
    borderRadius: 8,
    padding: 16,
    marginHorizontal: 20,
    marginBottom: 20,
  },
  errorText: {
    color: '#ef4444',
    fontSize: 14,
  },
  profileHeaderCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 16,
    padding: 20,
    marginHorizontal: 20,
    marginBottom: 20,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 20,
  },
  profileAvatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#D4AF37',
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileInitials: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#071538',
  },
  profileInfo: {
    flex: 1,
  },
  profileName: {
    fontSize: 20,
    fontWeight: '600',
    color: '#ffffff',
    marginBottom: 4,
  },
  profileEmail: {
    fontSize: 14,
    color: '#d1d5db',
    marginBottom: 2,
  },
  profilePhone: {
    fontSize: 14,
    color: '#d1d5db',
    marginBottom: 2,
  },
  profileLocation: {
    fontSize: 14,
    color: '#d1d5db',
  },
  editButton: {
    borderWidth: 1,
    borderColor: '#D4AF37',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  editButtonText: {
    color: '#D4AF37',
    fontSize: 14,
    fontWeight: '500',
  },
  contentGrid: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    gap: 20,
  },
  leftColumn: {
    flex: 2,
  },
  rightColumn: {
    flex: 1,
  },
  formCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
  },
  formTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 16,
  },
  formGrid: {
    gap: 16,
  },
  formField: {
    flex: 1,
  },
  addressField: {
    marginTop: 16,
  },
  fieldLabel: {
    fontSize: 14,
    color: '#d1d5db',
    marginBottom: 8,
  },
  textInput: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    color: '#ffffff',
    fontSize: 14,
  },
  textArea: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    color: '#ffffff',
    fontSize: 14,
    height: 80,
    textAlignVertical: 'top',
  },
  disabledInput: {
    opacity: 0.6,
  },
  pickerContainer: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    justifyContent: 'center',
  },
  pickerText: {
    color: '#ffffff',
    fontSize: 14,
  },
  formActions: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 20,
  },
  saveButton: {
    backgroundColor: '#D4AF37',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
    flex: 1,
    alignItems: 'center',
  },
  saveButtonText: {
    color: '#071538',
    fontSize: 14,
    fontWeight: '600',
  },
  disabledButton: {
    opacity: 0.5,
  },
  cancelButton: {
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
    flex: 1,
    alignItems: 'center',
  },
  cancelButtonText: {
    color: '#d1d5db',
    fontSize: 14,
    fontWeight: '500',
  },
  investmentCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 16,
    padding: 20,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 16,
  },
  loadingContainer: {
    alignItems: 'center',
    paddingVertical: 20,
  },
  loadingText: {
    color: '#9ca3af',
    fontSize: 14,
    marginTop: 8,
  },
  investmentList: {
    gap: 16,
  },
  investmentItem: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 8,
    padding: 16,
  },
  investmentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  investmentTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ffffff',
    flex: 1,
    marginRight: 8,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  statusText: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: '600',
  },
  investmentLocation: {
    fontSize: 14,
    color: '#d1d5db',
    marginBottom: 12,
  },
  investmentDetails: {
    gap: 8,
  },
  investmentDetail: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  detailLabel: {
    fontSize: 14,
    color: '#9ca3af',
  },
  detailValue: {
    fontSize: 14,
    color: '#D4AF37',
    fontWeight: '600',
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: 20,
  },
  emptyText: {
    color: '#9ca3af',
    fontSize: 14,
    marginBottom: 12,
  },
  browseButton: {
    backgroundColor: '#D4AF37',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
  browseButtonText: {
    color: '#071538',
    fontSize: 14,
    fontWeight: '600',
  },
  summaryCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
  },
  summaryList: {
    gap: 16,
    marginBottom: 20,
  },
  summaryItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  summaryLabel: {
    fontSize: 14,
    color: '#d1d5db',
  },
  summaryValue: {
    fontSize: 14,
    color: '#D4AF37',
    fontWeight: '600',
  },
  statusCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 16,
    padding: 20,
  },
  statusList: {
    gap: 12,
  },
  statusItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  statusLabel: {
    fontSize: 14,
    color: '#d1d5db',
  },
  statusValue: {
    fontSize: 14,
    fontWeight: '600',
  },
});
