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

export default function DebitCardPayment() {
  const router = useRouter();
  const [cardNumber, setCardNumber] = useState('');
  const [expiryMonth, setExpiryMonth] = useState('');
  const [expiryYear, setExpiryYear] = useState('');
  const [cvv, setCvv] = useState('');

  const paymentOptions = [
    { name: "UPI", path: "/upi", icon: "phone-portrait" },
    { name: "Net Banking", path: "/net-bank", icon: "business" },
    { name: "Debit Card", path: "/debit-card", icon: "card" },
    { name: "Credit Card", path: "/credit-card", icon: "card" },
    { name: "EMI Options", path: "/emi-op", icon: "calendar" },
  ];

  const amount = "1999";

  const handleMakePayment = () => {
    if (!cardNumber || !expiryMonth || !expiryYear || !cvv) {
      Alert.alert('Error', 'Please fill in all card details');
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

        <Text style={styles.pageTitle}>Pay by Debit Card</Text>

        <View style={styles.contentContainer}>
          {/* Payment Methods */}
          <View style={styles.paymentMethodsContainer}>
            {paymentOptions.map((item, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.paymentMethodButton,
                  item.name === "Debit Card" && styles.activePaymentMethod
                ]}
                onPress={() => router.push(item.path as any)}
              >
                <Ionicons 
                  name={item.icon as any} 
                  size={24} 
                  color={item.name === "Debit Card" ? "#071538" : "#D4AF37"} 
                />
                <Text style={[
                  styles.paymentMethodText,
                  item.name === "Debit Card" && styles.activePaymentMethodText
                ]}>
                  {item.name}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Card Form */}
          <View style={styles.cardForm}>
            <View style={styles.acceptedCards}>
              <Text style={styles.acceptedCardsText}>We Accept :</Text>
              <Ionicons name="card" size={24} color="#D4AF37" />
            </View>

            {/* Card Number */}
            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Card Number</Text>
              <View style={styles.cardNumberContainer}>
                <TextInput
                  style={styles.cardNumberInput}
                  value={cardNumber}
                  onChangeText={setCardNumber}
                  placeholder="1234 5678 9012 3456"
                  placeholderTextColor="#9ca3af"
                  keyboardType="numeric"
                  maxLength={19}
                />
                <Ionicons name="card" size={20} color="#9ca3af" style={styles.cardIcon} />
              </View>
            </View>

            {/* Expiry Date and CVV */}
            <View style={styles.expiryCvvContainer}>
              <Text style={styles.inputLabel}>Expiry Date & CVV</Text>
              <View style={styles.expiryCvvRow}>
                <TextInput
                  style={styles.expiryInput}
                  value={expiryMonth}
                  onChangeText={setExpiryMonth}
                  placeholder="MM"
                  placeholderTextColor="#9ca3af"
                  keyboardType="numeric"
                  maxLength={2}
                />
                <TextInput
                  style={styles.expiryInput}
                  value={expiryYear}
                  onChangeText={setExpiryYear}
                  placeholder="YY"
                  placeholderTextColor="#9ca3af"
                  keyboardType="numeric"
                  maxLength={2}
                />
                <TextInput
                  style={styles.cvvInput}
                  value={cvv}
                  onChangeText={setCvv}
                  placeholder="CVV"
                  placeholderTextColor="#9ca3af"
                  keyboardType="numeric"
                  maxLength={3}
                  secureTextEntry
                />
              </View>
            </View>

            {/* Privacy Policy */}
            <Text style={styles.privacyText}>
              I agree with the Privacy Policy by processing with this payment
            </Text>

            {/* Amount */}
            <Text style={styles.amountText}>
              INR {amount}.00
              <Text style={styles.amountSubtext}> (Total Amount Payable)</Text>
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
  cardForm: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 12,
    padding: 20,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  acceptedCards: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    gap: 8,
  },
  acceptedCardsText: {
    color: '#d1d5db',
    fontSize: 14,
    fontWeight: '500',
  },
  inputContainer: {
    marginBottom: 20,
  },
  inputLabel: {
    color: '#d1d5db',
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 8,
  },
  cardNumberContainer: {
    position: 'relative',
  },
  cardNumberInput: {
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
    backgroundColor: 'transparent',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 16,
    color: '#ffffff',
    fontSize: 16,
    paddingRight: 50,
  },
  cardIcon: {
    position: 'absolute',
    right: 16,
    top: 16,
  },
  expiryCvvContainer: {
    marginBottom: 20,
  },
  expiryCvvRow: {
    flexDirection: 'row',
    gap: 12,
  },
  expiryInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
    backgroundColor: 'transparent',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 16,
    color: '#ffffff',
    fontSize: 16,
    textAlign: 'center',
  },
  cvvInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
    backgroundColor: 'transparent',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 16,
    color: '#ffffff',
    fontSize: 16,
    textAlign: 'center',
  },
  privacyText: {
    color: '#d1d5db',
    fontSize: 16,
    marginBottom: 20,
    lineHeight: 24,
  },
  amountText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#D4AF37',
    marginBottom: 20,
  },
  amountSubtext: {
    fontSize: 16,
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
    paddingVertical: 16,
  },
  cancelButtonText: {
    color: '#9ca3af',
    fontSize: 16,
    fontWeight: '500',
    textAlign: 'center',
  },
});
