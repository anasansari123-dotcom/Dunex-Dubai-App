import React, { useState, useEffect } from 'react';
import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  StatusBar,
  SafeAreaView,
  ActivityIndicator,
  Image,
  Modal,
  TextInput,
  Alert,
  Animated,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useAuth } from '../hooks/useAuth';
import Header from '../components/Header';

const { width, height } = Dimensions.get('window');

export default function DashboardScreen() {
  const router = useRouter();
  const { user, isAuthenticated, loading } = useAuth();
  const [showModal, setShowModal] = useState(false);
  const [currentProperty, setCurrentProperty] = useState(null);
  const [isInvesting, setIsInvesting] = useState(false);
  const [properties, setProperties] = useState([]);
  const [investments, setInvestments] = useState([]);
  const [investmentSummary, setInvestmentSummary] = useState({
    total_investments: 0,
    total_invested: 0,
    active_investments: 0,
    total_expected_monthly_return: 0,
  });

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login');
    }
  }, [isAuthenticated, router]);

  useEffect(() => {
    // Mock data loading - replace with actual API calls
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    // Mock data - replace with actual API calls
    setProperties([
      {
        id: 1,
        title: "Downtown Dubai Luxury Apartment",
        location: "Downtown Dubai",
        city: "Dubai",
        price: 2500000,
        minimum_investment: 100000,
        maximum_investment: 1000000,
        expected_roi: 12,
        short_description: "Premium apartment in the heart of Dubai with excellent ROI potential",
        images: ["https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=500"],
        is_featured: true,
      },
      {
        id: 2,
        title: "Palm Jumeirah Villa",
        location: "Palm Jumeirah",
        city: "Dubai",
        price: 5000000,
        minimum_investment: 200000,
        maximum_investment: 2000000,
        expected_roi: 15,
        short_description: "Exclusive villa on the iconic Palm Jumeirah with stunning sea views",
        images: ["https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=500"],
        is_featured: false,
      },
      {
        id: 3,
        title: "Dubai Marina Penthouse",
        location: "Dubai Marina",
        city: "Dubai",
        price: 8000000,
        minimum_investment: 300000,
        maximum_investment: 3000000,
        expected_roi: 10,
        short_description: "Luxury penthouse with panoramic marina views",
        images: ["https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=500"],
        is_featured: true,
      },
    ]);

    setInvestments([
      {
        id: 1,
        property_id: 1,
        amount: 150000,
        status: 'active',
      },
      {
        id: 2,
        property_id: 2,
        amount: 200000,
        status: 'active',
      },
    ]);

    setInvestmentSummary({
      total_investments: 2,
      total_invested: 350000,
      active_investments: 2,
      total_expected_monthly_return: 35000,
    });
  };

  const handlePurchase = async (property) => {
    setIsInvesting(true);
    try {
      setCurrentProperty(property);
      setShowModal(true);
    } catch (error) {
      console.error('Error initiating investment:', error);
      Alert.alert('Error', 'Failed to initiate investment. Please try again.');
    } finally {
      setIsInvesting(false);
    }
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-AE', {
      style: 'currency',
      currency: 'AED',
      minimumFractionDigits: 0
    }).format(amount);
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="light-content" backgroundColor="#0B1D39" />
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#D4AF37" />
          <Text style={styles.loadingText}>Loading Dashboard...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#0B1D39" />
      <Header />
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          {/* Header */}
          <View style={styles.headerSection}>
            <Text style={styles.mainTitle}>🏢 Dunex Investment Dashboard</Text>
            <Text style={styles.welcomeSubtitle}>Welcome back, {user?.name || 'Investor'}!</Text>
          </View>

          {/* Investment Summary */}
          <View style={styles.summaryContainer}>
            <View style={styles.summaryCard}>
              <Text style={styles.summaryLabel}>Total Investments</Text>
              <Text style={styles.summaryValue}>{investmentSummary.total_investments}</Text>
            </View>
            <View style={styles.summaryCard}>
              <Text style={styles.summaryLabel}>Total Invested</Text>
              <Text style={styles.summaryValue}>{formatCurrency(investmentSummary.total_invested)}</Text>
            </View>
            <View style={styles.summaryCard}>
              <Text style={styles.summaryLabel}>Active Investments</Text>
              <Text style={styles.summaryValue}>{investmentSummary.active_investments}</Text>
            </View>
            <View style={styles.summaryCard}>
              <Text style={styles.summaryLabel}>Monthly Return</Text>
              <Text style={styles.summaryValue}>{formatCurrency(investmentSummary.total_expected_monthly_return)}</Text>
            </View>
          </View>

          {/* Properties Grid */}
          <View style={styles.propertiesContainer}>
            <Text style={styles.sectionTitle}>Available Properties</Text>
            {properties.map((property, index) => {
              const userInvestment = investments.find(inv => inv.property_id === property.id);
              const investedAmount = userInvestment ? parseFloat(userInvestment.amount) : 0;
              const ownershipPercentage = property.price > 0 ? (investedAmount / property.price) * 100 : 0;

              return (
                <View key={property.id} style={styles.propertyCard}>
                  <View style={styles.propertyImageContainer}>
                    <Image
                      source={{ uri: property.images?.[0] || "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=500" }}
                      style={styles.propertyImage}
                    />
                    {ownershipPercentage > 0 && (
                      <View style={styles.ownershipBadge}>
                        <Text style={styles.ownershipText}>{ownershipPercentage.toFixed(1)}% Owned</Text>
                      </View>
                    )}
                    {property.is_featured && (
                      <View style={styles.featuredBadge}>
                        <Text style={styles.featuredText}>Featured</Text>
                      </View>
                    )}
                  </View>
                  
                  <View style={styles.propertyContent}>
                    <Text style={styles.propertyTitle}>{property.title}</Text>
                    <Text style={styles.propertyLocation}>{property.location}, {property.city}</Text>
                    <Text style={styles.propertyDescription}>{property.short_description}</Text>

                    <View style={styles.propertyDetails}>
                      <Text style={styles.propertyDetail}>
                        💰 Total Price: <Text style={styles.propertyDetailValue}>{formatCurrency(property.price)}</Text>
                      </Text>
                      <Text style={styles.propertyDetail}>
                        📊 Your Investment: <Text style={styles.propertyDetailValue}>{formatCurrency(investedAmount)}</Text>
                      </Text>
                      <Text style={styles.propertyDetail}>
                        📈 Expected ROI: <Text style={styles.propertyDetailValue}>{property.expected_roi}%</Text>
                      </Text>
                      <Text style={styles.propertyDetail}>
                        Min Investment: <Text style={styles.propertyDetailValue}>{formatCurrency(property.minimum_investment)}</Text>
                      </Text>
                    </View>

                    {ownershipPercentage > 0 && (
                      <View style={styles.progressContainer}>
                        <View style={styles.progressBar}>
                          <View
                            style={[styles.progressFill, { width: `${ownershipPercentage}%` }]}
                          />
                        </View>
                      </View>
                    )}

                    <View style={styles.propertyActions}>
                      <TouchableOpacity
                        style={styles.investButton}
                        onPress={() => handlePurchase(property)}
                        disabled={isInvesting}
                      >
                        <Text style={styles.investButtonText}>
                          {isInvesting ? 'Processing...' : investedAmount > 0 ? 'Invest More' : 'Invest Now'}
                        </Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={styles.viewButton}
                        onPress={() => router.push('/properties')}
                      >
                        <Text style={styles.viewButtonText}>View Full</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              );
            })}
          </View>
        </View>
      </ScrollView>

      {/* Investment Modal */}
      {showModal && currentProperty && (
        <InvestmentModal
          property={currentProperty}
          onClose={() => setShowModal(false)}
        />
      )}
    </SafeAreaView>
  );
}

