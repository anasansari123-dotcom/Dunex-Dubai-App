import React, { useState, useRef } from 'react';
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
  Linking,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Header from '../../components/Header';

const { width, height } = Dimensions.get('window');

export default function ContactScreen() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    inquiryType: 'general',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState('');

  const handleInputChange = (name: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
      Alert.alert('Error', 'Please fill in all required fields');
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus('');

    try {
      // Simulate form submission
      await new Promise(resolve => setTimeout(resolve, 2000));
      setSubmitStatus('success');
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
        inquiryType: 'general',
      });
      Alert.alert('Success', 'Thank you for your message! We\'ll get back to you within 24 hours.');
    } catch (error) {
      setSubmitStatus('error');
      Alert.alert('Error', 'Sorry, there was an error sending your message. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const openEmail = () => {
    Linking.openURL('mailto:info@dunexdubai.com');
  };

  const openPhone = () => {
    Linking.openURL('tel:+9714XXXXXXX');
  };

  const openWhatsApp = () => {
    Linking.openURL('https://wa.me/97150XXXXXXX');
  };

  const openWebsite = () => {
    Linking.openURL('https://www.dunexdubai.com');
  };

  const inquiryTypes = [
    { value: 'general', label: 'General Inquiry' },
    { value: 'investment', label: 'Investment Opportunity' },
    { value: 'support', label: 'Technical Support' },
    { value: 'refund', label: 'Refund Request' },
    { value: 'partnership', label: 'Partnership' },
    { value: 'media', label: 'Media Inquiry' },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#0B1D39" />
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
          {/* Header Section */}
          <View style={styles.headerSection}>
            <Text style={styles.headerTitle}>Contact DunexDubai</Text>
            <Text style={styles.headerSubtitle}>
              Get in touch with our expert team for Dubai property investment opportunities, 
              support, and personalized guidance.
            </Text>
          </View>

          <View style={styles.contentContainer}>
            {/* Contact Information Section */}
            <View style={styles.contactInfoSection}>
              {/* Office Locations */}
              <View style={styles.infoCard}>
                <Text style={styles.cardTitle}>📍 Office Locations</Text>
                
                <View style={styles.locationCard}>
                  <Text style={styles.locationTitle}>Dubai Headquarters</Text>
                  <View style={styles.locationDetails}>
                    <Text style={styles.locationText}><Text style={styles.bold}>Address:</Text> Business Bay, Dubai, UAE</Text>
                    <Text style={styles.locationText}><Text style={styles.bold}>Building:</Text> Dubai International Financial Centre</Text>
                    <Text style={styles.locationText}><Text style={styles.bold}>Floor:</Text> 15th Floor, Suite 1501</Text>
                    <Text style={styles.locationText}><Text style={styles.bold}>PO Box:</Text> 12345, Dubai, UAE</Text>
                  </View>
                </View>

                <View style={styles.locationCard}>
                  <Text style={styles.locationTitle}>India Support Office</Text>
                  <View style={styles.locationDetails}>
                    <Text style={styles.locationText}><Text style={styles.bold}>Address:</Text> Mumbai, Maharashtra, India</Text>
                    <Text style={styles.locationText}><Text style={styles.bold}>Building:</Text> Bandra Kurla Complex</Text>
                    <Text style={styles.locationText}><Text style={styles.bold}>Floor:</Text> 8th Floor, Tower A</Text>
                    <Text style={styles.locationText}><Text style={styles.bold}>PIN Code:</Text> 400051</Text>
                  </View>
                </View>
              </View>

              {/* Contact Details */}
              <View style={styles.infoCard}>
                <Text style={styles.cardTitle}>📞 Contact Details</Text>
                
                <TouchableOpacity style={styles.contactItem} onPress={openEmail}>
                  <View style={styles.contactIcon}>
                    <Ionicons name="mail" size={24} color="#D4AF37" />
                  </View>
                  <View style={styles.contactText}>
                    <Text style={styles.contactLabel}>Email</Text>
                    <Text style={styles.contactValue}>info@dunexdubai.com</Text>
                  </View>
                </TouchableOpacity>

                <TouchableOpacity style={styles.contactItem} onPress={openPhone}>
                  <View style={styles.contactIcon}>
                    <Ionicons name="call" size={24} color="#D4AF37" />
                  </View>
                  <View style={styles.contactText}>
                    <Text style={styles.contactLabel}>Phone (UAE)</Text>
                    <Text style={styles.contactValue}>+971 4 XXX XXXX</Text>
                  </View>
                </TouchableOpacity>

                <TouchableOpacity style={styles.contactItem} onPress={openWhatsApp}>
                  <View style={styles.contactIcon}>
                    <Ionicons name="logo-whatsapp" size={24} color="#D4AF37" />
                  </View>
                  <View style={styles.contactText}>
                    <Text style={styles.contactLabel}>WhatsApp</Text>
                    <Text style={styles.contactValue}>+971 50 XXX XXXX</Text>
                  </View>
                </TouchableOpacity>

                <TouchableOpacity style={styles.contactItem} onPress={openWebsite}>
                  <View style={styles.contactIcon}>
                    <Ionicons name="globe" size={24} color="#D4AF37" />
                  </View>
                  <View style={styles.contactText}>
                    <Text style={styles.contactLabel}>Website</Text>
                    <Text style={styles.contactValue}>www.dunexdubai.com</Text>
                  </View>
                </TouchableOpacity>
              </View>

              {/* Business Hours */}
              <View style={styles.infoCard}>
                <Text style={styles.cardTitle}>🕒 Business Hours</Text>
                
                <View style={styles.hoursContainer}>
                  <View style={styles.hoursRow}>
                    <Text style={styles.hoursDay}>Monday - Friday</Text>
                    <Text style={styles.hoursTime}>9:00 AM - 6:00 PM (UAE Time)</Text>
                  </View>
                  <View style={styles.hoursRow}>
                    <Text style={styles.hoursDay}>Saturday</Text>
                    <Text style={styles.hoursTime}>10:00 AM - 4:00 PM (UAE Time)</Text>
                  </View>
                  <View style={styles.hoursRow}>
                    <Text style={styles.hoursDay}>Sunday</Text>
                    <Text style={styles.hoursTime}>Closed</Text>
                  </View>
                  <View style={styles.hoursRow}>
                    <Text style={styles.hoursDay}>Emergency Support</Text>
                    <Text style={styles.hoursTime}>24/7 Available</Text>
                  </View>
                </View>
              </View>
            </View>

            {/* Contact Form */}
            <View style={styles.formCard}>
              <Text style={styles.formTitle}>💬 Send us a Message</Text>

              {submitStatus === 'success' && (
                <View style={styles.successMessage}>
                  <Text style={styles.successText}>
                    Thank you for your message! We'll get back to you within 24 hours.
                  </Text>
                </View>
              )}

              {submitStatus === 'error' && (
                <View style={styles.errorMessage}>
                  <Text style={styles.errorText}>
                    Sorry, there was an error sending your message. Please try again.
                  </Text>
                </View>
              )}

              <View style={styles.formContainer}>
                {/* Name and Email Row */}
                <View style={styles.formRow}>
                  <View style={styles.formField}>
                    <Text style={styles.fieldLabel}>Full Name *</Text>
                    <TextInput
                      style={styles.textInput}
                      value={formData.name}
                      onChangeText={(text) => handleInputChange('name', text)}
                      placeholder="Enter your full name"
                      placeholderTextColor="#9ca3af"
                    />
                  </View>
                  <View style={styles.formField}>
                    <Text style={styles.fieldLabel}>Email Address *</Text>
                    <TextInput
                      style={styles.textInput}
                      value={formData.email}
                      onChangeText={(text) => handleInputChange('email', text)}
                      placeholder="Enter your email"
                      placeholderTextColor="#9ca3af"
                      keyboardType="email-address"
                      autoCapitalize="none"
                    />
                  </View>
                </View>

                {/* Phone and Inquiry Type Row */}
                <View style={styles.formRow}>
                  <View style={styles.formField}>
                    <Text style={styles.fieldLabel}>Phone Number</Text>
                    <TextInput
                      style={styles.textInput}
                      value={formData.phone}
                      onChangeText={(text) => handleInputChange('phone', text)}
                      placeholder="+971 XX XXX XXXX"
                      placeholderTextColor="#9ca3af"
                      keyboardType="phone-pad"
                    />
                  </View>
                  <View style={styles.formField}>
                    <Text style={styles.fieldLabel}>Inquiry Type</Text>
                    <View style={styles.pickerContainer}>
                      <Text style={styles.pickerText}>
                        {inquiryTypes.find(type => type.value === formData.inquiryType)?.label}
                      </Text>
                    </View>
                  </View>
                </View>

                {/* Subject */}
                <View style={styles.formField}>
                  <Text style={styles.fieldLabel}>Subject *</Text>
                  <TextInput
                    style={styles.textInput}
                    value={formData.subject}
                    onChangeText={(text) => handleInputChange('subject', text)}
                    placeholder="Brief subject of your inquiry"
                    placeholderTextColor="#9ca3af"
                  />
                </View>

                {/* Message */}
                <View style={styles.formField}>
                  <Text style={styles.fieldLabel}>Message *</Text>
                  <TextInput
                    style={[styles.textInput, styles.textArea]}
                    value={formData.message}
                    onChangeText={(text) => handleInputChange('message', text)}
                    placeholder="Please provide details about your inquiry..."
                    placeholderTextColor="#9ca3af"
                    multiline
                    numberOfLines={6}
                    textAlignVertical="top"
                  />
                </View>

                {/* Submit Button */}
                <TouchableOpacity
                  style={[styles.submitButton, isSubmitting && styles.submitButtonDisabled]}
                  onPress={handleSubmit}
                  disabled={isSubmitting}
                >
                  <Text style={styles.submitButtonText}>
                    {isSubmitting ? 'Sending Message...' : 'Send Message'}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* Additional Information */}
            <View style={styles.additionalInfo}>
              <View style={styles.infoItem}>
                <View style={styles.infoIcon}>
                  <Ionicons name="flash" size={24} color="#D4AF37" />
                </View>
                <Text style={styles.infoTitle}>Quick Response</Text>
                <Text style={styles.infoDescription}>
                  We respond to all inquiries within 24 hours during business days.
                </Text>
              </View>

              <View style={styles.infoItem}>
                <View style={styles.infoIcon}>
                  <Ionicons name="shield-checkmark" size={24} color="#D4AF37" />
                </View>
                <Text style={styles.infoTitle}>Secure Communication</Text>
                <Text style={styles.infoDescription}>
                  All communications are encrypted and your privacy is protected.
                </Text>
              </View>

              <View style={styles.infoItem}>
                <View style={styles.infoIcon}>
                  <Ionicons name="target" size={24} color="#D4AF37" />
                </View>
                <Text style={styles.infoTitle}>Expert Guidance</Text>
                <Text style={styles.infoDescription}>
                  Get personalized advice from our Dubai real estate investment experts.
                </Text>
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
    backgroundColor: '#0B1D39',
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
  headerSection: {
    padding: 20,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#D4AF37',
    marginBottom: 16,
    textAlign: 'center',
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#d1d5db',
    textAlign: 'center',
    lineHeight: 24,
    maxWidth: width * 0.9,
  },
  contentContainer: {
    padding: 20,
  },
  contactInfoSection: {
    marginBottom: 30,
  },
  infoCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: 'rgba(212, 175, 55, 0.2)',
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#D4AF37',
    marginBottom: 16,
  },
  locationCard: {
    backgroundColor: 'rgba(26, 43, 92, 0.5)',
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: 'rgba(212, 175, 55, 0.2)',
  },
  locationTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#D4AF37',
    marginBottom: 8,
  },
  locationDetails: {
    gap: 4,
  },
  locationText: {
    fontSize: 14,
    color: '#d1d5db',
  },
  bold: {
    fontWeight: 'bold',
  },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    gap: 16,
  },
  contactIcon: {
    width: 48,
    height: 48,
    backgroundColor: 'rgba(212, 175, 55, 0.2)',
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  contactText: {
    flex: 1,
  },
  contactLabel: {
    fontSize: 14,
    color: '#d1d5db',
    marginBottom: 4,
  },
  contactValue: {
    fontSize: 14,
    color: '#D4AF37',
    fontWeight: '500',
  },
  hoursContainer: {
    gap: 12,
  },
  hoursRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  hoursDay: {
    fontSize: 14,
    color: '#d1d5db',
  },
  hoursTime: {
    fontSize: 14,
    color: '#d1d5db',
    fontWeight: '500',
  },
  formCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 16,
    padding: 20,
    marginBottom: 30,
    borderWidth: 1,
    borderColor: 'rgba(212, 175, 55, 0.2)',
  },
  formTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#D4AF37',
    marginBottom: 20,
  },
  successMessage: {
    backgroundColor: 'rgba(34, 197, 94, 0.2)',
    borderWidth: 1,
    borderColor: 'rgba(34, 197, 94, 0.5)',
    borderRadius: 8,
    padding: 16,
    marginBottom: 20,
  },
  successText: {
    color: '#10b981',
    fontSize: 14,
  },
  errorMessage: {
    backgroundColor: 'rgba(239, 68, 68, 0.2)',
    borderWidth: 1,
    borderColor: 'rgba(239, 68, 68, 0.5)',
    borderRadius: 8,
    padding: 16,
    marginBottom: 20,
  },
  errorText: {
    color: '#ef4444',
    fontSize: 14,
  },
  formContainer: {
    gap: 16,
  },
  formRow: {
    flexDirection: 'row',
    gap: 12,
  },
  formField: {
    flex: 1,
  },
  fieldLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: '#d1d5db',
    marginBottom: 8,
  },
  textInput: {
    backgroundColor: '#13244a',
    borderWidth: 1,
    borderColor: '#6b7280',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    color: '#ffffff',
    fontSize: 14,
  },
  textArea: {
    height: 120,
    textAlignVertical: 'top',
  },
  pickerContainer: {
    backgroundColor: '#13244a',
    borderWidth: 1,
    borderColor: '#6b7280',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    justifyContent: 'center',
  },
  pickerText: {
    color: '#ffffff',
    fontSize: 14,
  },
  submitButton: {
    backgroundColor: '#D4AF37',
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 8,
  },
  submitButtonDisabled: {
    opacity: 0.5,
  },
  submitButtonText: {
    color: '#0B1D39',
    fontSize: 16,
    fontWeight: 'bold',
  },
  additionalInfo: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
  },
  infoItem: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
    flex: 1,
    minWidth: width * 0.4,
    borderWidth: 1,
    borderColor: 'rgba(212, 175, 55, 0.2)',
  },
  infoIcon: {
    width: 64,
    height: 64,
    backgroundColor: 'rgba(212, 175, 55, 0.2)',
    borderRadius: 32,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#D4AF37',
    marginBottom: 8,
    textAlign: 'center',
  },
  infoDescription: {
    fontSize: 14,
    color: '#d1d5db',
    textAlign: 'center',
    lineHeight: 20,
  },
});
