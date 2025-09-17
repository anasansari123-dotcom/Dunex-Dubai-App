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

export default function CancellationScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#0c1b3a" />
      <Header />
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          <Text style={styles.title}>Cancellation Policy</Text>
          <Text style={styles.lastUpdated}>Last updated: December 2024</Text>
          
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Investment Cancellation</Text>
            <Text style={styles.sectionText}>
              Real estate investments are legally binding commitments. Once an investment is made and 
              legal documentation is completed, cancellation may not be possible due to the nature of 
              real estate transactions and legal obligations.
            </Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Cooling-off Period</Text>
            <Text style={styles.sectionText}>
              We provide a 24-hour cooling-off period from the time of investment commitment. During 
              this period, you may cancel your investment without penalty by contacting our support team.
            </Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Refund Policy</Text>
            <Text style={styles.sectionText}>
              Refunds are only available during the cooling-off period. After this period, refunds 
              are subject to legal and administrative fees, and may not be possible due to legal 
              commitments with developers.
            </Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Force Majeure</Text>
            <Text style={styles.sectionText}>
              In case of force majeure events (natural disasters, government actions, etc.), we will 
              work with all parties to find appropriate solutions while protecting investor interests.
            </Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Contact for Cancellation</Text>
            <Text style={styles.sectionText}>
              To request a cancellation, please contact us immediately:
              {'\n\n'}Email: support@dunexdubai.com
              {'\n'}Phone: +971 4 XXXXXXX
              {'\n'}WhatsApp: +971 50 XXXXXXX
              {'\n\n'}Please have your Investment ID ready when contacting us.
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
