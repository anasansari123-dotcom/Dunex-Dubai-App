import React, { useState } from 'react';
import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  StatusBar,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
  Dimensions,
  Alert,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import Header from '../components/Header';

const { width, height } = Dimensions.get('window');

export default function UPIPayment() {
  const router = useRouter();
  const [upiId, setUpiId] = useState('');
  const [autoRenew, setAutoRenew] = useState(false);

  const paymentOptions = [
    { name: "UPI", path: "/upi", icon: "phone-portrait" },
    { name: "Net Banking", path: "/net-bank", icon: "business" },
    { name: "Debit Card", path: "/debit-card", icon: "card" },
    { name: "Credit Card", path: "/credit-card", icon: "card" },
    { name: "EMI Options", path: "/emi-op", icon: "calendar" },
  ];

  const upiApps = [
    { label: "PhonePe", icon: "phone-portrait" },
    { label: "GPay", icon: "logo-google" },
    { label: "Others", icon: "apps" },
  ];

  const otherPaymentMethods = [
    "Credit / Debit Card",
    "PayTm Wallet", 
    "Net Banking"
  ];

  const amount = "1999";

  const handleMakePayment = () => {
    if (!upiId) {
      Alert.alert('Error', 'Please enter your UPI ID');
      return;
    }
    router.push('/pay-sucess' as any);
  };

  const handleCancel = () => {
    Alert.alert('Payment Cancelled', 'Your payment has been cancelled.');
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#0c1b3a" />
      <Header />
      
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Timer Section */}
        <View style={styles.timerSection}>
          <Text style={styles.timerText}>Transaction times out in 4:53 Mins</Text>
        </View>

        <View style={styles.divider} />

        <Text style={styles.pageTitle}>Pay using UPI</Text>

        <View style={styles.contentContainer}>
          {/* Payment Methods */}
          <View style={styles.paymentMethodsContainer}>
            {paymentOptions.map((item, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.paymentMethodButton,
                  item.name === "UPI" && styles.activePaymentMethod
                ]}
                onPress={() => router.push(item.path as any)}
              >
                <Ionicons 
                  name={item.icon as any} 
                  size={24} 
                  color={item.name === "UPI" ? "#071538" : "#D4AF37"} 
                />
                <Text style={[
                  styles.paymentMethodText,
                  item.name === "UPI" && styles.activePaymentMethodText
                ]}>
                  {item.name}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* UPI Form */}
          <View style={styles.upiForm}>
            <Text style={styles.formTitle}>Pay using UPI</Text>

            {/* UPI App Buttons */}
            <View style={styles.upiAppsContainer}>
              {upiApps.map((app, index) => (
                <TouchableOpacity key={index} style={styles.upiAppButton}>
                  <Ionicons name={app.icon as any} size={20} color="#D4AF37" />
                  <Text style={styles.upiAppText}>{app.label}</Text>
                </TouchableOpacity>
              ))}
            </View>

            {/* Auto Renew Checkbox */}
            <View style={styles.checkboxContainer}>
              <TouchableOpacity 
                style={styles.checkbox}
                onPress={() => setAutoRenew(!autoRenew)}
              >
                {autoRenew && <Ionicons name="checkmark" size={16} color="#071538" />}
              </TouchableOpacity>
              <Text style={styles.checkboxText}>
                Auto-renew my plan on expiry. Cancel anytime.
              </Text>
            </View>

            {/* UPI ID Input */}
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.upiInput}
                value={upiId}
                onChangeText={setUpiId}
                placeholder="Enter your UPI ID"
                placeholderTextColor="#9ca3af"
                autoCapitalize="none"
              />
            </View>

            {/* Other Payment Options */}
            <View style={styles.otherPaymentContainer}>
              {otherPaymentMethods.map((method, index) => (
                <TouchableOpacity key={index} style={styles.otherPaymentButton}>
                  <Text style={styles.otherPaymentText}>{method}</Text>
                </TouchableOpacity>
              ))}
            </View>

            {/* Amount */}
            <Text style={styles.amountText}>
              INR {amount}.00
              <Text style={styles.amountSubtext}> (Total Payable)</Text>
            </Text>

            {/* Buttons */}
            <TouchableOpacity style={styles.makePaymentButton} onPress={handleMakePayment}>
              <Text style={styles.makePaymentButtonText}>Make Payment</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.cancelButton} onPress={handleCancel}>
              <Text style={styles.cancelButtonText}>Cancel</Text>
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
  timerSection: {
    backgroundColor: '#071538',
    paddingVertical: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 8,
    marginHorizontal: 20,
    marginTop: 20,
  },
  timerText: {
    color: '#D4AF37',
    fontSize: 18,
    fontWeight: '600',
  },
  divider: {
    height: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    marginVertical: 20,
    marginHorizontal: 20,
  },
  pageTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: '#D4AF37',
    marginBottom: 20,
    paddingHorizontal: 20,
  },
  contentContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    gap: 20,
  },
  paymentMethodsContainer: {
    width: '30%',
  },
  paymentMethodButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 12,
    marginBottom: 12,
    borderRadius: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    gap: 12,
  },
  activePaymentMethod: {
    backgroundColor: '#D4AF37',
  },
  paymentMethodText: {
    color: '#d1d5db',
    fontSize: 14,
    fontWeight: '500',
    flex: 1,
  },
  activePaymentMethodText: {
    color: '#071538',
  },
  upiForm: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  formTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#D4AF37',
    marginBottom: 20,
  },
  upiAppsContainer: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 20,
  },
  upiAppButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    gap: 8,
  },
  upiAppText: {
    color: '#d1d5db',
    fontSize: 14,
    fontWeight: '500',
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 20,
    gap: 12,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 2,
    borderColor: '#D4AF37',
    borderRadius: 4,
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 2,
  },
  checkboxText: {
    color: '#d1d5db',
    fontSize: 14,
    flex: 1,
    lineHeight: 20,
  },
  inputContainer: {
    marginBottom: 20,
  },
  upiInput: {
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
    backgroundColor: 'transparent',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 16,
    color: '#ffffff',
    fontSize: 16,
  },
  otherPaymentContainer: {
    gap: 12,
    marginBottom: 20,
  },
  otherPaymentButton: {
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
  },
  otherPaymentText: {
    color: '#d1d5db',
    fontSize: 16,
    textAlign: 'center',
  },
  amountText: {
    fontSize: 20,
    fontWeight: '600',
    color: '#D4AF37',
    marginBottom: 20,
  },
  amountSubtext: {
    fontSize: 14,
    fontWeight: 'normal',
    color: '#9ca3af',
  },
  makePaymentButton: {
    backgroundColor: '#D4AF37',
    paddingVertical: 16,
    borderRadius: 8,
    marginBottom: 12,
  },
  makePaymentButtonText: {
    color: '#071538',
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
  },
  cancelButton: {
    paddingVertical: 12,
  },
  cancelButtonText: {
    color: '#9ca3af',
    fontSize: 16,
    fontWeight: '500',
    textAlign: 'center',
    textDecorationLine: 'underline',
  },
});
