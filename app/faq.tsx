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
  Linking,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import Header from '../components/Header';

const { width, height } = Dimensions.get('window');

export default function FAQScreen() {
  const router = useRouter();
  const [openItems, setOpenItems] = useState(new Set());

  const toggleItem = (index: number) => {
    const newOpenItems = new Set(openItems);
    if (newOpenItems.has(index)) {
      newOpenItems.delete(index);
    } else {
      newOpenItems.add(index);
    }
    setOpenItems(newOpenItems);
  };

  const faqData = [
    {
      question: "How do I search for properties in Dubai?",
      answer: "You can search for properties using our advanced search filters. Simply visit our property search page, select your preferred location, property type, price range, and other criteria. You can also use our interactive map to explore different areas and view available properties."
    },
    {
      question: "What documents do I need to buy property in Dubai?",
      answer: "For UAE residents, you'll need your Emirates ID, passport copy, and proof of income. For international buyers, you'll need your passport, proof of funds, and a No Objection Certificate (NOC) from your current bank. We recommend consulting with our legal team for specific requirements."
    },
    {
      question: "Are there any restrictions for foreigners buying property in Dubai?",
      answer: "Foreigners can buy property in designated freehold areas in Dubai. There are no restrictions on nationality, and you can own 100% of the property. Popular freehold areas include Dubai Marina, Palm Jumeirah, Downtown Dubai, and Dubai Hills Estate."
    },
    {
      question: "What are the typical closing costs when buying property in Dubai?",
      answer: "Closing costs typically include 4% Dubai Land Department fee, 2% agent commission, and various administrative fees. The total usually ranges from 6-8% of the property value. We provide a detailed breakdown of all costs during the transaction process."
    },
    {
      question: "How do I know if a property is a good investment?",
      answer: "Consider factors like location, rental yield potential, market trends, and future development plans. Our market analysis tools provide insights into property appreciation rates, rental demand, and area development. We also offer investment consultation services."
    },
    {
      question: "Can I get a mortgage as a foreigner in Dubai?",
      answer: "Yes, many banks in Dubai offer mortgages to foreigners. You can typically borrow up to 75% of the property value with a minimum down payment of 25%. Requirements include proof of income, employment verification, and a good credit history."
    },
    {
      question: "What is the rental market like in Dubai?",
      answer: "Dubai has a dynamic rental market with competitive rates. Rental yields typically range from 5-8% annually. Popular areas for rentals include Dubai Marina, Downtown Dubai, and Business Bay. We provide rental market analysis and tenant screening services."
    },
    {
      question: "How do I list my property for sale or rent?",
      answer: "To list your property, contact our team or use our online listing form. We'll schedule a property visit, take professional photos, create a detailed listing, and market it across our network. We handle everything from valuation to closing."
    },
    {
      question: "What are the best areas for families in Dubai?",
      answer: "Family-friendly areas include Dubai Hills Estate, Arabian Ranches, Emirates Hills, and Mirdif. These areas offer good schools, parks, shopping centers, and community facilities. We can help you find the perfect family home based on your specific needs."
    },
    {
      question: "How do I schedule a property viewing?",
      answer: "You can schedule viewings through our website, by calling our office, or contacting your assigned agent. We offer flexible viewing times including evenings and weekends. Virtual tours are also available for international buyers."
    },
    {
      question: "What is the process for selling my property?",
      answer: "Our selling process includes property valuation, professional photography, marketing strategy, buyer screening, negotiation support, and transaction management. We handle all legal requirements and ensure a smooth closing process."
    },
    {
      question: "Do you offer property management services?",
      answer: "Yes, we offer comprehensive property management services including tenant management, rent collection, property maintenance, and financial reporting. This is ideal for investors who don't want to manage their properties directly."
    }
  ];

  const handleEmailPress = () => {
    Linking.openURL('mailto:dunexdubai@gmail.com');
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
        {/* Page Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Dubai High Return Property Investment FAQ</Text>
          <Text style={styles.subtitle}>
            Find answers to common questions about Dubai real estate investment opportunities and high ROI properties
          </Text>
        </View>

        {/* FAQ Content */}
        <View style={styles.faqContainer}>
          {faqData.map((item, index) => (
            <View key={index} style={styles.faqItem}>
              <TouchableOpacity
                style={styles.faqQuestion}
                onPress={() => toggleItem(index)}
                activeOpacity={0.7}
              >
                <Text style={styles.questionText}>{item.question}</Text>
                <View style={styles.chevronContainer}>
                  <Ionicons
                    name={openItems.has(index) ? 'chevron-up' : 'chevron-down'}
                    size={20}
                    color="#D4AF37"
                  />
                </View>
              </TouchableOpacity>
              
              {openItems.has(index) && (
                <View style={styles.faqAnswer}>
                  <View style={styles.answerDivider} />
                  <Text style={styles.answerText}>{item.answer}</Text>
                </View>
              )}
            </View>
          ))}
        </View>

        {/* Contact Section */}
        <View style={styles.contactSection}>
          <View style={styles.contactCard}>
            {/* Background Effects for Contact Card */}
            <View style={styles.contactBackgroundEffects}>
              <View style={styles.contactBlur1} />
              <View style={styles.contactBlur2} />
            </View>
            
            <View style={styles.contactContent}>
              <Text style={styles.contactTitle}>Still Have Questions About Dubai Property Investment?</Text>
              <Text style={styles.contactDescription}>
                Can't find the answer you're looking for? Our Dubai real estate investment experts are here to help you with any questions about high ROI properties.
              </Text>
              
              <TouchableOpacity 
                style={styles.emailButton}
                onPress={handleEmailPress}
                activeOpacity={0.8}
              >
                <Ionicons name="mail" size={24} color="#071538" />
                <Text style={styles.emailButtonText}>Email Us</Text>
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
    fontSize: 28,
    fontWeight: 'bold',
    color: '#D4AF37',
    marginBottom: 12,
    textAlign: 'center',
    lineHeight: 36,
  },
  subtitle: {
    fontSize: 16,
    color: '#d1d5db',
    textAlign: 'center',
    lineHeight: 24,
  },
  faqContainer: {
    paddingHorizontal: 20,
    gap: 16,
  },
  faqItem: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    overflow: 'hidden',
  },
  faqQuestion: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 20,
  },
  questionText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ffffff',
    flex: 1,
    marginRight: 12,
    lineHeight: 22,
  },
  chevronContainer: {
    width: 32,
    height: 32,
    backgroundColor: 'rgba(212, 175, 55, 0.2)',
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  faqAnswer: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  answerDivider: {
    height: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    marginBottom: 16,
  },
  answerText: {
    fontSize: 15,
    color: '#d1d5db',
    lineHeight: 22,
  },
  contactSection: {
    paddingHorizontal: 20,
    marginTop: 32,
  },
  contactCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 24,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    overflow: 'hidden',
    position: 'relative',
  },
  contactBackgroundEffects: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 1,
  },
  contactBlur1: {
    position: 'absolute',
    width: 120,
    height: 120,
    backgroundColor: 'rgba(212, 175, 55, 0.1)',
    borderRadius: 60,
    top: -40,
    right: -40,
  },
  contactBlur2: {
    position: 'absolute',
    width: 120,
    height: 120,
    backgroundColor: 'rgba(212, 175, 55, 0.1)',
    borderRadius: 60,
    bottom: -40,
    left: -40,
  },
  contactContent: {
    padding: 24,
    alignItems: 'center',
    zIndex: 10,
  },
  contactTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#D4AF37',
    marginBottom: 12,
    textAlign: 'center',
    lineHeight: 32,
  },
  contactDescription: {
    fontSize: 16,
    color: '#d1d5db',
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 24,
  },
  emailButton: {
    backgroundColor: '#D4AF37',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 32,
    paddingVertical: 16,
    borderRadius: 16,
    shadowColor: '#D4AF37',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  emailButtonText: {
    color: '#071538',
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 8,
  },
  navigationSection: {
    alignItems: 'center',
    paddingHorizontal: 20,
    marginTop: 32,
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
