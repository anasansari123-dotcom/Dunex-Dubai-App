import React, { useState, useEffect, useRef } from 'react';
import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Image,
  Animated,
  StatusBar,
  SafeAreaView,
} from 'react-native';
// import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import Header from '../../components/Header';

const { width, height } = Dimensions.get('window');

export default function HomeScreen() {
  const router = useRouter();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const scrollY = useRef(new Animated.Value(0)).current;
  
  const images = [
    require('../../assets/images/first.jpg'),
    require('../../assets/images/second.jpg'),
    require('../../assets/images/third.jpg'),
    require('../../assets/images/four.jpg'),
  ];

  // Auto-rotate images
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 3500);
    return () => clearInterval(interval);
  }, [images.length]);

  const faqs = [
    {
      question: "How much ROI do I get?",
      answer: "You earn 10–15% monthly ROI, credited every month."
    },
    {
      question: "Minimum investment amount?",
      answer: "You can start with just ₹1,00,000."
    },
    {
      question: "How will I receive ROI?",
      answer: "ROI is credited directly to your bank account in INR."
    },
    {
      question: "How do I track my investment?",
      answer: "You'll receive a unique Investment ID & dashboard login to track ROI in real time."
    },
    {
      question: "Are projects verified?",
      answer: "Yes. All projects are Dubai RERA & DLD approved."
    },
    {
      question: "Is this safe?",
      answer: "Absolutely. Dunex ensures legal agreements, investor contracts, and developer verification for every project."
    }
  ];

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#0c1b3a" />
      <Header />
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: false }
        )}
        scrollEventThrottle={16}
      >
        {/* Hero Section */}
        <View style={styles.heroSection}>
          <View style={styles.heroBackground}>
            {images.map((img, i) => (
              <Animated.Image
                key={i}
                source={img}
                style={[
                  styles.heroImage,
                  {
                    opacity: i === currentIndex ? 1 : 0,
                    transform: [{ scale: i === currentIndex ? 1.05 : 1 }]
                  }
                ]}
                resizeMode="cover"
              />
            ))}
          </View>
          
          <View style={styles.heroOverlay} />

          <View style={styles.heroContent}>
            <Text style={styles.heroTitle}>
              Dubai High Return Properties Investment - Earn 10-15% Monthly ROI with Verified Real Estate
            </Text>
            <Text style={styles.heroSubtitle}>
              DUNEX gives Indian investors direct access to Dubai's premium real estate opportunities — trusted, secure, and profitable. With as little as ₹1,00,000, you can start earning 10–15% monthly ROI, credited directly to your bank account in INR.
            </Text>
            <Text style={styles.heroDescription}>
              We eliminate the risks of middlemen by offering verified projects, legal compliance, instant dashboards, and real-time profit tracking.
            </Text>

            {/* Highlights */}
            <View style={styles.highlightsContainer}>
              {[
                { icon: "🚀", text: "10–15% Monthly ROI – Earn consistently, every month" },
                { icon: "✅", text: "Start from just ₹1,00,000 – Affordable global investment entry" },
                { icon: "🔒", text: "100% Secure & Transparent – Projects vetted, documents verified" },
                { icon: "🆔", text: "Instant Investment ID – Track ROI & profits in real time" },
                { icon: "📄", text: "Legal Agreements – Every investment backed by proper contracts" }
              ].map((item, index) => (
                <View key={index} style={styles.highlightCard}>
                  <Text style={styles.highlightIcon}>{item.icon}</Text>
                  <Text style={styles.highlightText}>{item.text}</Text>
                </View>
              ))}
            </View>

            <View style={styles.heroButtons}>
              <TouchableOpacity 
                style={styles.primaryButton}
                onPress={() => router.push('/properties' as any)}
              >
                <Text style={styles.primaryButtonText}>Start Investing</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={styles.secondaryButton}
                onPress={() => router.push('/contact' as any)}
              >
                <Text style={styles.secondaryButtonText}>Talk to Our Experts</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Verification Note */}
        <View style={styles.verificationNote}>
          <Text style={styles.verificationText}>
            💡 All opportunities are verified, RERA-registered, and backed by Dubai's top developers.
          </Text>
        </View>

        {/* Trusted Customers Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>100+ Trusted Dubai Property Investors</Text>
          <Text style={styles.sectionSubtitle}>Join hundreds of satisfied investors who are already earning with DUNEX</Text>
          
          <View style={styles.customersGrid}>
            {[
              { name: "Rahul S.", location: "Delhi", investment: "₹2,50,000", roi: "12% monthly" },
              { name: "Priya M.", location: "Mumbai", investment: "₹1,00,000", roi: "10% monthly" },
              { name: "Amit K.", location: "Bangalore", investment: "₹5,00,000", roi: "15% monthly" },
              { name: "Sara J.", location: "Chennai", investment: "₹3,00,000", roi: "13% monthly" },
              { name: "Rajesh P.", location: "Pune", investment: "₹1,50,000", roi: "11% monthly" },
              { name: "Anita R.", location: "Hyderabad", investment: "₹4,00,000", roi: "14% monthly" },
            ].map((customer, index) => (
              <View key={index} style={styles.customerCard}>
                <View style={styles.customerAvatar}>
                  <Text style={styles.customerInitial}>{customer.name.charAt(0)}</Text>
                </View>
                <Text style={styles.customerName}>{customer.name}</Text>
                <Text style={styles.customerLocation}>{customer.location}</Text>
                <Text style={styles.customerInvestment}>Invested: {customer.investment}</Text>
                <Text style={styles.customerROI}>ROI: {customer.roi}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Why Dubai Real Estate Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Why Dubai High Return Properties?</Text>
          <Text style={styles.sectionSubtitle}>
            Dubai offers one of the world's most profitable and safest real estate investment markets for Indian investors seeking high ROI opportunities.
          </Text>

          <View style={styles.whyDubaiGrid}>
            {[
              { icon: "📈", title: "High ROI Potential", description: "Rental yields in Dubai are among the highest in the world, delivering 10–15% monthly returns." },
              { icon: "🏦", title: "Tax-Free Benefits", description: "Investors enjoy zero income tax on rental or profit income." },
              { icon: "🌍", title: "Fast-Growing Market", description: "Dubai is a global business hub, attracting investors from over 200 countries." },
              { icon: "🛡", title: "Secure & Transparent", description: "All investments are regulated by the Dubai Land Department (DLD)." },
              { icon: "🏙", title: "Prestige & Growth", description: "Strong property appreciation with consistent value growth year after year." }
            ].map((item, index) => (
              <View key={index} style={styles.whyDubaiCard}>
                <Text style={styles.whyDubaiIcon}>{item.icon}</Text>
                <Text style={styles.whyDubaiTitle}>{item.title}</Text>
                <Text style={styles.whyDubaiDescription}>{item.description}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Why Choose DUNEX Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Why Choose DUNEX?</Text>
          <Text style={styles.sectionSubtitle}>Your Trusted Dubai Real Estate Investment Partner</Text>

          <View style={styles.whyDunexGrid}>
            {[
              { icon: "📅", title: "Monthly ROI (10–15%)", desc: "Returns are credited every month in INR." },
              { icon: "🏗", title: "Verified Projects Only", desc: "We partner with Dubai's top developers (Emaar, DAMAC, Nakheel, etc.)." },
              { icon: "🔒", title: "Safe & Transparent", desc: "100% legal compliance, investor agreements, and DLD-verified projects." },
              { icon: "💰", title: "Low Entry Barrier", desc: "Start from just ₹1,00,000." },
              { icon: "🌍", title: "Global Access", desc: "Invest online securely from anywhere in India." },
              { icon: "🤝", title: "Expert Guidance", desc: "24/7 support via phone, WhatsApp, and email." },
              { icon: "🆔", title: "Instant Investment ID", desc: "Get real-time dashboards to track profits anytime." },
              { icon: "📄", title: "Full Documentation", desc: "Receive legal contracts, receipts, and project details for complete peace of mind." }
            ].map((item, index) => (
              <View key={index} style={styles.whyDunexCard}>
                <Text style={styles.whyDunexIcon}>{item.icon}</Text>
                <Text style={styles.whyDunexTitle}>{item.title}</Text>
                <Text style={styles.whyDunexDescription}>{item.desc}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* How It Works Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>How Dubai Property Investment Works with DUNEX</Text>

          <View style={styles.howItWorksGrid}>
            {[
              { step: "1️⃣", title: "Browse Projects", desc: "Explore premium Dubai properties handpicked by experts." },
              { step: "2️⃣", title: "Invest Securely", desc: "Complete your investment online with legal contracts." },
              { step: "3️⃣", title: "Get Investment ID", desc: "Instantly receive your digital ID with dashboard access." },
              { step: "4️⃣", title: "Earn Monthly ROI", desc: "10–15% ROI credited directly to your bank account, with real-time tracking." }
            ].map((item, index) => (
              <View key={index} style={styles.howItWorksCard}>
                <View style={styles.howItWorksStep}>
                  <Text style={styles.howItWorksStepText}>{item.step}</Text>
                </View>
                <Text style={styles.howItWorksTitle}>{item.title}</Text>
                <Text style={styles.howItWorksDescription}>{item.desc}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Featured Opportunities Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Featured Dubai High ROI Property Investment Opportunities</Text>
          <Text style={styles.sectionSubtitle}>
            Discover our curated selection of verified Dubai properties offering exceptional returns for Indian investors
          </Text>

          <View style={styles.opportunitiesGrid}>
            {[
              {
                icon: "🏙",
                title: "Downtown Dubai",
                subtitle: "Premium Properties",
                startFrom: "₹1,00,000",
                roi: "10–15%"
              },
              {
                icon: "🏝",
                title: "Palm Jumeirah",
                subtitle: "Luxury Projects",
                startFrom: "₹2,50,000",
                roi: "10–15%"
              },
              {
                icon: "🌉",
                title: "Dubai Marina",
                subtitle: "High Demand Projects",
                startFrom: "₹5,00,000",
                roi: "10–15%"
              }
            ].map((item, index) => (
              <View key={index} style={styles.opportunityCard}>
                <Text style={styles.opportunityIcon}>{item.icon}</Text>
                <Text style={styles.opportunityTitle}>{item.title}</Text>
                <Text style={styles.opportunitySubtitle}>{item.subtitle}</Text>
                <View style={styles.opportunityDetails}>
                  <View style={styles.opportunityDetail}>
                    <Text style={styles.opportunityDetailLabel}>Start from:</Text>
                    <Text style={styles.opportunityDetailValue}>{item.startFrom}</Text>
                  </View>
                  <View style={styles.opportunityDetail}>
                    <Text style={styles.opportunityDetailLabel}>Monthly ROI:</Text>
                    <Text style={styles.opportunityDetailValue}>{item.roi}</Text>
                  </View>
                </View>
                <TouchableOpacity 
                  style={styles.opportunityButton}
                  onPress={() => router.push('/properties' as any)}
                >
                  <Text style={styles.opportunityButtonText}>Invest Now</Text>
                </TouchableOpacity>
              </View>
            ))}
          </View>
        </View>

        {/* Testimonials Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Dubai Property Investment Testimonials</Text>
          <Text style={styles.sectionSubtitle}>Real Stories from Our Investors</Text>

          <View style={styles.testimonialsGrid}>
            {[
              {
                quote: "I invested ₹1,00,000 and started receiving ROI from the next month. The dashboard and support team are very transparent. Highly recommended.",
                author: "Rahul (Delhi)"
              },
              {
                quote: "The monthly ROI of 12% is consistent, and I love how easy Dunex made Dubai real estate investment for Indians.",
                author: "Sara (Mumbai)"
              },
              {
                quote: "Secure, professional, and profitable. Dunex is my trusted partner for real estate investments abroad.",
                author: "Amit (Bangalore)"
              }
            ].map((item, index) => (
              <View key={index} style={styles.testimonialCard}>
                <Text style={styles.testimonialIcon}>💬</Text>
                <Text style={styles.testimonialQuote}>"{item.quote}"</Text>
                <Text style={styles.testimonialAuthor}>– {item.author}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Final CTA Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Start Today. Earn 10–15% Monthly ROI with DUNEX Dubai Properties.</Text>
          <Text style={styles.sectionSubtitle}>
            Your money should be working for you. Begin investing in Dubai's most profitable properties today and enjoy guaranteed monthly returns with long-term growth.
          </Text>
          
          <View style={styles.finalButtons}>
            <TouchableOpacity 
              style={styles.primaryButton}
              onPress={() => router.push('/properties' as any)}
            >
              <Text style={styles.primaryButtonText}>Invest Now</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={styles.secondaryButton}
              onPress={() => router.push('/contact' as any)}
            >
              <Text style={styles.secondaryButtonText}>Free Consultation</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* FAQ Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Frequently Asked Questions</Text>

          <View style={styles.faqContainer}>
            {faqs.map((faq, index) => (
              <View key={index} style={styles.faqCard}>
                <TouchableOpacity
                  style={styles.faqQuestion}
                  onPress={() => setOpenFaq(openFaq === index ? null : index)}
                >
                  <Text style={styles.faqQuestionText}>{faq.question}</Text>
                  <Text style={styles.faqToggle}>
                    {openFaq === index ? "−" : "+"}
                  </Text>
                </TouchableOpacity>
                {openFaq === index && (
                  <View style={styles.faqAnswer}>
                    <Text style={styles.faqAnswerText}>{faq.answer}</Text>
                  </View>
                )}
              </View>
            ))}
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
  scrollContent: {
    paddingBottom: 60,
  },
  heroSection: {
    minHeight: height * 0.9,
    position: 'relative',
    paddingBottom: 40,
  },
  heroBackground: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  heroImage: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width: '100%',
    height: '100%',
  },
  heroOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(7,21,56,0.7)',
  },
  heroContent: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 40,
    zIndex: 10,
  },
  heroTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff',
    textAlign: 'center',
    marginBottom: 16,
    lineHeight: 32,
  },
  heroSubtitle: {
    fontSize: 16,
    color: '#e5e7eb',
    textAlign: 'center',
    marginBottom: 12,
    lineHeight: 24,
  },
  heroDescription: {
    fontSize: 14,
    color: '#e5e7eb',
    textAlign: 'center',
    marginBottom: 24,
    lineHeight: 20,
  },
  highlightsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginBottom: 24,
    gap: 8,
  },
  highlightCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 8,
    padding: 12,
    margin: 4,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
    minWidth: 150,
    alignItems: 'center',
  },
  highlightIcon: {
    fontSize: 20,
    marginBottom: 4,
  },
  highlightText: {
    fontSize: 12,
    color: '#ffffff',
    textAlign: 'center',
    fontWeight: '600',
  },
  heroButtons: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 16,
    width: '100%',
    marginTop: 20,
  },
  primaryButton: {
    backgroundColor: '#D4AF37',
    paddingHorizontal: 32,
    paddingVertical: 14,
    borderRadius: 25,
    width: '100%',
    maxWidth: 280,
    alignItems: 'center',
    justifyContent: 'center',
  },
  primaryButtonText: {
    color: '#071538',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  secondaryButton: {
    borderWidth: 2,
    borderColor: '#D4AF37',
    paddingHorizontal: 32,
    paddingVertical: 14,
    borderRadius: 25,
    width: '100%',
    maxWidth: 280,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
  secondaryButtonText: {
    color: '#D4AF37',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  section: {
    padding: 20,
    paddingBottom: 40,
    backgroundColor: '#0c1b3a',
  },
  sectionTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#ffffff',
    textAlign: 'center',
    marginBottom: 16,
  },
  sectionSubtitle: {
    fontSize: 16,
    color: '#d1d5db',
    textAlign: 'center',
    marginBottom: 24,
    lineHeight: 24,
  },
  faqContainer: {
    gap: 12,
  },
  faqCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    overflow: 'hidden',
  },
  faqQuestion: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
  },
  faqQuestionText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
    flex: 1,
    marginRight: 12,
  },
  faqToggle: {
    color: '#D4AF37',
    fontSize: 20,
    fontWeight: 'bold',
  },
  faqAnswer: {
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  faqAnswerText: {
    color: '#d1d5db',
    fontSize: 14,
    lineHeight: 20,
  },
  verificationNote: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    paddingBottom: 30,
    backgroundColor: '#0c1b3a',
  },
  verificationText: {
    color: '#d1d5db',
    textAlign: 'center',
    fontSize: 14,
  },
  customersGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 12,
  },
  customerCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    width: '48%',
    alignItems: 'center',
  },
  customerAvatar: {
    width: 48,
    height: 48,
    backgroundColor: '#D4AF37',
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  customerInitial: {
    color: '#071538',
    fontSize: 18,
    fontWeight: 'bold',
  },
  customerName: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 4,
  },
  customerLocation: {
    color: '#9ca3af',
    fontSize: 12,
    marginBottom: 8,
  },
  customerInvestment: {
    color: '#D4AF37',
    fontSize: 12,
    fontWeight: '500',
    marginBottom: 2,
  },
  customerROI: {
    color: '#10b981',
    fontSize: 12,
    fontWeight: '500',
  },
  whyDubaiGrid: {
    gap: 16,
  },
  whyDubaiCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 12,
    padding: 20,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  whyDubaiIcon: {
    fontSize: 32,
    marginBottom: 12,
  },
  whyDubaiTitle: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  whyDubaiDescription: {
    color: '#d1d5db',
    fontSize: 14,
    lineHeight: 20,
  },
  whyDunexGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  whyDunexCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    width: '48%',
  },
  whyDunexIcon: {
    fontSize: 24,
    marginBottom: 8,
  },
  whyDunexTitle: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  whyDunexDescription: {
    color: '#d1d5db',
    fontSize: 12,
    lineHeight: 16,
  },
  howItWorksGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
    justifyContent: 'center',
  },
  howItWorksCard: {
    alignItems: 'center',
    width: '48%',
    maxWidth: 200,
  },
  howItWorksStep: {
    backgroundColor: '#D4AF37',
    width: 64,
    height: 64,
    borderRadius: 32,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  howItWorksStepText: {
    color: '#071538',
    fontSize: 20,
    fontWeight: 'bold',
  },
  howItWorksTitle: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
    textAlign: 'center',
  },
  howItWorksDescription: {
    color: '#d1d5db',
    fontSize: 12,
    textAlign: 'center',
    lineHeight: 16,
  },
  opportunitiesGrid: {
    gap: 16,
  },
  opportunityCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    alignItems: 'center',
  },
  opportunityIcon: {
    fontSize: 32,
    marginBottom: 12,
  },
  opportunityTitle: {
    color: '#ffffff',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  opportunitySubtitle: {
    color: '#d1d5db',
    fontSize: 14,
    marginBottom: 16,
  },
  opportunityDetails: {
    width: '100%',
    marginBottom: 16,
  },
  opportunityDetail: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  opportunityDetailLabel: {
    color: '#9ca3af',
    fontSize: 14,
  },
  opportunityDetailValue: {
    color: '#D4AF37',
    fontSize: 14,
    fontWeight: 'bold',
  },
  opportunityButton: {
    backgroundColor: '#D4AF37',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
    width: '100%',
  },
  opportunityButtonText: {
    color: '#071538',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  testimonialsGrid: {
    gap: 16,
  },
  testimonialCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 12,
    padding: 20,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  testimonialIcon: {
    fontSize: 32,
    marginBottom: 12,
  },
  testimonialQuote: {
    color: '#d1d5db',
    fontSize: 14,
    fontStyle: 'italic',
    marginBottom: 12,
    lineHeight: 20,
  },
  testimonialAuthor: {
    color: '#D4AF37',
    fontSize: 14,
    fontWeight: '600',
  },
  finalButtons: {
    flexDirection: 'row',
    gap: 12,
    justifyContent: 'center',
    flexWrap: 'wrap',
  },
  loginButton: {
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: '#ffffff',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 25,
    minWidth: 150,
  },
  loginButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