// Investment Modal Component
function InvestmentModal({ property, onClose }) {
  const [amount, setAmount] = useState(property.minimum_investment || 0);
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState('');

  const handleInvestment = async () => {
    setError('');
    
    if (amount < property.minimum_investment) {
      setError(`Minimum investment is ${formatCurrency(property.minimum_investment)}`);
      return;
    }

    if (amount > property.maximum_investment) {
      setError(`Maximum investment is ${formatCurrency(property.maximum_investment)}`);
      return;
    }

    setIsProcessing(true);
    try {
      // Navigate to payment page with property details
      // This would typically involve creating an investment record and navigating to payment
      Alert.alert('Success', 'Investment initiated! Redirecting to payment...', [
        { text: 'OK', onPress: () => {
          onClose();
          // Navigate to payment page with property and amount
        }}
      ]);
    } catch (error) {
      console.error('Investment error:', error);
      setError('Investment failed. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-AE', {
      style: 'currency',
      currency: 'AED',
      minimumFractionDigits: 0
    }).format(amount);
  };

  return (
    <Modal
      visible={true}
      transparent={true}
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Invest in {property.title}</Text>
          
          {error ? (
            <View style={styles.errorContainer}>
              <Text style={styles.errorText}>{error}</Text>
            </View>
          ) : null}
          
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Investment Amount (AED)</Text>
            <TextInput
              style={styles.input}
              value={amount.toString()}
              onChangeText={(text) => setAmount(parseFloat(text) || 0)}
              keyboardType="numeric"
              placeholder="Enter amount"
              placeholderTextColor="#9ca3af"
            />
            <Text style={styles.inputHint}>
              Min: {formatCurrency(property.minimum_investment)} | Max: {formatCurrency(property.maximum_investment)}
            </Text>
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Payment Method</Text>
            <View style={styles.paymentMethodContainer}>
              <TouchableOpacity
                style={[styles.paymentMethodButton, paymentMethod === 'card' && styles.paymentMethodButtonActive]}
                onPress={() => setPaymentMethod('card')}
              >
                <Text style={[styles.paymentMethodText, paymentMethod === 'card' && styles.paymentMethodTextActive]}>
                  Credit/Debit Card
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.paymentMethodButton, paymentMethod === 'upi' && styles.paymentMethodButtonActive]}
                onPress={() => setPaymentMethod('upi')}
              >
                <Text style={[styles.paymentMethodText, paymentMethod === 'upi' && styles.paymentMethodTextActive]}>
                  UPI
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.paymentMethodButton, paymentMethod === 'net_banking' && styles.paymentMethodButtonActive]}
                onPress={() => setPaymentMethod('net_banking')}
              >
                <Text style={[styles.paymentMethodText, paymentMethod === 'net_banking' && styles.paymentMethodTextActive]}>
                  Net Banking
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.modalActions}>
            <TouchableOpacity
              style={styles.cancelButton}
              onPress={onClose}
            >
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.confirmButton}
              onPress={handleInvestment}
              disabled={isProcessing}
            >
              <Text style={styles.confirmButtonText}>
                {isProcessing ? 'Processing...' : 'Invest Now'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0B1D39',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    color: '#D4AF37',
    fontSize: 16,
    marginTop: 16,
  },
  scrollView: {
    flex: 1,
  },
  content: {
    padding: 20,
  },
  headerSection: {
    alignItems: 'center',
    marginBottom: 24,
  },
  mainTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#D4AF37',
    textAlign: 'center',
    marginBottom: 8,
  },
  welcomeSubtitle: {
    fontSize: 16,
    color: '#d1d5db',
    textAlign: 'center',
  },
  summaryContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginBottom: 24,
  },
  summaryCard: {
    backgroundColor: 'rgba(26, 43, 92, 0.8)',
    borderRadius: 12,
    padding: 16,
    width: '48%',
    borderWidth: 1,
    borderColor: 'rgba(212, 175, 55, 0.2)',
  },
  summaryLabel: {
    fontSize: 14,
    color: '#d1d5db',
    marginBottom: 8,
  },
  summaryValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#D4AF37',
  },
  propertiesContainer: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 16,
  },
  propertyCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 16,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: 'rgba(212, 175, 55, 0.4)',
    overflow: 'hidden',
  },
  propertyImageContainer: {
    position: 'relative',
  },
  propertyImage: {
    width: '100%',
    height: 200,
  },
  ownershipBadge: {
    position: 'absolute',
    top: 12,
    right: 12,
    backgroundColor: '#D4AF37',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  ownershipText: {
    color: '#0B1D39',
    fontSize: 12,
    fontWeight: 'bold',
  },
  featuredBadge: {
    position: 'absolute',
    top: 12,
    left: 12,
    backgroundColor: '#ef4444',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  featuredText: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  propertyContent: {
    padding: 16,
  },
  propertyTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 4,
  },
  propertyLocation: {
    fontSize: 14,
    color: '#9ca3af',
    marginBottom: 8,
  },
  propertyDescription: {
    fontSize: 14,
    color: '#d1d5db',
    marginBottom: 16,
    lineHeight: 20,
  },
  propertyDetails: {
    marginBottom: 16,
  },
  propertyDetail: {
    fontSize: 14,
    color: '#d1d5db',
    marginBottom: 4,
  },
  propertyDetailValue: {
    fontWeight: 'bold',
    color: '#D4AF37',
  },
  progressContainer: {
    marginBottom: 16,
  },
  progressBar: {
    height: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#D4AF37',
    borderRadius: 4,
  },
  propertyActions: {
    flexDirection: 'row',
    gap: 12,
  },
  investButton: {
    flex: 1,
    backgroundColor: '#D4AF37',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  investButtonText: {
    color: '#0B1D39',
    fontSize: 14,
    fontWeight: 'bold',
  },
  viewButton: {
    flex: 1,
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: '#D4AF37',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  viewButtonText: {
    color: '#D4AF37',
    fontSize: 14,
    fontWeight: 'bold',
  },
  // Modal Styles
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalContent: {
    backgroundColor: '#1A2B5C',
    borderRadius: 16,
    padding: 24,
    width: '100%',
    maxWidth: 400,
    borderWidth: 1,
    borderColor: 'rgba(212, 175, 55, 0.2)',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#D4AF37',
    textAlign: 'center',
    marginBottom: 20,
  },
  errorContainer: {
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
    textAlign: 'center',
  },
  inputContainer: {
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#d1d5db',
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#13244a',
    borderWidth: 1,
    borderColor: '#6b7280',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    color: '#ffffff',
    fontSize: 16,
  },
  inputHint: {
    fontSize: 12,
    color: '#9ca3af',
    marginTop: 4,
  },
  paymentMethodContainer: {
    flexDirection: 'row',
    gap: 8,
  },
  paymentMethodButton: {
    flex: 1,
    backgroundColor: '#13244a',
    borderWidth: 1,
    borderColor: '#6b7280',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 8,
    alignItems: 'center',
  },
  paymentMethodButtonActive: {
    backgroundColor: '#D4AF37',
    borderColor: '#D4AF37',
  },
  paymentMethodText: {
    color: '#d1d5db',
    fontSize: 12,
    fontWeight: '500',
  },
  paymentMethodTextActive: {
    color: '#0B1D39',
    fontWeight: 'bold',
  },
  modalActions: {
    flexDirection: 'row',
    gap: 12,
  },
  cancelButton: {
    flex: 1,
    backgroundColor: '#6b7280',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  cancelButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
  confirmButton: {
    flex: 1,
    backgroundColor: '#D4AF37',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  confirmButtonText: {
    color: '#0B1D39',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
