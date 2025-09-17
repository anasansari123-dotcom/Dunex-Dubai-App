import React, { useState } from 'react';
import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  StatusBar,
  SafeAreaView,
  TouchableOpacity,
  Dimensions,
  Alert,
  Modal,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import Header from '../components/Header';

const { width, height } = Dimensions.get('window');

export default function NetBankingPayment() {
  const router = useRouter();
  const [selectedBank, setSelectedBank] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);

  const paymentOptions = [
    { name: "UPI", path: "/upi", icon: "phone-portrait" },
    { name: "Net Banking", path: "/net-bank", icon: "business" },
    { name: "Debit Card", path: "/debit-card", icon: "card" },
    { name: "Credit Card", path: "/credit-card", icon: "card" },
    { name: "EMI Options", path: "/emi-op", icon: "calendar" },
  ];

  const banks = [
    "Axis Bank",
    "Yes Bank", 
    "IDBI Bank",
    "DBS Bank",
    "Indian Bank",
    "HDFC Bank",
    "ICICI Bank",
    "State Bank of India",
    "Kotak Mahindra Bank",
    "Punjab National Bank"
  ];

  const amount = "1999";

  const handleMakePayment = () => {
    if (!selectedBank) {
      Alert.alert('Error', 'Please select a bank to continue.');
      return;
    }
    Alert.alert('Redirecting', `Redirecting to ${selectedBank} net banking...`);
    router.push('/pay-sucess');
  };

  const handleReset = () => {
    setSelectedBank('');
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

        <Text style={styles.pageTitle}>Net Banking Payment</Text>

        <View style={styles.contentContainer}>
          {/* Payment Methods */}
          <View style={styles.paymentMethodsContainer}>
            {paymentOptions.map((item, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.paymentMethodButton,
                  item.name === "Net Banking" && styles.activePaymentMethod
                ]}
                onPress={() => router.push(item.path)}
              >
                <Ionicons 
                  name={item.icon as any} 
                  size={24} 
                  color={item.name === "Net Banking" ? "#071538" : "#D4AF37"} 
                />
                <Text style={[
                  styles.paymentMethodText,
                  item.name === "Net Banking" && styles.activePaymentMethodText
                ]}>
                  {item.name}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Net Banking Form */}
          <View style={styles.netBankingForm}>
            <View style={styles.formHeader}>
              <Ionicons name="business" size={32} color="#D4AF37" />
              <Text style={styles.formTitle}>Pay via Net Banking</Text>
            </View>
            <Text style={styles.formDescription}>
              Choose your bank to be redirected to a secure net banking portal.
            </Text>

            {/* Popular Banks */}
            <View style={styles.popularBanksContainer}>
              <Text style={styles.sectionTitle}>Popular Banks</Text>
              <View style={styles.banksGrid}>
                {banks.slice(0, 6).map((bank, index) => (
                  <TouchableOpacity
                    key={index}
                    style={[
                      styles.bankButton,
                      selectedBank === bank && styles.selectedBankButton
                    ]}
                    onPress={() => setSelectedBank(bank)}
                  >
                    <Text style={[
                      styles.bankButtonText,
                      selectedBank === bank && styles.selectedBankButtonText
                    ]}>
                      {bank}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            {/* Bank Dropdown */}
            <View style={styles.dropdownContainer}>
              <Text style={styles.sectionTitle}>All Banks</Text>
              <TouchableOpacity
                style={styles.dropdownButton}
                onPress={() => setShowDropdown(!showDropdown)}
              >
                <Text style={styles.dropdownButtonText}>
                  {selectedBank || "Select Bank"}
                </Text>
                <Ionicons 
                  name={showDropdown ? "chevron-up" : "chevron-down"} 
                  size={20} 
                  color="#D4AF37" 
                />
              </TouchableOpacity>

              {showDropdown && (
                <View style={styles.dropdownList}>
                  <ScrollView style={styles.dropdownScrollView} showsVerticalScrollIndicator={false}>
                    {banks.map((bank, index) => (
                      <TouchableOpacity
                        key={index}
                        style={styles.dropdownItem}
                        onPress={() => {
                          setSelectedBank(bank);
                          setShowDropdown(false);
                        }}
                      >
                        <Text style={styles.dropdownItemText}>{bank}</Text>
                      </TouchableOpacity>
                    ))}
                  </ScrollView>
                </View>
              )}
            </View>

            {/* Amount */}
            <View style={styles.amountContainer}>
              <Text style={styles.amountLabel}>Amount Payable</Text>
              <Text style={styles.amountText}>₹{amount}</Text>
            </View>

            {/* Action Buttons */}
            <View style={styles.actionButtonsContainer}>
              <TouchableOpacity style={styles.makePaymentButton} onPress={handleMakePayment}>
                <Text style={styles.makePaymentButtonText}>Make Payment</Text>
              </TouchableOpacity>
              
              <TouchableOpacity style={styles.resetButton} onPress={handleReset}>
                <Text style={styles.resetButtonText}>Reset</Text>
              </TouchableOpacity>
              
              <TouchableOpacity style={styles.cancelButton} onPress={handleCancel}>
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>
            </View>
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
  netBankingForm: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  formHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    gap: 12,
  },
  formTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#D4AF37',
  },
  formDescription: {
    fontSize: 16,
    color: '#d1d5db',
    marginBottom: 24,
    lineHeight: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#D4AF37',
    marginBottom: 12,
  },
  popularBanksContainer: {
    marginBottom: 24,
  },
  banksGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  bankButton: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    minWidth: '30%',
  },
  selectedBankButton: {
    borderColor: '#D4AF37',
    backgroundColor: 'rgba(212, 175, 55, 0.1)',
  },
  bankButtonText: {
    color: '#d1d5db',
    fontSize: 14,
    textAlign: 'center',
  },
  selectedBankButtonText: {
    color: '#D4AF37',
    fontWeight: '600',
  },
  dropdownContainer: {
    marginBottom: 24,
  },
  dropdownButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
  },
  dropdownButtonText: {
    color: '#d1d5db',
    fontSize: 16,
    flex: 1,
  },
  dropdownList: {
    position: 'absolute',
    top: 60,
    left: 0,
    right: 0,
    backgroundColor: '#0f1f3f',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    maxHeight: 200,
    zIndex: 1000,
  },
  dropdownScrollView: {
    maxHeight: 200,
  },
  dropdownItem: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.1)',
  },
  dropdownItemText: {
    color: '#d1d5db',
    fontSize: 16,
  },
  amountContainer: {
    marginBottom: 24,
  },
  amountLabel: {
    color: '#d1d5db',
    fontSize: 16,
    marginBottom: 8,
  },
  amountText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#D4AF37',
  },
  actionButtonsContainer: {
    gap: 12,
  },
  makePaymentButton: {
    backgroundColor: '#D4AF37',
    paddingVertical: 16,
    borderRadius: 8,
  },
  makePaymentButtonText: {
    color: '#071538',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
  resetButton: {
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
    paddingVertical: 16,
    borderRadius: 8,
  },
  resetButtonText: {
    color: '#d1d5db',
    fontSize: 16,
    fontWeight: '500',
    textAlign: 'center',
  },
  cancelButton: {
    borderWidth: 1,
    borderColor: '#D4AF37',
    paddingVertical: 16,
    borderRadius: 8,
  },
  cancelButtonText: {
    color: '#D4AF37',
    fontSize: 16,
    fontWeight: '500',
    textAlign: 'center',
  },
});
