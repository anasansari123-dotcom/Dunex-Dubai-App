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
  Linking,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import Header from '../components/Header';

const { width, height } = Dimensions.get('window');

export default function PrivacyScreen() {
  const router = useRouter();

  const handleEmailPress = () => {
    Linking.openURL('mailto:privacy@dunexdubai.com');
  };

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
        {/* Main Content Card */}
        <View style={styles.contentCard}>
          {/* Background Effects for Card */}
          <View style={styles.cardBackgroundEffects}>
            <View style={styles.cardBlur1} />
            <View style={styles.cardBlur2} />
          </View>

          <View style={styles.content}>
            {/* Page Header */}
            <View style={styles.header}>
              <Text style={styles.title}>Privacy Policy</Text>
              <Text style={styles.lastUpdated}>Last updated: January 15, 2025</Text>
            </View>

            {/* Overview Section */}
            <View style={styles.section}>
              <View style={styles.sectionHeader}>
                <Ionicons name="shield-checkmark" size={24} color="#D4AF37" />
                <Text style={styles.sectionTitle}>Overview</Text>
              </View>
              <Text style={styles.sectionText}>
                At DunexDubai, we are committed to protecting your privacy and personal information. 
                This Privacy Policy explains how we collect, use, store, and protect your data when 
                you use our Dubai real estate investment platform. We comply with UAE data protection 
                laws and international best practices.
              </Text>
            </View>

            {/* Information We Collect */}
            <View style={styles.section}>
              <View style={styles.sectionHeader}>
                <Ionicons name="analytics" size={24} color="#D4AF37" />
                <Text style={styles.sectionTitle}>Information We Collect</Text>
              </View>
              
              <View style={styles.subsection}>
                <Text style={styles.subsectionTitle}>Personal Information</Text>
                <View style={styles.infoCard}>
                  <Text style={styles.infoItem}>• Contact Details: Name, email address, phone number</Text>
                  <Text style={styles.infoItem}>• Identity Information: Emirates ID, passport details (for verification)</Text>
                  <Text style={styles.infoItem}>• Address Information: Residential address, billing address</Text>
                  <Text style={styles.infoItem}>• Financial Information: Bank account details, payment methods</Text>
                  <Text style={styles.infoItem}>• Investment Preferences: Property interests, investment goals</Text>
                  <Text style={styles.infoItem}>• Communication Records: Support tickets, email correspondence</Text>
                </View>
              </View>

              <View style={styles.subsection}>
                <Text style={styles.subsectionTitle}>Technical Information</Text>
                <View style={styles.infoCard}>
                  <Text style={styles.infoItem}>• Device Information: IP address, browser type, operating system</Text>
                  <Text style={styles.infoItem}>• Usage Data: Pages visited, time spent, click patterns</Text>
                  <Text style={styles.infoItem}>• Cookies & Tracking: Session cookies, analytics data</Text>
                  <Text style={styles.infoItem}>• Location Data: General location (city/country level)</Text>
                  <Text style={styles.infoItem}>• Security Logs: Login attempts, security events</Text>
                </View>
              </View>
            </View>

            {/* How We Use Your Information */}
            <View style={styles.section}>
              <View style={styles.sectionHeader}>
                <Ionicons name="target" size={24} color="#D4AF37" />
                <Text style={styles.sectionTitle}>How We Use Your Information</Text>
              </View>
              
              <View style={styles.useCasesContainer}>
                <View style={styles.useCaseCard}>
                  <Text style={styles.useCaseTitle}>Service Delivery</Text>
                  <Text style={styles.useCaseItem}>• Process property investments</Text>
                  <Text style={styles.useCaseItem}>• Manage user accounts</Text>
                  <Text style={styles.useCaseItem}>• Process payments via Razorpay</Text>
                  <Text style={styles.useCaseItem}>• Provide customer support</Text>
                  <Text style={styles.useCaseItem}>• Send investment updates</Text>
                  <Text style={styles.useCaseItem}>• Generate investment reports</Text>
                </View>

                <View style={styles.useCaseCard}>
                  <Text style={styles.useCaseTitle}>Legal & Compliance</Text>
                  <Text style={styles.useCaseItem}>• Verify user identity (KYC)</Text>
                  <Text style={styles.useCaseItem}>• Comply with UAE regulations</Text>
                  <Text style={styles.useCaseItem}>• Prevent fraud and money laundering</Text>
                  <Text style={styles.useCaseItem}>• Maintain audit trails</Text>
                  <Text style={styles.useCaseItem}>• Respond to legal requests</Text>
                  <Text style={styles.useCaseItem}>• Enforce terms of service</Text>
                </View>
              </View>
            </View>

            {/* Data Storage & Security */}
            <View style={styles.section}>
              <View style={styles.sectionHeader}>
                <Ionicons name="lock-closed" size={24} color="#D4AF37" />
                <Text style={styles.sectionTitle}>Data Storage & Security</Text>
              </View>
              
              <View style={styles.subsection}>
                <Text style={styles.subsectionTitle}>Security Measures</Text>
                <View style={styles.infoCard}>
                  <Text style={styles.infoItem}>• Encryption: All data encrypted in transit and at rest</Text>
                  <Text style={styles.infoItem}>• Secure Servers: AWS/Azure cloud infrastructure</Text>
                  <Text style={styles.infoItem}>• Access Controls: Role-based access with 2FA</Text>
                  <Text style={styles.infoItem}>• Regular Audits: Security assessments and penetration testing</Text>
                  <Text style={styles.infoItem}>• Data Backup: Automated backups with disaster recovery</Text>
                  <Text style={styles.infoItem}>• Monitoring: 24/7 security monitoring and alerting</Text>
                </View>
              </View>

              <View style={styles.subsection}>
                <Text style={styles.subsectionTitle}>Data Retention</Text>
                <View style={styles.infoCard}>
                  <Text style={styles.infoItem}>• Active Accounts: Data retained while account is active</Text>
                  <Text style={styles.infoItem}>• Investment Records: 7 years (UAE legal requirement)</Text>
                  <Text style={styles.infoItem}>• Financial Data: 10 years (audit requirements)</Text>
                  <Text style={styles.infoItem}>• Marketing Data: Until consent is withdrawn</Text>
                  <Text style={styles.infoItem}>• Deleted Accounts: 30 days grace period</Text>
                </View>
              </View>
            </View>

            {/* Third-Party Services */}
            <View style={styles.section}>
              <View style={styles.sectionHeader}>
                <Ionicons name="people" size={24} color="#D4AF37" />
                <Text style={styles.sectionTitle}>Third-Party Services</Text>
              </View>
              
              <View style={styles.subsection}>
                <Text style={styles.subsectionTitle}>Service Providers</Text>
                <View style={styles.infoCard}>
                  <Text style={styles.infoItem}>• Supabase: User authentication and database services</Text>
                  <Text style={styles.infoItem}>• Razorpay: Payment processing and gateway services</Text>
                  <Text style={styles.infoItem}>• Google Analytics: Website analytics and user behavior tracking</Text>
                  <Text style={styles.infoItem}>• Email Services: Transactional and marketing email delivery</Text>
                  <Text style={styles.infoItem}>• Cloud Storage: Document and image storage</Text>
                  <Text style={styles.infoItem}>• Customer Support: Help desk and ticketing system</Text>
                </View>
                <Text style={styles.sectionText}>
                  All third-party services are carefully vetted and bound by strict data protection 
                  agreements. We ensure they comply with UAE data protection laws and our privacy standards.
                </Text>
              </View>
            </View>

            {/* Cookies & Tracking */}
            <View style={styles.section}>
              <View style={styles.sectionHeader}>
                <Ionicons name="cookie" size={24} color="#D4AF37" />
                <Text style={styles.sectionTitle}>Cookies & Tracking</Text>
              </View>
              
              <View style={styles.cookieContainer}>
                <View style={styles.cookieCard}>
                  <Text style={styles.cookieTitle}>Essential Cookies</Text>
                  <Text style={styles.cookieItem}>• Session management</Text>
                  <Text style={styles.cookieItem}>• User authentication</Text>
                  <Text style={styles.cookieItem}>• Security features</Text>
                  <Text style={styles.cookieItem}>• Shopping cart functionality</Text>
                </View>

                <View style={styles.cookieCard}>
                  <Text style={styles.cookieTitle}>Analytics Cookies</Text>
                  <Text style={styles.cookieItem}>• Website performance</Text>
                  <Text style={styles.cookieItem}>• User behavior analysis</Text>
                  <Text style={styles.cookieItem}>• Feature usage statistics</Text>
                  <Text style={styles.cookieItem}>• Error tracking and debugging</Text>
                </View>
              </View>
              
              <Text style={styles.sectionText}>
                You can control cookie preferences through your browser settings. However, 
                disabling essential cookies may affect website functionality.
              </Text>
            </View>

            {/* Your Rights */}
            <View style={styles.section}>
              <View style={styles.sectionHeader}>
                <Ionicons name="person" size={24} color="#D4AF37" />
                <Text style={styles.sectionTitle}>Your Rights</Text>
              </View>
              
              <View style={styles.rightsCard}>
                <Text style={styles.rightsItem}>• Access: Request copies of your personal data</Text>
                <Text style={styles.rightsItem}>• Correction: Update or correct inaccurate information</Text>
                <Text style={styles.rightsItem}>• Deletion: Request deletion of your personal data</Text>
                <Text style={styles.rightsItem}>• Portability: Export your data in a machine-readable format</Text>
                <Text style={styles.rightsItem}>• Restriction: Limit how we process your data</Text>
                <Text style={styles.rightsItem}>• Objection: Object to certain types of data processing</Text>
                <Text style={styles.rightsItem}>• Withdrawal: Withdraw consent for marketing communications</Text>
              </View>
            </View>

            {/* International Data Transfers */}
            <View style={styles.section}>
              <View style={styles.sectionHeader}>
                <Ionicons name="globe" size={24} color="#D4AF37" />
                <Text style={styles.sectionTitle}>International Data Transfers</Text>
              </View>
              
              <Text style={styles.sectionText}>
                Some of our service providers may be located outside the UAE. When we transfer 
                your data internationally, we ensure adequate protection through:
              </Text>
              
              <View style={styles.infoCard}>
                <Text style={styles.infoItem}>• Standard contractual clauses approved by UAE authorities</Text>
                <Text style={styles.infoItem}>• Adequacy decisions for countries with equivalent data protection</Text>
                <Text style={styles.infoItem}>• Binding corporate rules for multinational service providers</Text>
                <Text style={styles.infoItem}>• Explicit consent for specific transfers</Text>
              </View>
            </View>

            {/* Children's Privacy */}
            <View style={styles.section}>
              <View style={styles.sectionHeader}>
                <Ionicons name="child" size={24} color="#D4AF37" />
                <Text style={styles.sectionTitle}>Children's Privacy</Text>
              </View>
              
              <View style={styles.childrenCard}>
                <Text style={styles.childrenText}>
                  Our services are not intended for individuals under 18 years of age. We do not 
                  knowingly collect personal information from children. If we become aware that we 
                  have collected data from a child, we will take steps to delete such information 
                  immediately.
                </Text>
              </View>
            </View>

            {/* Contact Information */}
            <View style={styles.section}>
              <View style={styles.sectionHeader}>
                <Ionicons name="call" size={24} color="#D4AF37" />
                <Text style={styles.sectionTitle}>Contact Information</Text>
              </View>
              
              <View style={styles.contactCard}>
                <Text style={styles.contactTitle}>Data Protection Officer</Text>
                <Text style={styles.contactItem}>Email: privacy@dunexdubai.com</Text>
                <Text style={styles.contactItem}>Phone: +971 4 XXX XXXX</Text>
                <Text style={styles.contactItem}>Address: Business Bay, Dubai, UAE</Text>
                <Text style={styles.contactItem}>Response Time: Within 30 days of request</Text>
              </View>
            </View>

            {/* Policy Updates */}
            <View style={styles.section}>
              <View style={styles.sectionHeader}>
                <Ionicons name="calendar" size={24} color="#D4AF37" />
                <Text style={styles.sectionTitle}>Policy Updates</Text>
              </View>
              
              <Text style={styles.sectionText}>
                This Privacy Policy was last updated on January 15, 2025. We may update this policy 
                from time to time to reflect changes in our practices or legal requirements. We will 
                notify you of any material changes via email or through our website.
              </Text>
            </View>

            {/* Footer */}
            <View style={styles.footer}>
              <Text style={styles.footerText}>
                For privacy-related questions or requests, contact us at
              </Text>
              <TouchableOpacity onPress={handleEmailPress}>
                <Text style={styles.footerEmail}>privacy@dunexdubai.com</Text>
              </TouchableOpacity>
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
              onPress={() => router.push('/terms')}
            >
              <Text style={styles.linkButtonText}>Terms & Conditions</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={styles.linkButton}
              onPress={() => router.push('/faq')}
            >
              <Text style={styles.linkButtonText}>FAQ</Text>
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
  contentCard: {
    margin: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(212, 175, 55, 0.2)',
    overflow: 'hidden',
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
  header: {
    alignItems: 'center',
    marginBottom: 32,
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
  section: {
    marginBottom: 32,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#D4AF37',
    marginLeft: 12,
  },
  sectionText: {
    fontSize: 16,
    color: '#d1d5db',
    lineHeight: 24,
  },
  subsection: {
    marginBottom: 20,
  },
  subsectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#D4AF37',
    marginBottom: 12,
  },
  infoCard: {
    backgroundColor: 'rgba(26, 43, 92, 0.5)',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(212, 175, 55, 0.2)',
  },
  infoItem: {
    fontSize: 15,
    color: '#d1d5db',
    lineHeight: 22,
    marginBottom: 8,
  },
  useCasesContainer: {
    flexDirection: 'row',
    gap: 16,
  },
  useCaseCard: {
    flex: 1,
    backgroundColor: 'rgba(26, 43, 92, 0.5)',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(212, 175, 55, 0.2)',
  },
  useCaseTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#D4AF37',
    marginBottom: 12,
  },
  useCaseItem: {
    fontSize: 14,
    color: '#d1d5db',
    lineHeight: 20,
    marginBottom: 6,
  },
  cookieContainer: {
    flexDirection: 'row',
    gap: 16,
    marginBottom: 16,
  },
  cookieCard: {
    flex: 1,
    backgroundColor: 'rgba(26, 43, 92, 0.5)',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(212, 175, 55, 0.2)',
  },
  cookieTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#D4AF37',
    marginBottom: 12,
  },
  cookieItem: {
    fontSize: 14,
    color: '#d1d5db',
    lineHeight: 20,
    marginBottom: 6,
  },
  rightsCard: {
    backgroundColor: 'rgba(26, 43, 92, 0.5)',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(212, 175, 55, 0.2)',
  },
  rightsItem: {
    fontSize: 15,
    color: '#d1d5db',
    lineHeight: 22,
    marginBottom: 8,
  },
  childrenCard: {
    backgroundColor: 'rgba(239, 68, 68, 0.1)',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(239, 68, 68, 0.3)',
  },
  childrenText: {
    fontSize: 15,
    color: '#d1d5db',
    lineHeight: 22,
  },
  contactCard: {
    backgroundColor: 'rgba(26, 43, 92, 0.5)',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(212, 175, 55, 0.2)',
  },
  contactTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#D4AF37',
    marginBottom: 12,
  },
  contactItem: {
    fontSize: 15,
    color: '#d1d5db',
    lineHeight: 22,
    marginBottom: 6,
  },
  footer: {
    alignItems: 'center',
    paddingTop: 24,
    borderTopWidth: 1,
    borderTopColor: 'rgba(212, 175, 55, 0.2)',
    marginTop: 24,
  },
  footerText: {
    fontSize: 14,
    color: '#9ca3af',
    textAlign: 'center',
    marginBottom: 8,
  },
  footerEmail: {
    fontSize: 14,
    color: '#D4AF37',
    textDecorationLine: 'underline',
  },
  navigationSection: {
    alignItems: 'center',
    paddingHorizontal: 20,
    marginTop: 20,
  },
  backToHomeButton: {
    backgroundColor: '#D4AF37',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
    marginBottom: 16,
  },
  backToHomeText: {
    color: '#071538',
    fontSize: 16,
    fontWeight: '600',
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