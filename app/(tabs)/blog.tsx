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
  TextInput,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import Header from '../../components/Header';

const { width, height } = Dimensions.get('window');

export default function BlogScreen() {
  const router = useRouter();
  const [isVisible, setIsVisible] = useState(false);
  const [email, setEmail] = useState('');
  const heroRef = useRef(null);
  const scrollY = useRef(new Animated.Value(0)).current;

  const blogPosts = [
    {
      id: 1,
      title: "Dubai High ROI Real Estate for Indian Investors: Complete 2025 Investment Guide",
      description: "Discover the best Dubai high ROI real estate opportunities for Indian investors in 2025. Learn about verified property investments, RERA-approved projects, and how to earn 10-15% monthly returns on your Dubai real estate portfolio.",
      image: require('../../assets/images/first.jpg'),
      category: "Investment Guide",
      readTime: "12 min read",
      author: "Rajesh Kumar",
      date: "December 20, 2024",
    },
    {
      id: 2,
      title: "Verified Dubai Property Investment 2025: RERA-Approved Projects for Indian NRIs",
      description: "Explore verified Dubai property investment opportunities for 2025. Get insights into RERA-approved projects, developer verification, and legal compliance for safe and profitable real estate investments in Dubai.",
      image: require('../../assets/images/partial-react-logo.png'),
      category: "Verified Projects",
      readTime: "10 min read",
      author: "Priya Sharma",
      date: "December 18, 2024",
    },
    {
      id: 3,
      title: "Best Dubai Property Investment for Indian NRIs: Location Analysis & ROI Comparison",
      description: "Compare the best Dubai property investment locations for Indian NRIs. Detailed analysis of Downtown Dubai, Dubai Marina, and Palm Jumeirah properties with ROI projections and investment strategies.",
      image: require('../../assets/images/icon.png'),
      category: "Location Analysis",
      readTime: "15 min read",
      author: "Amit Patel",
      date: "December 15, 2024",
    },
    {
      id: 4,
      title: "Dubai Luxury Apartments Investment: High Return Properties in Premium Locations",
      description: "Discover Dubai luxury apartments investment opportunities with exceptional ROI potential. Learn about premium locations, rental yields, and capital appreciation in Dubai's most sought-after residential areas.",
      image: require('../../assets/images/logo.png'),
      category: "Luxury Properties",
      readTime: "11 min read",
      author: "Sneha Reddy",
      date: "December 12, 2024",
    },
    {
      id: 5,
      title: "Dubai High Return Properties: Market Trends and Investment Opportunities 2025",
      description: "Stay ahead with the latest Dubai high return properties market trends for 2025. Expert analysis of rental yields, capital appreciation, and emerging investment opportunities in Dubai's real estate market.",
      image: require('../../assets/images/logo.png'),
      category: "Market Trends",
      readTime: "9 min read",
      author: "Vikram Singh",
      date: "December 10, 2024",
    },
    {
      id: 6,
      title: "Dubai Real Estate Investment for Indian Investors: Legal Framework & Tax Benefits",
      description: "Complete guide to Dubai real estate investment legal framework for Indian investors. Learn about RERA regulations, tax benefits, Golden Visa eligibility, and repatriation of profits to India.",
      image: require('../../assets/images/android-icon-foreground.png'),
      category: "Legal Guide",
      readTime: "8 min read",
      author: "Dr. Anjali Mehta",
      date: "December 8, 2024",
    },
  ];

  const latestNews = [
    {
      id: 1,
      title: "Dubai High Return Properties Market Achieves Record 15% Growth in Q4 2024",
      excerpt: "Dubai's high return properties market shows unprecedented growth with 15% increase in transaction volumes and rental yields reaching 12-15% across premium locations.",
      date: "December 15, 2024",
    },
    {
      id: 2,
      title: "RERA Approves 200+ New Projects for Indian NRI Investment in 2025",
      excerpt: "Dubai RERA announces approval of 200+ new verified property projects specifically targeting Indian NRI investors with enhanced legal protections and streamlined investment processes.",
      date: "December 12, 2024",
    },
    {
      id: 3,
      title: "Dubai Luxury Apartments Investment Yields Reach All-Time High of 18%",
      excerpt: "Premium Dubai luxury apartments in Downtown Dubai and Palm Jumeirah achieve record rental yields of 18%, making them the most profitable real estate investments for Indian investors.",
      date: "December 10, 2024",
    },
  ];

  // Animation for hero section
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#0c1b3a" />
      <Header />
      <ScrollView
        style={styles.scrollView}
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
            <Image
              source={require('../../assets/images/first.jpg')}
              style={styles.heroImage}
              resizeMode="cover"
            />
            <View style={styles.heroOverlay} />
          </View>

          <View style={styles.heroContent}>
            <Animated.View
              style={[
                styles.heroTextContainer,
                {
                  opacity: isVisible ? 1 : 0,
                  transform: [
                    {
                      translateY: isVisible ? 0 : 20,
                    },
                  ],
                },
              ]}
            >
              <Text style={styles.heroTitle}>
                Dubai Real Estate Investment Insights
              </Text>
              <Text style={styles.heroSubtitle}>
                Expert Guide to Dubai High Return Properties & Investment Opportunities
              </Text>
            </Animated.View>

            {/* Scroll Indicator */}
            <Animated.View
              style={[
                styles.scrollIndicator,
                {
                  opacity: scrollY.interpolate({
                    inputRange: [0, 100],
                    outputRange: [1, 0],
                    extrapolate: 'clamp',
                  }),
                },
              ]}
            >
              <Ionicons name="chevron-down" size={24} color="#D4AF37" />
            </Animated.View>
          </View>
        </View>

        {/* Content Section */}
        <View style={styles.contentSection}>
          {/* Top Row */}
          <View style={styles.topRow}>
            {/* Latest News Section */}
            <View style={styles.newsSection}>
              <Text style={styles.sectionTitle}>Latest Dubai Real Estate News</Text>
              <Text style={styles.sectionSubtitle}>
                Dedicated Blogs Written By Finexa Properties Experts.
              </Text>

              <View style={styles.newsList}>
                {latestNews.map((news, index) => (
                  <Animated.View
                    key={news.id}
                    style={[
                      styles.newsCard,
                      {
                        opacity: isVisible ? 1 : 0,
                        transform: [
                          {
                            translateY: isVisible ? 0 : 30,
                          },
                        ],
                      },
                    ]}
                  >
                    <View style={styles.newsCardContent}>
                      <Text style={styles.newsTitle}>{news.title}</Text>
                      <Text style={styles.newsExcerpt}>{news.excerpt}</Text>
                      <Text style={styles.newsDate}>{news.date}</Text>
                    </View>
                  </Animated.View>
                ))}
              </View>
            </View>

            {/* Transaction Highlight */}
            <View style={styles.highlightCard}>
              <View style={styles.highlightContent}>
                <View style={styles.highlightIcon}>
                  <Ionicons name="trending-up" size={32} color="#071538" />
                </View>
                <View style={styles.highlightText}>
                  <Text style={styles.highlightTitle}>
                    Record-Breaking Transaction Volumes
                  </Text>
                  <Text style={styles.highlightDescription}>
                    Dubai's real estate market achieved remarkable milestones in
                    October 2023, with record-breaking monthly transaction volume
                    reaching AED 41.8 billion. The market recorded 5,883
                    transactions covering a total area of 10 million square feet,
                    demonstrating unprecedented growth and investor confidence.
                  </Text>
                </View>
              </View>
            </View>
          </View>

          {/* Blog Posts Grid */}
          <View style={styles.blogSection}>
            <Text style={styles.blogSectionTitle}>Featured Insights</Text>

            <View style={styles.blogGrid}>
              {blogPosts.map((post, index) => (
                <Animated.View
                  key={post.id}
                  style={[
                    styles.blogCard,
                    {
                      opacity: isVisible ? 1 : 0,
                      transform: [
                        {
                          translateY: isVisible ? 0 : 30,
                        },
                      ],
                    },
                  ]}
                >
                  {/* Blog Image */}
                  <View style={styles.blogImageContainer}>
                    <Image source={post.image} style={styles.blogImage} resizeMode="cover" />
                    <View style={styles.blogImageOverlay} />
                    
                    {/* Category Badge */}
                    <View style={styles.categoryBadge}>
                      <Text style={styles.categoryText}>{post.category}</Text>
                    </View>

                    {/* Read Time */}
                    <View style={styles.readTimeBadge}>
                      <Text style={styles.readTimeText}>{post.readTime}</Text>
                    </View>
                  </View>

                  {/* Blog Content */}
                  <View style={styles.blogContent}>
                    <Text style={styles.blogTitle}>{post.title}</Text>
                    <Text style={styles.blogDescription}>{post.description}</Text>

                    {/* Author and Date */}
                    <View style={styles.blogMeta}>
                      <View style={styles.authorInfo}>
                        <View style={styles.authorAvatar}>
                          <Text style={styles.authorInitial}>
                            {post.author
                              .split(' ')
                              .map((n) => n[0])
                              .join('')}
                          </Text>
                        </View>
                        <Text style={styles.authorName}>{post.author}</Text>
                      </View>
                      <Text style={styles.blogDate}>{post.date}</Text>
                    </View>

                    {/* Action Button */}
                    <TouchableOpacity 
                      style={styles.readMoreButton}
                      onPress={() => router.push('/investment-guide')}
                    >
                      <Text style={styles.readMoreText}>Read More →</Text>
                    </TouchableOpacity>
                  </View>
                </Animated.View>
              ))}
            </View>
          </View>

          {/* Newsletter Signup */}
          <View style={styles.newsletterSection}>
            <Text style={styles.newsletterTitle}>
              Stay Updated with Market Insights
            </Text>
            <Text style={styles.newsletterDescription}>
              Get the latest Dubai real estate news, market trends, and investment
              opportunities delivered directly to your inbox.
            </Text>
            
            <View style={styles.newsletterForm}>
              <TextInput
                style={styles.emailInput}
                placeholder="Enter your email address"
                placeholderTextColor="#9ca3af"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
              />
              <TouchableOpacity 
                style={styles.subscribeButton}
                onPress={() => router.push('/contact')}
              >
                <Text style={styles.subscribeText}>Subscribe</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Back to Home Button */}
      <View style={styles.backButton}>
        <TouchableOpacity 
          style={styles.backButtonContent}
          onPress={() => router.push('/')}
        >
          <Ionicons name="arrow-back" size={20} color="#071538" />
          <Text style={styles.backButtonText}>Back to Home</Text>
        </TouchableOpacity>
      </View>
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
  heroSection: {
    height: height * 0.7,
    position: 'relative',
  },
  heroBackground: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  heroImage: {
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
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    zIndex: 10,
  },
  heroTextContainer: {
    alignItems: 'center',
    maxWidth: width * 0.9,
  },
  heroTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#D4AF37',
    textAlign: 'center',
    marginBottom: 16,
    textTransform: 'uppercase',
    letterSpacing: 2,
  },
  heroSubtitle: {
    fontSize: 18,
    color: '#ffffff',
    textAlign: 'center',
    lineHeight: 24,
  },
  scrollIndicator: {
    position: 'absolute',
    bottom: 30,
    alignSelf: 'center',
  },
  contentSection: {
    padding: 20,
    backgroundColor: '#0c1b3a',
  },
  topRow: {
    marginBottom: 40,
  },
  newsSection: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#D4AF37',
    marginBottom: 8,
  },
  sectionSubtitle: {
    fontSize: 16,
    color: '#d1d5db',
    marginBottom: 20,
  },
  newsList: {
    gap: 16,
  },
  newsCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 8,
    padding: 16,
    borderLeftWidth: 4,
    borderLeftColor: '#D4AF37',
  },
  newsCardContent: {
    flex: 1,
  },
  newsTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ffffff',
    marginBottom: 8,
    lineHeight: 22,
  },
  newsExcerpt: {
    fontSize: 14,
    color: '#d1d5db',
    marginBottom: 8,
    lineHeight: 20,
  },
  newsDate: {
    fontSize: 12,
    color: '#9ca3af',
  },
  highlightCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  highlightContent: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 16,
  },
  highlightIcon: {
    width: 80,
    height: 80,
    backgroundColor: '#D4AF37',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  highlightText: {
    flex: 1,
  },
  highlightTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#D4AF37',
    marginBottom: 12,
  },
  highlightDescription: {
    fontSize: 14,
    color: '#d1d5db',
    lineHeight: 20,
  },
  blogSection: {
    marginBottom: 40,
  },
  blogSectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#D4AF37',
    textAlign: 'center',
    marginBottom: 30,
  },
  blogGrid: {
    gap: 20,
  },
  blogCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 16,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  blogImageContainer: {
    height: 200,
    position: 'relative',
  },
  blogImage: {
    width: '100%',
    height: '100%',
  },
  blogImageOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
  categoryBadge: {
    position: 'absolute',
    top: 16,
    left: 16,
    backgroundColor: '#D4AF37',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  categoryText: {
    color: '#071538',
    fontSize: 12,
    fontWeight: 'bold',
  },
  readTimeBadge: {
    position: 'absolute',
    top: 16,
    right: 16,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  readTimeText: {
    color: '#ffffff',
    fontSize: 12,
  },
  blogContent: {
    padding: 20,
  },
  blogTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 12,
    lineHeight: 24,
  },
  blogDescription: {
    fontSize: 14,
    color: '#d1d5db',
    marginBottom: 16,
    lineHeight: 20,
  },
  blogMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  authorInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  authorAvatar: {
    width: 32,
    height: 32,
    backgroundColor: 'rgba(212, 175, 55, 0.2)',
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  authorInitial: {
    color: '#D4AF37',
    fontSize: 12,
    fontWeight: '600',
  },
  authorName: {
    fontSize: 12,
    color: '#9ca3af',
  },
  blogDate: {
    fontSize: 12,
    color: '#9ca3af',
  },
  readMoreButton: {
    backgroundColor: '#D4AF37',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  readMoreText: {
    color: '#071538',
    fontSize: 14,
    fontWeight: 'bold',
  },
  newsletterSection: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 16,
    padding: 24,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
    alignItems: 'center',
  },
  newsletterTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#D4AF37',
    marginBottom: 12,
    textAlign: 'center',
  },
  newsletterDescription: {
    fontSize: 14,
    color: '#d1d5db',
    textAlign: 'center',
    marginBottom: 20,
    lineHeight: 20,
  },
  newsletterForm: {
    flexDirection: 'row',
    gap: 12,
    width: '100%',
    maxWidth: 400,
  },
  emailInput: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    color: '#ffffff',
    fontSize: 14,
  },
  subscribeButton: {
    backgroundColor: '#D4AF37',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
  },
  subscribeText: {
    color: '#071538',
    fontSize: 14,
    fontWeight: 'bold',
  },
  backButton: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    zIndex: 100,
  },
  backButtonContent: {
    backgroundColor: '#D4AF37',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  backButtonText: {
    color: '#071538',
    fontSize: 14,
    fontWeight: 'bold',
  },
});
