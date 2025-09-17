import React from 'react';
import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  StatusBar,
  SafeAreaView,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import Header from '../components/Header';

const { width, height } = Dimensions.get('window');

export default function TermsScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#0c1b3a" />
      <Header />
      
      {/* Background Effects */}
      <View style={styles.backgroundEffects}>
        <View style={[styles.backgroundBlur, styles.blur1]} />
        <View style={[styles.backgroundBlur, styles.blur2]} />
        <View style={[styles.backgroundBlur, styles.blur3]} />
      </View>

      <ScrollView 
        style={styles.scrollView} 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Page Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Terms & Conditions</Text>
          <Text style={styles.lastUpdated}>Last updated: January 27, 2025</Text>
        </View>

        {/* Terms Content */}
        <View style={styles.contentCard}>
          {/* Background Effects for Card */}
          <View style={styles.cardBackgroundEffects}>
            <View style={styles.cardBlur1} />
            <View style={styles.cardBlur2} />
          </View>

          <View style={styles.content}>
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>1. General Information</Text>
              <Text style={styles.sectionText}>
                DUNEX provides investment opportunities in Dubai real estate for Indian investors. 
                By accessing or using our services, you agree to these Terms and Conditions.
              </Text>
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>2. Investment Disclaimer</Text>
              <Text style={styles.sectionText}>
                All investments carry risks. DUNEX provides access to verified projects but does not
                guarantee returns. Any projected ROI, including 10–15% monthly, is indicative and may vary.
              </Text>
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>3. Account Registration</Text>
              <Text style={styles.sectionText}>
                Users must provide accurate and complete details. You are responsible for
                maintaining your account security and confidentiality.
              </Text>
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>4. User Obligations</Text>
              <View style={styles.listContainer}>
                <Text style={styles.listItem}>• Provide true and accurate information</Text>
                <Text style={styles.listItem}>• Use the platform only for lawful purposes</Text>
                <Text style={styles.listItem}>• Do not attempt to hack, disrupt, or misuse services</Text>
              </View>
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>5. Fees & Charges</Text>
              <Text style={styles.sectionText}>
                Any platform fees or charges will be communicated before you invest. DUNEX reserves
                the right to update fees with prior notice.
              </Text>
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>6. Intellectual Property</Text>
              <Text style={styles.sectionText}>
                All content on DUNEX's platform including text, graphics, and branding is the property 
                of DUNEX. Reproduction without written consent is prohibited.
              </Text>
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>7. Limitation of Liability</Text>
              <Text style={styles.sectionText}>
                DUNEX is not liable for direct or indirect losses arising from investments. Users
                acknowledge that real estate involves market and legal risks.
              </Text>
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>8. Privacy</Text>
              <Text style={styles.sectionText}>
                Your personal and financial data is processed in line with our Privacy Policy. By
                using DUNEX, you consent to data usage for investment services.
              </Text>
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>9. Termination</Text>
              <Text style={styles.sectionText}>
                DUNEX may suspend or terminate accounts in case of violations. Users may close their
                accounts by following the platform's termination process.
              </Text>
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>10. Governing Law</Text>
              <Text style={styles.sectionText}>
                These Terms are governed by the laws of India. Disputes will fall under the
                jurisdiction of Indian courts.
              </Text>
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>11. Amendments</Text>
              <Text style={styles.sectionText}>
                DUNEX reserves the right to update these Terms. Continued use of the platform
                constitutes acceptance of any changes.
              </Text>
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>12. Contact Information</Text>
              <View style={styles.contactCard}>
                <Text style={styles.contactText}>Email: dunexdubai@gmail.com</Text>
                <Text style={styles.contactText}>Address: Dubai, United Arab Emirates</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Navigation Links */}
        <View style={styles.navigationSection}>
          <TouchableOpacity 
            style={styles.backToHomeButton}
            onPress={() => router.push('/')}
          >
            <Text style={styles.backToHomeText}>Back to Home</Text>
          </TouchableOpacity>
          
          <View style={styles.linkButtons}>
            <TouchableOpacity 
              style={styles.linkButton}
              onPress={() => router.push('/contact')}
            >
              <Text style={styles.linkButtonText}>View FAQ</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={styles.linkButton}
              onPress={() => router.push('/privacy')}
            >
              <Text style={styles.linkButtonText}>Privacy Policy</Text>
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
  backgroundEffects: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 1,
  },
  backgroundBlur: {
    position: 'absolute',
    backgroundColor: 'rgba(212, 175, 55, 0.1)',
    borderRadius: 200,
  },
  blur1: {
    width: 300,
    height: 300,
    top: 80,
    left: 80,
  },
  blur2: {
    width: 300,
    height: 300,
    bottom: 80,
    right: 80,
  },
  blur3: {
    width: 200,
    height: 200,
    top: '50%',
    left: '50%',
    marginTop: -100,
    marginLeft: -100,
  },
  scrollView: {
    flex: 1,
    zIndex: 10,
  },
  scrollContent: {
    paddingBottom: 40,
  },
  header: {
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 32,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#D4AF37',
    marginBottom: 8,
    textAlign: 'center',
  },
  lastUpdated: {
    fontSize: 16,
    color: '#d1d5db',
    textAlign: 'center',
  },
  contentCard: {
    marginHorizontal: 20,
    marginBottom: 32,
    borderRadius: 24,
    overflow: 'hidden',
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    position: 'relative',
  },
  cardBackgroundEffects: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 1,
  },
  cardBlur1: {
    position: 'absolute',
    width: 120,
    height: 120,
    backgroundColor: 'rgba(212, 175, 55, 0.1)',
    borderRadius: 60,
    top: -40,
    right: -40,
  },
  cardBlur2: {
    position: 'absolute',
    width: 120,
    height: 120,
    backgroundColor: 'rgba(212, 175, 55, 0.1)',
    borderRadius: 60,
    bottom: -40,
    left: -40,
  },
  content: {
    padding: 24,
    zIndex: 10,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#D4AF37',
    marginBottom: 12,
  },
  sectionText: {
    fontSize: 16,
    color: '#d1d5db',
    lineHeight: 24,
  },
  listContainer: {
    marginTop: 8,
  },
  listItem: {
    fontSize: 16,
    color: '#d1d5db',
    lineHeight: 24,
    marginBottom: 8,
  },
  contactCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    marginTop: 8,
  },
  contactText: {
    fontSize: 16,
    color: '#d1d5db',
    lineHeight: 24,
    marginBottom: 4,
  },
  navigationSection: {
    alignItems: 'center',
    paddingHorizontal: 20,
    marginTop: 20,
  },
  backToHomeButton: {
    backgroundColor: '#D4AF37',
    paddingHorizontal: 32,
    paddingVertical: 16,
    borderRadius: 12,
    marginBottom: 20,
    shadowColor: '#D4AF37',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  backToHomeText: {
    color: '#071538',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  linkButtons: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 24,
  },
  linkButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  linkButtonText: {
    color: '#D4AF37',
    fontSize: 16,
    fontWeight: '500',
  },
});
