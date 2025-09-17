import React from 'react';
import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  StatusBar,
  SafeAreaView,
} from 'react-native';
import { useRouter } from 'expo-router';
import Header from '../components/Header';

export default function ShippingScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#0c1b3a" />
      <Header />
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          <Text style={styles.title}>Shipping & Delivery</Text>
          <Text style={styles.lastUpdated}>Last updated: December 2024</Text>
          
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Digital Delivery</Text>
            <Text style={styles.sectionText}>
              As a digital real estate investment platform, all our services are delivered electronically. 
              You will receive investment documents, contracts, and updates via email and through your 
              secure dashboard.
            </Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Document Delivery</Text>
            <Text style={styles.sectionText}>
              Investment documents, legal contracts, and certificates are delivered digitally within 
              24-48 hours of investment completion. Physical copies can be requested for an additional fee.
            </Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>ROI Payments</Text>
            <Text style={styles.sectionText}>
              Monthly ROI payments are credited directly to your registered bank account in INR. 
              Payments are processed on the same date each month and typically reflect within 1-2 
              business days.
            </Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Communication Delivery</Text>
            <Text style={styles.sectionText}>
              All important updates, notifications, and reports are delivered via:
              {'\n\n'}• Email notifications
              {'\n'}• SMS alerts (if opted in)
              {'\n'}• Dashboard notifications
              {'\n'}• WhatsApp updates (if opted in)
            </Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Delivery Timeline</Text>
            <Text style={styles.sectionText}>
              • Investment confirmation: Immediate
              {'\n'}• Legal documents: 24-48 hours
              {'\n'}• Investment ID: Immediate
              {'\n'}• Monthly ROI: Same date each month
              {'\n'}• Annual reports: Within 30 days of year-end
            </Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Contact Support</Text>
            <Text style={styles.sectionText}>
              For delivery-related inquiries:
              {'\n\n'}Email: support@dunexdubai.com
              {'\n'}Phone: +971 4 XXXXXXX
              {'\n'}WhatsApp: +971 50 XXXXXXX
            </Text>
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
  content: {
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 8,
  },
  lastUpdated: {
    fontSize: 14,
    color: '#9ca3af',
    marginBottom: 32,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#D4AF37',
    marginBottom: 12,
  },
  sectionText: {
    fontSize: 16,
    color: '#d1d5db',
    lineHeight: 24,
  },
});
