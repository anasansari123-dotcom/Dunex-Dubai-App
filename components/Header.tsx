import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  StatusBar,
  SafeAreaView,
  Animated,
  Modal,
  ScrollView,
  Image,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter, usePathname } from 'expo-router';
import { useAuth } from '../hooks/useAuth';

const { width } = Dimensions.get('window');

export default function Header() {
  const router = useRouter();
  const pathname = usePathname();
  const { user, isAuthenticated, logout, loading } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [slideAnim] = useState(new Animated.Value(-300));

  const handleCloseMenu = () => {
    setIsOpen(false);
  };

  // Close mobile menu when route changes
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  // Animate mobile menu
  useEffect(() => {
    if (isOpen) {
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(slideAnim, {
        toValue: -300,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  }, [isOpen]);

  const handleLogout = async () => {
    await logout();
    handleCloseMenu();
  };

  const handleNavigation = (route: string) => {
    router.push(route as any);
    handleCloseMenu();
  };


  const MobileNavItem = ({ 
    route, 
    label, 
    onPress 
  }: { 
    route: string; 
    label: string; 
    onPress: () => void;
  }) => (
    <TouchableOpacity
      style={styles.mobileNavItem}
      onPress={onPress}
    >
      <Text style={styles.mobileNavText}>{label}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor="#0c1b3a" />
      <View style={styles.header}>
        <View style={styles.headerContent}>
          {/* Logo */}
          <TouchableOpacity 
            style={styles.logoContainer}
            onPress={() => router.push('/' as any)}
          >
            <Image 
              source={require('../assets/images/logo.png')} 
              style={styles.logoImage}
              resizeMode="contain"
            />
          </TouchableOpacity>

          {/* Quick Access Slider */}
          {isAuthenticated && (
            <ScrollView 
              horizontal 
              showsHorizontalScrollIndicator={false}
              style={styles.quickAccessSlider}
              contentContainerStyle={styles.quickAccessContent}
            >
              <TouchableOpacity
                style={styles.quickAccessButton}
                onPress={() => router.push('/dashboard' as any)}
              >
                <Ionicons name="grid" size={18} color="#D4AF37" />
                <Text style={styles.quickAccessText}>Dashboard</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.quickAccessButton}
                onPress={() => router.push('/payment' as any)}
              >
                <Ionicons name="card" size={18} color="#D4AF37" />
                <Text style={styles.quickAccessText}>Payment</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.quickAccessButton}
                onPress={() => router.push('/properties' as any)}
              >
                <Ionicons name="home" size={18} color="#D4AF37" />
                <Text style={styles.quickAccessText}>Properties</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.quickAccessButton}
                onPress={() => router.push('/profile' as any)}
              >
                <Ionicons name="person" size={18} color="#D4AF37" />
                <Text style={styles.quickAccessText}>Profile</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.quickAccessButton}
                onPress={() => router.push('/investment-guide' as any)}
              >
                <Ionicons name="book" size={18} color="#D4AF37" />
                <Text style={styles.quickAccessText}>Guide</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.quickAccessButton}
                onPress={() => router.push('/contact' as any)}
              >
                <Ionicons name="call" size={18} color="#D4AF37" />
                <Text style={styles.quickAccessText}>Contact</Text>
              </TouchableOpacity>
            </ScrollView>
          )}

          {/* Mobile toggle */}
          <TouchableOpacity
            style={styles.mobileToggle}
            onPress={() => setIsOpen(!isOpen)}
          >
            <Ionicons 
              name={isOpen ? 'close' : 'menu'} 
              size={24} 
              color="#D4AF37" 
            />
          </TouchableOpacity>
        </View>
      </View>

      {/* Mobile Menu Modal */}
      <Modal
        visible={isOpen}
        transparent={true}
        animationType="fade"
        onRequestClose={handleCloseMenu}
      >
        <View style={styles.mobileMenuOverlay}>
          <Animated.View 
            style={[
              styles.mobileMenu,
              {
                transform: [{ translateX: slideAnim }]
              }
            ]}
          >
            <View style={styles.mobileMenuHeader}>
              <Image 
                source={require('../assets/images/logo.png')} 
                style={styles.mobileLogoImage}
                resizeMode="contain"
              />
              <TouchableOpacity
                style={styles.closeButton}
                onPress={handleCloseMenu}
              >
                <Ionicons name="close" size={24} color="#D4AF37" />
              </TouchableOpacity>
            </View>
            
            <ScrollView style={styles.mobileMenuContent}>
              {isAuthenticated ? (
                <>
                  <MobileNavItem route="/profile" label="Profile" onPress={() => handleNavigation('/profile')} />
                  <MobileNavItem route="/dashboard" label="Dashboard" onPress={() => handleNavigation('/dashboard')} />
                  <MobileNavItem route="/properties" label="Properties" onPress={() => handleNavigation('/properties')} />
                  <MobileNavItem route="/investment-guide" label="Investment Guide" onPress={() => handleNavigation('/investment-guide')} />
                  <MobileNavItem route="/contact" label="Contact" onPress={() => handleNavigation('/contact')} />
                  <TouchableOpacity
                    onPress={handleLogout}
                    style={styles.mobileLogoutButton}
                    disabled={loading}
                  >
                    <Text style={styles.mobileLogoutText}>
                      {loading ? "Logging out..." : "Logout"}
                    </Text>
                  </TouchableOpacity>
                </>
              ) : (
                <>
                  <MobileNavItem route="/login" label="Login" onPress={() => handleNavigation('/login')} />
                  <MobileNavItem route="/dashboard" label="Dashboard" onPress={() => handleNavigation('/dashboard')} />
                  <MobileNavItem route="/properties" label="Properties" onPress={() => handleNavigation('/properties')} />
                  <MobileNavItem route="/investment-guide" label="Investment Guide" onPress={() => handleNavigation('/investment-guide')} />
                  <MobileNavItem route="/contact" label="Contact" onPress={() => handleNavigation('/contact')} />
                  <MobileNavItem route="/blog" label="Blog" onPress={() => handleNavigation('/blog')} />
                  <MobileNavItem route="/privacy" label="Privacy" onPress={() => handleNavigation('/privacy')} />
                  <MobileNavItem route="/cancellation" label="Cancellation" onPress={() => handleNavigation('/cancellation')} />
                  <MobileNavItem route="/shipping" label="Shipping" onPress={() => handleNavigation('/shipping')} />
                  <MobileNavItem route="/terms" label="Terms" onPress={() => handleNavigation('/terms')} />
                </>
              )}
              
              {/* Mobile CTA Button */}
              <TouchableOpacity
                style={styles.mobileCtaButton}
                onPress={() => handleNavigation(isAuthenticated ? '/dashboard' : '/signup')}
              >
                <Text style={styles.mobileCtaButtonText}>
                  {isAuthenticated ? 'Dashboard' : 'Get Started'}
                </Text>
              </TouchableOpacity>
            </ScrollView>
          </Animated.View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: '#0c1b3a',
  },
  header: {
    backgroundColor: '#0c1b3a',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.1)',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 80,
    paddingVertical: 10,
  },
  logoContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoImage: {
    width: 180,
    height: 80,
  },
  quickAccessSlider: {
    flex: 1,
    marginHorizontal: 12,
    maxHeight: 40,
  },
  quickAccessContent: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    gap: 8,
  },
  quickAccessButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: 'rgba(212, 175, 55, 0.1)',
    borderWidth: 1,
    borderColor: 'rgba(212, 175, 55, 0.3)',
    gap: 4,
    minWidth: 80,
    justifyContent: 'center',
  },
  quickAccessText: {
    color: '#D4AF37',
    fontSize: 11,
    fontWeight: '600',
  },
  mobileToggle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  mobileMenuOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  mobileMenu: {
    backgroundColor: '#0c1b3a',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: '80%',
    width: '100%',
  },
  mobileMenuHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.1)',
  },
  mobileLogoImage: {
    width: 100,
    height: 32,
  },
  closeButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  mobileMenuContent: {
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  mobileNavItem: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginBottom: 4,
  },
  mobileNavText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '500',
  },
  mobileLogoutButton: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginBottom: 16,
  },
  mobileLogoutText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '500',
  },
  mobileCtaButton: {
    backgroundColor: '#D4AF37',
    paddingVertical: 16,
    paddingHorizontal: 24,
    paddingBottom: 20,
    borderRadius: 25,
    alignItems: 'center',
    marginTop: 16,
    marginBottom: 20,
    shadowColor: '#D4AF37',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  mobileCtaButtonText: {
    color: '#0c1b3a',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
