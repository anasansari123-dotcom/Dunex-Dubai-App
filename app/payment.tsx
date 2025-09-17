import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import Header from '../components/Header';

const { width, height } = Dimensions.get('window');

export default function PaymentSelection() {
  const router = useRouter();

  const paymentMethods = [
    {
      id: 'upi',
      name: 'UPI Payment',
      description: 'Pay using UPI ID or UPI apps',
      icon: 'phone-portrait',
      color: '#10b981',
      path: '/upi'
    },
    {
      id: 'credit-card',
      name: 'Credit Card',
      description: 'Pay using your credit card',
      icon: 'card',
      color: '#3b82f6',
      path: '/credit-card'
    },
    {
      id: 'debit-card',
      name: 'Debit Card',
      description: 'Pay using your debit card',
      icon: 'card',
      color: '#8b5cf6',
      path: '/debit-card'
    },
    {
      id: 'net-bank',
      name: 'Net Banking',
      description: 'Pay using net banking',
      icon: 'business',
      color: '#f59e0b',
      path: '/net-bank'
    },
    {
      id: 'emi',
      name: 'EMI Options',
      description: 'Pay in easy installments',
      icon: 'calendar',
      color: '#ef4444',
      path: '/emi-op'
    }
  ];

  const handlePaymentMethod = (path: string) => {
    router.push(path);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#0c1b3a" />
      <Header />
      
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Header Section */}
        <View style={styles.headerSection}>
          <Text style={styles.title}>Choose Payment Method</Text>
          <Text style={styles.subtitle}>
            Select your preferred payment method to complete your investment
          </Text>
        </View>

        {/* Payment Methods Grid */}
        <View style={styles.paymentMethodsContainer}>
          {paymentMethods.map((method, index) => (
            <TouchableOpacity
              key={method.id}
              style={styles.paymentMethodCard}
              onPress={() => handlePaymentMethod(method.path)}
            >
              <View style={[styles.iconContainer, { backgroundColor: method.color + '20' }]}>
                <Ionicons name={method.icon as any} size={32} color={method.color} />
              </View>
              <View style={styles.methodInfo}>
                <Text style={styles.methodName}>{method.name}</Text>
                <Text style={styles.methodDescription}>{method.description}</Text>
              </View>
              <Ionicons name="chevron-forward" size={20} color="#9ca3af" />
            </TouchableOpacity>
          ))}
        </View>

        {/* Amount Summary */}
        <View style={styles.amountSummary}>
          <View style={styles.amountRow}>
            <Text style={styles.amountLabel}>Investment Amount</Text>
            <Text style={styles.amountValue}>₹1,99,000</Text>
          </View>
          <View style={styles.amountRow}>
            <Text style={styles.amountLabel}>Processing Fee</Text>
            <Text style={styles.amountValue}>₹0</Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.amountRow}>
            <Text style={styles.totalLabel}>Total Amount</Text>
            <Text style={styles.totalValue}>₹1,99,000</Text>
          </View>
        </View>

        {/* Security Note */}
        <View style={styles.securityNote}>
          <Ionicons name="shield-checkmark" size={20} color="#10b981" />
          <Text style={styles.securityText}>
            Your payment is secured with 256-bit SSL encryption
          </Text>
        </View>

        {/* Back Button */}
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Ionicons name="arrow-back" size={20} color="#D4AF37" />
          <Text style={styles.backButtonText}>Back to Properties</Text>
        </TouchableOpacity>
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
  headerSection: {
    paddingHorizontal: 20,
    paddingVertical: 30,
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#d1d5db',
    textAlign: 'center',
    lineHeight: 24,
  },
  paymentMethodsContainer: {
    paddingHorizontal: 20,
    marginBottom: 30,
  },
  paymentMethodCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  iconContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  methodInfo: {
    flex: 1,
  },
  methodName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#ffffff',
    marginBottom: 4,
  },
  methodDescription: {
    fontSize: 14,
    color: '#9ca3af',
  },
  amountSummary: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 16,
    padding: 20,
    marginHorizontal: 20,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  amountRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  amountLabel: {
    fontSize: 16,
    color: '#d1d5db',
  },
  amountValue: {
    fontSize: 16,
    color: '#ffffff',
    fontWeight: '500',
  },
  divider: {
    height: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    marginVertical: 12,
  },
  totalLabel: {
    fontSize: 18,
    color: '#D4AF37',
    fontWeight: '600',
  },
  totalValue: {
    fontSize: 20,
    color: '#D4AF37',
    fontWeight: 'bold',
  },
  securityNote: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
    marginBottom: 30,
  },
  securityText: {
    fontSize: 14,
    color: '#10b981',
    marginLeft: 8,
    fontWeight: '500',
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    marginHorizontal: 20,
    marginBottom: 30,
  },
  backButtonText: {
    fontSize: 16,
    color: '#D4AF37',
    marginLeft: 8,
    fontWeight: '500',
  },
});
