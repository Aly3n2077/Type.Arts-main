import { View, Text, StyleSheet, Image, Pressable, ScrollView, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Link, useRouter } from 'expo-router';
import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';

export default function ProfileScreen() {
  const router = useRouter();
  const { user, loading, signInWithGoogle, signOut } = useAuth();
  
  const handleLogin = async () => {
    try {
      await signInWithGoogle();
      // Navigation will be handled by the auth state change
    } catch (error) {
      console.error('Login error:', error);
      // You might want to show an error message to the user
    }
  };
  
  const handleSignUp = async () => {
    // For simplicity, we'll use the same Google sign-in for both login and signup
    try {
      await signInWithGoogle();
      // Navigation will be handled by the auth state change
    } catch (error) {
      console.error('Signup error:', error);
      // You might want to show an error message to the user
    }
  };
  
  const handleLogout = async () => {
    try {
      await signOut();
      // Navigation will be handled by the auth state change
    } catch (error) {
      console.error('Logout error:', error);
      // You might want to show an error message to the user
    }
  };
  
  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#7C3AED" />
        <Text style={styles.loadingText}>Loading...</Text>
      </View>
    );
  }
  
  if (!user) {
    return (
      <ScrollView style={styles.container}>
        <View style={styles.visitorHeader}>
          <Image
            source={{ uri: 'https://images.unsplash.com/photo-1579546929518-9e396f3cc809?q=80&w=800&auto=format&fit=crop' }}
            style={styles.visitorImage}
          />
          <Text style={styles.visitorTitle}>Join Type.Arts</Text>
          <Text style={styles.visitorSubtitle}>Create an account to save your favorite artworks, follow artists, and more.</Text>
        </View>
        
        <View style={styles.authButtons}>
          <Pressable style={styles.loginButton} onPress={handleLogin}>
            <Text style={styles.loginButtonText}>Log In</Text>
          </Pressable>
          <Pressable style={styles.signupButton} onPress={handleSignUp}>
            <Text style={styles.signupButtonText}>Sign Up</Text>
          </Pressable>
        </View>
        
        <View style={styles.featuresSection}>
          <Text style={styles.sectionTitle}>Features</Text>
          <View style={styles.featureItem}>
            <Ionicons name="heart-outline" size={24} color="#7C3AED" />
            <Text style={styles.featureText}>Save your favorite artworks</Text>
          </View>
          <View style={styles.featureItem}>
            <Ionicons name="people-outline" size={24} color="#7C3AED" />
            <Text style={styles.featureText}>Follow your favorite artists</Text>
          </View>
          <View style={styles.featureItem}>
            <Ionicons name="cart-outline" size={24} color="#7C3AED" />
            <Text style={styles.featureText}>Purchase unique artworks</Text>
          </View>
          <View style={styles.featureItem}>
            <Ionicons name="notifications-outline" size={24} color="#7C3AED" />
            <Text style={styles.featureText}>Get notified about new releases</Text>
          </View>
        </View>
      </ScrollView>
    );
  }
  
  // Authenticated user view
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Image
          source={{ uri: user.photoURL || 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=800&auto=format&fit=crop' }}
          style={styles.profileImage}
        />
        <Text style={styles.name}>{user.displayName || 'User'}</Text>
        <Text style={styles.role}>Art Collector</Text>
        <View style={styles.stats}>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>23</Text>
            <Text style={styles.statLabel}>Collections</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>156</Text>
            <Text style={styles.statLabel}>Following</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>1.2K</Text>
            <Text style={styles.statLabel}>Followers</Text>
          </View>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>My Collections</Text>
        <Link href={"/(tabs)/collections" as any} asChild>
          <Pressable style={styles.menuItem}>
            <Ionicons name="folder-outline" size={24} color="#4B5563" />
            <Text style={styles.menuText}>View All Collections</Text>
            <Ionicons name="chevron-forward" size={24} color="#4B5563" />
          </Pressable>
        </Link>
        <Link href={"/(tabs)/collections/favorites" as any} asChild>
          <Pressable style={styles.menuItem}>
            <Ionicons name="heart-outline" size={24} color="#4B5563" />
            <Text style={styles.menuText}>Favorites</Text>
            <Ionicons name="chevron-forward" size={24} color="#4B5563" />
          </Pressable>
        </Link>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Account Settings</Text>
        <Link href={"/(tabs)/profile/edit" as any} asChild>
          <Pressable style={styles.menuItem}>
            <Ionicons name="person-outline" size={24} color="#4B5563" />
            <Text style={styles.menuText}>Edit Profile</Text>
            <Ionicons name="chevron-forward" size={24} color="#4B5563" />
          </Pressable>
        </Link>
        <Link href={"/(tabs)/profile/payment" as any} asChild>
          <Pressable style={styles.menuItem}>
            <Ionicons name="wallet-outline" size={24} color="#4B5563" />
            <Text style={styles.menuText}>Payment Methods</Text>
            <Ionicons name="chevron-forward" size={24} color="#4B5563" />
          </Pressable>
        </Link>
        <Link href={"/(tabs)/profile/settings" as any} asChild>
          <Pressable style={styles.menuItem}>
            <Ionicons name="settings-outline" size={24} color="#4B5563" />
            <Text style={styles.menuText}>Settings</Text>
            <Ionicons name="chevron-forward" size={24} color="#4B5563" />
          </Pressable>
        </Link>
        <Link href={"/(tabs)/profile/help" as any} asChild>
          <Pressable style={styles.menuItem}>
            <Ionicons name="help-circle-outline" size={24} color="#4B5563" />
            <Text style={styles.menuText}>Help & Support</Text>
            <Ionicons name="chevron-forward" size={24} color="#4B5563" />
          </Pressable>
        </Link>
      </View>

      <Pressable style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutButtonText}>Log Out</Text>
      </Pressable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F9FAFB',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#6B7280',
  },
  header: {
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#ffffff',
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 16,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1F2937',
  },
  role: {
    fontSize: 16,
    color: '#6B7280',
    marginTop: 4,
  },
  stats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginTop: 20,
    paddingHorizontal: 20,
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1F2937',
  },
  statLabel: {
    fontSize: 14,
    color: '#6B7280',
    marginTop: 4,
  },
  section: {
    backgroundColor: '#ffffff',
    marginTop: 20,
    paddingVertical: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 16,
    paddingHorizontal: 20,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 20,
  },
  menuText: {
    flex: 1,
    fontSize: 16,
    color: '#4B5563',
    marginLeft: 12,
  },
  logoutButton: {
    margin: 20,
    backgroundColor: '#EF4444',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  logoutButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
  // Visitor styles
  visitorHeader: {
    alignItems: 'center',
    padding: 30,
    backgroundColor: '#ffffff',
  },
  visitorImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginBottom: 20,
  },
  visitorTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1F2937',
    textAlign: 'center',
  },
  visitorSubtitle: {
    fontSize: 16,
    color: '#6B7280',
    textAlign: 'center',
    marginTop: 10,
    lineHeight: 22,
  },
  authButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 20,
    marginTop: 10,
  },
  loginButton: {
    flex: 1,
    backgroundColor: '#ffffff',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginRight: 10,
    borderWidth: 1,
    borderColor: '#7C3AED',
  },
  loginButtonText: {
    color: '#7C3AED',
    fontSize: 16,
    fontWeight: '600',
  },
  signupButton: {
    flex: 1,
    backgroundColor: '#7C3AED',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginLeft: 10,
  },
  signupButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
  featuresSection: {
    backgroundColor: '#ffffff',
    marginTop: 20,
    paddingVertical: 20,
    paddingHorizontal: 20,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  featureText: {
    fontSize: 16,
    color: '#4B5563',
    marginLeft: 12,
  },
});