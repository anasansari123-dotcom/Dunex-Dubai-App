import React, { useState, useEffect } from 'react';
import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Image,
  StatusBar,
  SafeAreaView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import Header from '../components/Header';

const { width, height } = Dimensions.get('window');

export default function PropertiesScreen() {
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', name: 'All Properties' },
    { id: 'downtown', name: 'Downtown Dubai' },
    { id: 'marina', name: 'Dubai Marina' },
    { id: 'palm', name: 'Palm Jumeirah' },
    { id: 'business', name: 'Business Bay' },
  ];

  const properties = [
    {
      id: 1,
      title: 'Downtown Dubai Luxury Apartment',
      location: 'Downtown Dubai, UAE',
      price: '₹1,50,000',
      roi: '12%',
      image: require('../assets/images/first.jpg'),
      category: 'downtown',
      bedrooms: 2,
      bathrooms: 2,
      area: '1,200 sq ft',
    },
    {
      id: 2,
      title: 'Dubai Marina Penthouse',
      location: 'Dubai Marina, UAE',
      price: '₹3,00,000',
      roi: '15%',
      image: require('../assets/images/second.jpg'),
      category: 'marina',
      bedrooms: 3,
      bathrooms: 3,
      area: '2,500 sq ft',
    },
    {
      id: 3,
      title: 'Palm Jumeirah Villa',
      location: 'Palm Jumeirah, UAE',
      price: '₹5,00,000',
      roi: '18%',
      image: require('../assets/images/third.jpg'),
      category: 'palm',
      bedrooms: 4,
      bathrooms: 4,
      area: '4,000 sq ft',
    },
    {
      id: 4,
      title: 'Business Bay Office Space',
      location: 'Business Bay, UAE',
      price: '₹2,00,000',
      roi: '10%',
      image: require('../assets/images/four.jpg'),
      category: 'business',
      bedrooms: 0,
      bathrooms: 2,
      area: '1,500 sq ft',
    },
  ];

  const filteredProperties = selectedCategory === 'all' 
    ? properties 
    : properties.filter(prop => prop.category === selectedCategory);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#0c1b3a" />
      <Header />
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          {/* Header Section */}
          <View style={styles.headerSection}>
            <Text style={styles.headerTitle}>Dubai High Return Properties</Text>
            <Text style={styles.headerSubtitle}>
              Discover verified Dubai real estate investment opportunities with exceptional ROI potential
            </Text>
          </View>

          {/* Category Filter */}
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            style={styles.categoryContainer}
            contentContainerStyle={styles.categoryContent}
          >
            {categories.map((category) => (
              <TouchableOpacity
                key={category.id}
                style={[
                  styles.categoryButton,
                  selectedCategory === category.id && styles.categoryButtonActive
                ]}
                onPress={() => setSelectedCategory(category.id)}
              >
                <Text style={[
                  styles.categoryText,
                  selectedCategory === category.id && styles.categoryTextActive
                ]}>
                  {category.name}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>

          {/* Properties Grid */}
          <View style={styles.propertiesGrid}>
            {filteredProperties.map((property) => (
              <TouchableOpacity 
                key={property.id} 
                style={styles.propertyCard}
                onPress={() => router.push('/payment')}
              >
                <Image source={property.image} style={styles.propertyImage} />
                <View style={styles.propertyContent}>
                  <Text style={styles.propertyTitle}>{property.title}</Text>
                  <Text style={styles.propertyLocation}>{property.location}</Text>
                  
                  <View style={styles.propertyDetails}>
                    <View style={styles.propertyDetail}>
                      <Ionicons name="bed" size={16} color="#9ca3af" />
                      <Text style={styles.propertyDetailText}>{property.bedrooms} Bed</Text>
                    </View>
                    <View style={styles.propertyDetail}>
                      <Ionicons name="water" size={16} color="#9ca3af" />
                      <Text style={styles.propertyDetailText}>{property.bathrooms} Bath</Text>
                    </View>
                    <View style={styles.propertyDetail}>
                      <Ionicons name="resize" size={16} color="#9ca3af" />
                      <Text style={styles.propertyDetailText}>{property.area}</Text>
                    </View>
                  </View>

                  <View style={styles.propertyFooter}>
                    <View style={styles.priceContainer}>
                      <Text style={styles.propertyPrice}>{property.price}</Text>
                      <Text style={styles.propertyROI}>{property.roi} Monthly ROI</Text>
                    </View>
                    <TouchableOpacity 
                      style={styles.investButton}
                      onPress={() => router.push('/payment')}
                    >
                      <Text style={styles.investButtonText}>Invest Now</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </View>

          {/* CTA Section */}
          <View style={styles.ctaSection}>
            <Text style={styles.ctaTitle}>Ready to Start Investing?</Text>
            <Text style={styles.ctaSubtitle}>
              Join thousands of satisfied investors earning 10-15% monthly ROI
            </Text>
            <TouchableOpacity 
              style={styles.ctaButton}
              onPress={() => router.push('/signup')}
            >
              <Text style={styles.ctaButtonText}>Get Started Today</Text>
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
  scrollView: {
    flex: 1,
  },
  content: {
    padding: 20,
  },
  headerSection: {
    marginBottom: 24,
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
  categoryContainer: {
    marginBottom: 24,
  },
  categoryContent: {
    paddingRight: 20,
  },
  categoryButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    marginRight: 12,
  },
  categoryButtonActive: {
    backgroundColor: '#D4AF37',
  },
  categoryText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '500',
  },
  categoryTextActive: {
    color: '#0c1b3a',
  },
  propertiesGrid: {
    gap: 16,
  },
  propertyCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 12,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  propertyImage: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
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
    marginBottom: 12,
  },
  propertyDetails: {
    flexDirection: 'row',
    gap: 16,
    marginBottom: 16,
  },
  propertyDetail: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  propertyDetailText: {
    color: '#9ca3af',
    fontSize: 12,
  },
  propertyFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  priceContainer: {
    flex: 1,
  },
  propertyPrice: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#D4AF37',
    marginBottom: 2,
  },
  propertyROI: {
    fontSize: 12,
    color: '#10b981',
  },
  investButton: {
    backgroundColor: '#D4AF37',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
  },
  investButtonText: {
    color: '#0c1b3a',
    fontSize: 14,
    fontWeight: 'bold',
  },
  ctaSection: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
    marginTop: 32,
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
  ctaButton: {
    backgroundColor: '#D4AF37',
    paddingHorizontal: 32,
    paddingVertical: 16,
    borderRadius: 25,
  },
  ctaButtonText: {
    color: '#0c1b3a',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
