import { View, Text, StyleSheet, ScrollView, Image, Pressable } from 'react-native';
import { Link } from 'expo-router';

export default function DiscoverScreen() {
  const featuredArtwork = {
    title: "Bronze Harmony",
    artist: "Elena Rodriguez",
    image: "https://images.unsplash.com/photo-1561839561-b13bcfe95249?q=80&w=800&auto=format&fit=crop",
    price: "$12,500"
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.heroSection}>
        <Image
          source={{ uri: featuredArtwork.image }}
          style={styles.heroImage}
        />
        <View style={styles.heroOverlay}>
          <Text style={styles.heroTitle}>Featured Artwork</Text>
          <Text style={styles.heroSubtitle}>{featuredArtwork.title}</Text>
          <Text style={styles.heroArtist}>by {featuredArtwork.artist}</Text>
          <Link href="/marketplace" asChild>
            <Pressable style={styles.exploreButton}>
              <Text style={styles.exploreButtonText}>Explore Market</Text>
            </Pressable>
          </Link>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Trending Categories</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoriesScroll}>
          {['Sculptures', 'Digital Art', 'Paintings', 'Photography', 'Installations'].map((category) => (
            <Pressable key={category} style={styles.categoryCard}>
              <Text style={styles.categoryText}>{category}</Text>
            </Pressable>
          ))}
        </ScrollView>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  heroSection: {
    height: 400,
    position: 'relative',
  },
  heroImage: {
    width: '100%',
    height: '100%',
  },
  heroOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 20,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  heroTitle: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '600',
    textTransform: 'uppercase',
  },
  heroSubtitle: {
    color: '#ffffff',
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 4,
  },
  heroArtist: {
    color: '#ffffff',
    fontSize: 16,
    marginTop: 4,
  },
  exploreButton: {
    backgroundColor: '#7C3AED',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
    marginTop: 16,
    alignSelf: 'flex-start',
  },
  exploreButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
  section: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 20,
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
  },
  categoryText: {
    fontSize: 16,
    color: '#4B5563',
    fontWeight: '500',
  },
});