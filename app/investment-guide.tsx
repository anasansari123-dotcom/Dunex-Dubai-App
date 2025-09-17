import React, { useState } from 'react';
import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  StatusBar,
  SafeAreaView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import Header from '../components/Header';

const { width, height } = Dimensions.get('window');

export default function InvestmentGuideScreen() {
  const router = useRouter();
  const [expandedSection, setExpandedSection] = useState<number | null>(null);

  const guideSections = [
    {
      id: 1,
      title: 'Why Invest in Dubai Real Estate?',
      icon: 'trending-up',
      content: 'Dubai offers one of the world\'s most profitable real estate markets with:\n\n• 10-15% monthly ROI potential\n• Tax-free investment environment\n• Strong property appreciation\n• RERA-regulated market\n• Global business hub status\n• 200+ nationalities investing',
    },
    {
      id: 2,
      title: 'Investment Process',
      icon: 'list',
      content: 'Our streamlined investment process:\n\n1. Browse verified properties\n2. Select investment amount (min ₹1,00,000)\n3. Complete legal documentation\n4. Receive Investment ID\n5. Start earning monthly ROI\n6. Track profits in real-time',
    },
    {
      id: 3,
      title: 'Legal Framework & Compliance',
      icon: 'shield-checkmark',
      content: 'All investments are fully compliant:\n\n• Dubai Land Department (DLD) approved\n• RERA registered projects\n• Legal contracts and agreements\n• Developer verification\n• Investor protection laws\n• Transparent documentation',
    },
    {
      id: 4,
      title: 'ROI & Returns',
      icon: 'cash',
      content: 'Consistent monthly returns:\n\n• 10-15% monthly ROI\n• Credited directly to your bank account\n• Real-time profit tracking\n• Historical performance data\n• Transparent reporting\n• No hidden fees',
    },
    {
      id: 5,
      title: 'Risk Management',
      icon: 'lock-closed',
      content: 'Your investment is protected by:\n\n• Verified developers only\n• Legal agreements\n• Insurance coverage\n• Diversified portfolio options\n• Professional management\n• 24/7 support',
    },
    {
      id: 6,
      title: 'Getting Started',
      icon: 'rocket',
      content: 'Ready to invest? Follow these steps:\n\n1. Create your account\n2. Complete KYC verification\n3. Browse available properties\n4. Choose your investment amount\n5. Complete legal formalities\n6. Start earning monthly ROI',
    },
  ];

  const toggleSection = (id: number) => {
    setExpandedSection(expandedSection === id ? null : id);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#0c1b3a" />
      <Header />
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          {/* Header Section */}
          <View style={styles.headerSection}>
            <Text style={styles.headerTitle}>Dubai Property Investment Guide</Text>
            <Text style={styles.headerSubtitle}>
              Everything you need to know about investing in Dubai real estate
            </Text>
          </View>

          {/* Guide Sections */}
          <View style={styles.guideContainer}>
            {guideSections.map((section) => (
              <View key={section.id} style={styles.sectionCard}>
                <TouchableOpacity
                  style={styles.sectionHeader}
                  onPress={() => toggleSection(section.id)}
                >
                  <View style={styles.sectionTitleContainer}>
                    <View style={styles.sectionIcon}>
                      <Ionicons name={section.icon as any} size={24} color="#D4AF37" />
                    </View>
                    <Text style={styles.sectionTitle}>{section.title}</Text>
                  </View>
                  <Ionicons
                    name={expandedSection === section.id ? 'chevron-up' : 'chevron-down'}
                    size={20}
                    color="#D4AF37"
                  />
                </TouchableOpacity>
                {expandedSection === section.id && (
                  <View style={styles.sectionContent}>
                    <Text style={styles.sectionText}>{section.content}</Text>
                  </View>
                )}
              </View>
            ))}
          </View>

          {/* CTA Section */}
          <View style={styles.ctaSection}>
            <Text style={styles.ctaTitle}>Ready to Start Your Investment Journey?</Text>
            <Text style={styles.ctaSubtitle}>
              Join thousands of successful investors earning consistent monthly returns
            </Text>
            <View style={styles.ctaButtons}>
              <TouchableOpacity 
                style={styles.primaryCtaButton}
                onPress={() => router.push('/properties')}
              >
                <Text style={styles.primaryCtaButtonText}>Browse Properties</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={styles.secondaryCtaButton}
                onPress={() => router.push('/contact')}
              >
                <Text style={styles.secondaryCtaButtonText}>Get Expert Advice</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* FAQ Section */}
          <View style={styles.faqSection}>
            <Text style={styles.faqTitle}>Frequently Asked Questions</Text>
            <View style={styles.faqContainer}>
              <View style={styles.faqItem}>
                <Text style={styles.faqQuestion}>What is the minimum investment amount?</Text>
                <Text style={styles.faqAnswer}>You can start with just ₹1,00,000 and scale up as you gain confidence.</Text>
              </View>
              <View style={styles.faqItem}>
                <Text style={styles.faqQuestion}>How often do I receive ROI?</Text>
                <Text style={styles.faqAnswer}>ROI is credited monthly directly to your bank account in INR.</Text>
              </View>
              <View style={styles.faqItem}>
                <Text style={styles.faqQuestion}>Are the properties verified?</Text>
                <Text style={styles.faqAnswer}>Yes, all properties are RERA and DLD approved with complete legal documentation.</Text>
              </View>
              <View style={styles.faqItem}>
                <Text style={styles.faqQuestion}>Can I track my investments?</Text>
                <Text style={styles.faqAnswer}>Absolutely! You'll get a unique Investment ID and dashboard access for real-time tracking.</Text>
              </View>
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
  content: {
    padding: 20,
  },
  headerSection: {
    marginBottom: 32,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 8,
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#d1d5db',
    lineHeight: 24,
  },
  guideContainer: {
    marginBottom: 32,
  },
  sectionCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    overflow: 'hidden',
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
  },
  sectionTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  sectionIcon: {
    width: 40,
    height: 40,
    backgroundColor: 'rgba(212, 175, 55, 0.1)',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ffffff',
    flex: 1,
  },
  sectionContent: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  sectionText: {
    fontSize: 14,
    color: '#d1d5db',
    lineHeight: 22,
  },
  ctaSection: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
    marginBottom: 32,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  ctaTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 8,
    textAlign: 'center',
  },
  ctaSubtitle: {
    fontSize: 16,
    color: '#d1d5db',
    textAlign: 'center',
    marginBottom: 20,
    lineHeight: 24,
  },
  ctaButtons: {
    flexDirection: 'row',
    gap: 12,
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  primaryCtaButton: {
    backgroundColor: '#D4AF37',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 25,
  },
  primaryCtaButtonText: {
    color: '#0c1b3a',
    fontSize: 16,
    fontWeight: 'bold',
  },
  secondaryCtaButton: {
    borderWidth: 2,
    borderColor: '#D4AF37',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 25,
  },
  secondaryCtaButtonText: {
    color: '#D4AF37',
    fontSize: 16,
    fontWeight: 'bold',
  },
  faqSection: {
    marginBottom: 32,
  },
  faqTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 16,
  },
  faqContainer: {
    gap: 12,
  },
  faqItem: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 8,
    padding: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  faqQuestion: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 8,
  },
  faqAnswer: {
    fontSize: 14,
    color: '#d1d5db',
    lineHeight: 20,
  },
});
