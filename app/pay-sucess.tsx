import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  SafeAreaView,
  TouchableOpacity,
  Dimensions,
  ScrollView,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import Header from '../components/Header';

const { width, height } = Dimensions.get('window');

const paymentDetails = {
  amount: "1999",
  date: "07/05/2025",
  method: "Debit Card",
  confirmation: "IST-45210HJ001",
  referenceId: "7484123435"
};

export default function PaymentSuccess() {
  const router = useRouter();

  const handleGoHome = () => {
    router.push('/');
  };

  const handleViewFAQ = () => {
    router.push('/faq');
  };

  const handleContactSupport = () => {
    router.push('/contact');
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#0c1b3a" />
      <Header />
      
      <ScrollView 
        style={styles.scrollView} 
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.successContainer}>
          {/* Success Icon */}
          <View style={styles.iconContainer}>
            <View style={styles.successIcon}>
              <Ionicons name="checkmark" size={48} color="#10b981" />
            </View>
          </View>

          {/* Success Title */}
          <Text style={styles.successTitle}>Payment Successful</Text>
          
          {/* Divider */}
          <View style={styles.divider} />

          {/* Payment Details */}
          <View style={styles.detailsContainer}>
            <Text style={styles.detailsTitle}>Payment Details</Text>
            
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Payment Amount</Text>
              <Text style={styles.detailValue}>₹ {paymentDetails.amount}.00</Text>
            </View>
            
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Payment Date</Text>
              <Text style={styles.detailValue}>{paymentDetails.date}</Text>
            </View>
            
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Payment Method</Text>
              <Text style={styles.detailValue}>{paymentDetails.method}</Text>
            </View>
            
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Confirmation</Text>
              <Text style={styles.detailValue}>{paymentDetails.confirmation}</Text>
            </View>
          </View>

          {/* Divider */}
          <View style={styles.divider} />

          {/* Reference ID */}
          <View style={styles.referenceContainer}>
            <Text style={styles.referenceLabel}>Reference ID</Text>
            <Text style={styles.referenceValue}>{paymentDetails.referenceId}</Text>
          </View>

          {/* Email Receipt Message */}
          <View style={styles.emailMessageContainer}>
            <Ionicons name="mail" size={20} color="#D4AF37" />
            <Text style={styles.emailMessage}>
              You will receive a payment receipt in your registered email ID.
            </Text>
          </View>

          {/* Help Section */}
          <View style={styles.helpContainer}>
            <Text style={styles.helpText}>
              If you need help, Contact us or
            </Text>
            <TouchableOpacity onPress={handleViewFAQ}>
              <Text style={styles.faqLink}>Visit our FAQ's</Text>
            </TouchableOpacity>
          </View>

          {/* Action Buttons */}
          <View style={styles.actionButtonsContainer}>
            <TouchableOpacity style={styles.primaryButton} onPress={handleGoHome}>
              <Ionicons name="home" size={20} color="#071538" />
              <Text style={styles.primaryButtonText}>Go to Home</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.secondaryButton} onPress={handleContactSupport}>
              <Ionicons name="call" size={20} color="#D4AF37" />
              <Text style={styles.secondaryButtonText}>Contact Support</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0c1b3a',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
    paddingVertical: 40,
  },
  successContainer: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 8,
  },
  iconContainer: {
    marginBottom: 20,
  },
  successIcon: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#f0fdf4',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 3,
    borderColor: '#10b981',
  },
  successTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 20,
    textAlign: 'center',
  },
  divider: {
    height: 1,
    backgroundColor: '#e5e7eb',
    width: '100%',
    marginVertical: 20,
  },
  detailsContainer: {
    width: '100%',
    marginBottom: 20,
  },
  detailsTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1f2937',
    textAlign: 'center',
    marginBottom: 16,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
  },
  detailLabel: {
    fontSize: 14,
    color: '#6b7280',
    flex: 1,
  },
  detailValue: {
    fontSize: 14,
    fontWeight: '500',
    color: '#1f2937',
    flex: 1,
    textAlign: 'right',
  },
  referenceContainer: {
    width: '100%',
    alignItems: 'center',
    marginBottom: 20,
  },
  referenceLabel: {
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 4,
  },
  referenceValue: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1f2937',
  },
  emailMessageContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fef3c7',
    padding: 16,
    borderRadius: 8,
    marginBottom: 20,
    gap: 12,
  },
  emailMessage: {
    fontSize: 14,
    color: '#92400e',
    flex: 1,
    lineHeight: 20,
  },
  helpContainer: {
    alignItems: 'center',
    marginBottom: 24,
  },
  helpText: {
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 4,
  },
  faqLink: {
    fontSize: 14,
    color: '#0D3451',
    fontWeight: '600',
    textDecorationLine: 'underline',
  },
  actionButtonsContainer: {
    width: '100%',
    gap: 12,
  },
  primaryButton: {
    backgroundColor: '#D4AF37',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 8,
    gap: 8,
  },
  primaryButtonText: {
    color: '#071538',
    fontSize: 16,
    fontWeight: '600',
  },
  secondaryButton: {
    borderWidth: 1,
    borderColor: '#D4AF37',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 8,
    gap: 8,
  },
  secondaryButtonText: {
    color: '#D4AF37',
    fontSize: 16,
    fontWeight: '600',
  },
});
