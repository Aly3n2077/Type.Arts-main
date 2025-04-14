import { View, Text, StyleSheet, ScrollView, Image, Pressable, TextInput } from 'react-native';
import { Link, useRouter } from 'expo-router';
import { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import { Animated } from 'react-native';

export default function DiscoverScreen() {
  const router = useRouter();
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  
  const featuredArtworks = [
    {
      id: '1',
      title: "Bronze Harmony",
      artist: "Elena Rodriguez",
      image: "https://images.unsplash.com/photo-1561839561-b13bcfe95249?q=80&w=800&auto=format&fit=crop",
      price: "$12,500"
    },
    {
      id: '4',
      title: "Digital Dreams",
      artist: "Alex Rivera",
      image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=800&auto=format&fit=crop",
      price: "$5,000"
    },
    {
      id: '6',
      title: "Abstract Emotions",
      artist: "David Kim",
      image: "https://images.unsplash.com/photo-1549887534-1541e9326642?q=80&w=800&auto=format&fit=crop",
      price: "$9,500"
    }
  ];

  const categories = ['All', 'Sculptures', 'Digital Art', 'Paintings', 'Photography', 'Installations'];

  const handleCategoryPress = (category: string) => {
    setActiveCategory(category);
    router.push({
      pathname: "/marketplace",
      params: { category }
    });
  };

  const handleSearch = () => {
    if (searchQuery.trim()) {
      router.push({
        pathname: "/search" as const,
        params: { query: searchQuery }
      });
    }
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <View style={[
          styles.searchBar,
          isSearchFocused && styles.searchBarFocused
        ]}>
          <Ionicons name="search" size={20} color="#6B7280" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search artworks, artists..."
            placeholderTextColor="#9CA3AF"
            value={searchQuery}
            onChangeText={setSearchQuery}
            onFocus={() => setIsSearchFocused(true)}
            onBlur={() => setIsSearchFocused(false)}
            onSubmitEditing={handleSearch}
          />
          {searchQuery.length > 0 && (
            <Pressable onPress={() => setSearchQuery('')}>
              <Ionicons name="close-circle" size={20} color="#6B7280" />
            </Pressable>
          )}
        </View>
      </View>

      {/* Hero Section */}
      <View style={styles.heroSection}>
        <Image
          source={{ uri: featuredArtworks[0].image }}
          style={styles.heroImage}
        />
        <LinearGradient
          colors={['transparent', 'rgba(0,0,0,0.8)']}
          style={styles.heroGradient}
        />
        <View style={styles.heroOverlay}>
          <Text style={styles.heroTitle}>Featured Artwork</Text>
          <Text style={styles.heroSubtitle}>{featuredArtworks[0].title}</Text>
          <Text style={styles.heroArtist}>by {featuredArtworks[0].artist}</Text>
          <Text style={styles.heroPrice}>{featuredArtworks[0].price}</Text>
          <Link href="/marketplace" asChild>
            <Pressable style={styles.exploreButton}>
              <Text style={styles.exploreButtonText}>Explore Market</Text>
              <Ionicons name="arrow-forward" size={20} color="#ffffff" style={styles.buttonIcon} />
            </Pressable>
          </Link>
        </View>
      </View>

      {/* Categories Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Trending Categories</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoriesScroll}>
          {categories.map((category) => (
            <Pressable 
              key={category} 
              style={[
                styles.categoryCard,
                activeCategory === category && styles.categoryCardActive
              ]}
              onPress={() => handleCategoryPress(category)}
            >
              <Text style={[
                styles.categoryText,
                activeCategory === category && styles.categoryTextActive
              ]}>
                {category}
              </Text>
            </Pressable>
          ))}
        </ScrollView>
      </View>

      {/* Featured Artists Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Featured Artists</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.artistsScroll}>
          {[
            {
              id: '1',
              name: 'Elena Rodriguez',
              specialty: 'Sculptures',
              image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=800&auto=format&fit=crop',
            },
            {
              id: '2',
              name: 'Michael Chen',
              specialty: 'Sculptures',
              image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=800&auto=format&fit=crop',
            },
            {
              id: '3',
              name: 'Sarah Johnson',
              specialty: 'Sculptures',
              image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=800&auto=format&fit=crop',
            },
            {
              id: '4',
              name: 'Alex Rivera',
              specialty: 'Digital Art',
              image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=800&auto=format&fit=crop',
            },
          ].map((artist) => (
            <Pressable 
              key={artist.id} 
              style={styles.artistCard}
              onPress={() => router.push({
                pathname: "/artists/[id]" as const,
                params: { id: artist.id }
              })}
            >
              <Image source={{ uri: artist.image }} style={styles.artistImage} />
              <View style={styles.artistInfo}>
                <Text style={styles.artistName}>{artist.name}</Text>
                <Text style={styles.artistSpecialty}>{artist.specialty}</Text>
              </View>
            </Pressable>
          ))}
        </ScrollView>
      </View>

      {/* Featured Artworks Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Featured Artworks</Text>
        <View style={styles.artworksGrid}>
          {featuredArtworks.map((artwork) => (
            <Pressable 
              key={artwork.id} 
              style={styles.artworkCard}
              onPress={() => router.push({
                pathname: "/artwork/[id]",
                params: { id: artwork.id }
              })}
            >
              <Image source={{ uri: artwork.image }} style={styles.artworkImage} />
              <View style={styles.artworkInfo}>
                <Text style={styles.artworkTitle}>{artwork.title}</Text>
                <Text style={styles.artworkArtist}>{artwork.artist}</Text>
                <Text style={styles.artworkPrice}>{artwork.price}</Text>
              </View>
            </Pressable>
          ))}
        </View>
      </View>

      {/* Newsletter Section */}
      <View style={styles.newsletterSection}>
        <BlurView intensity={80} style={styles.newsletterBlur}>
          <Text style={styles.newsletterTitle}>Stay Updated</Text>
          <Text style={styles.newsletterText}>Subscribe to our newsletter for the latest artworks and exclusive offers.</Text>
          <View style={styles.newsletterInputContainer}>
            <TextInput
              style={styles.newsletterInput}
              placeholder="Your email address"
              placeholderTextColor="#9CA3AF"
            />
            <Pressable style={styles.newsletterButton}>
              <Text style={styles.newsletterButtonText}>Subscribe</Text>
            </Pressable>
          </View>
        </BlurView>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  searchContainer: {
    padding: 16,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F3F4F6',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  searchBarFocused: {
    borderColor: '#7C3AED',
    backgroundColor: '#ffffff',
    shadowColor: '#7C3AED',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#1F2937',
  },
  heroSection: {
    height: 450,
    position: 'relative',
  },
  heroImage: {
    width: '100%',
    height: '100%',
  },
  heroGradient: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '70%',
  },
  heroOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 20,
  },
  heroTitle: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  heroSubtitle: {
    color: '#ffffff',
    fontSize: 28,
    fontWeight: 'bold',
    marginTop: 4,
  },
  heroArtist: {
    color: '#ffffff',
    fontSize: 18,
    marginTop: 4,
    opacity: 0.9,
  },
  heroPrice: {
    color: '#7C3AED',
    fontSize: 20,
    fontWeight: '600',
    marginTop: 8,
  },
  exploreButton: {
    backgroundColor: '#7C3AED',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
    marginTop: 16,
    alignSelf: 'flex-start',
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#7C3AED',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 5,
  },
  exploreButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
  buttonIcon: {
    marginLeft: 8,
  },
  section: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#1F2937',
  },
  categoriesScroll: {
    flexDirection: 'row',
  },
  categoryCard: {
    backgroundColor: '#ffffff',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
    marginRight: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  categoryCardActive: {
    backgroundColor: '#7C3AED',
    borderColor: '#7C3AED',
    shadowColor: '#7C3AED',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 5,
  },
  categoryText: {
    fontSize: 16,
    color: '#4B5563',
    fontWeight: '500',
  },
  categoryTextActive: {
    color: '#ffffff',
  },
  artistsScroll: {
    flexDirection: 'row',
  },
  artistCard: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    marginRight: 16,
    width: 150,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 4,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  artistImage: {
    width: '100%',
    height: 150,
  },
  artistInfo: {
    padding: 12,
  },
  artistName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1F2937',
  },
  artistSpecialty: {
    fontSize: 14,
    color: '#6B7280',
    marginTop: 4,
  },
  artworksGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  artworkCard: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    marginBottom: 16,
    width: '48%',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 4,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  artworkImage: {
    width: '100%',
    height: 150,
  },
  artworkInfo: {
    padding: 12,
  },
  artworkTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1F2937',
  },
  artworkArtist: {
    fontSize: 14,
    color: '#6B7280',
    marginTop: 4,
  },
  artworkPrice: {
    fontSize: 16,
    fontWeight: '600',
    color: '#7C3AED',
    marginTop: 8,
  },
  newsletterSection: {
    margin: 20,
    borderRadius: 16,
    overflow: 'hidden',
    height: 200,
    position: 'relative',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 5,
  },
  newsletterBlur: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
  },
  newsletterTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 8,
  },
  newsletterText: {
    fontSize: 16,
    color: '#4B5563',
    marginBottom: 16,
  },
  newsletterInputContainer: {
    flexDirection: 'row',
  },
  newsletterInput: {
    flex: 1,
    backgroundColor: '#ffffff',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginRight: 8,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  newsletterButton: {
    backgroundColor: '#7C3AED',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
    justifyContent: 'center',
    shadowColor: '#7C3AED',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 5,
  },
  newsletterButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
});