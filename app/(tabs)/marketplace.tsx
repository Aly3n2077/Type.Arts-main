import { View, Text, StyleSheet, FlatList, Image, Pressable, TextInput, ScrollView } from 'react-native';
import { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

interface Artwork {
  id: string;
  title: string;
  artist: string;
  price: string;
  category: string;
  image: string;
}

const artworks: Artwork[] = [
  {
    id: '1',
    title: 'Bronze Harmony',
    artist: 'Elena Rodriguez',
    price: '$12,500',
    category: 'Sculptures',
    image: 'https://images.unsplash.com/photo-1561839561-b13bcfe95249?q=80&w=800&auto=format&fit=crop',
  },
  {
    id: '2',
    title: 'Marble Dreams',
    artist: 'Michael Chen',
    price: '$8,900',
    category: 'Sculptures',
    image: 'https://images.unsplash.com/photo-1561214115-f2f134cc4912?q=80&w=800&auto=format&fit=crop',
  },
  {
    id: '3',
    title: 'Steel Waves',
    artist: 'Sarah Johnson',
    price: '$15,000',
    category: 'Sculptures',
    image: 'https://images.unsplash.com/photo-1554188248-986adbb73be4?q=80&w=800&auto=format&fit=crop',
  },
  {
    id: '4',
    title: 'Digital Dreams',
    artist: 'Alex Rivera',
    price: '$5,000',
    category: 'Digital Art',
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=800&auto=format&fit=crop',
  },
  {
    id: '5',
    title: 'Virtual Reality',
    artist: 'Maya Patel',
    price: '$7,200',
    category: 'Digital Art',
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=800&auto=format&fit=crop',
  },
  {
    id: '6',
    title: 'Abstract Emotions',
    artist: 'David Kim',
    price: '$9,500',
    category: 'Paintings',
    image: 'https://images.unsplash.com/photo-1549887534-1541e9326642?q=80&w=800&auto=format&fit=crop',
  },
  {
    id: '7',
    title: 'Urban Landscape',
    artist: 'Sophie Turner',
    price: '$11,000',
    category: 'Paintings',
    image: 'https://images.unsplash.com/photo-1549887534-1541e9326642?q=80&w=800&auto=format&fit=crop',
  },
  {
    id: '8',
    title: 'Nature\'s Beauty',
    artist: 'James Wilson',
    price: '$3,800',
    category: 'Photography',
    image: 'https://images.unsplash.com/photo-1501854140801-50d01698950b?q=80&w=800&auto=format&fit=crop',
  },
  {
    id: '9',
    title: 'City Lights',
    artist: 'Emma Davis',
    price: '$4,200',
    category: 'Photography',
    image: 'https://images.unsplash.com/photo-1501854140801-50d01698950b?q=80&w=800&auto=format&fit=crop',
  },
  {
    id: '10',
    title: 'Interactive Space',
    artist: 'Carlos Mendez',
    price: '$18,000',
    category: 'Installations',
    image: 'https://images.unsplash.com/photo-1579546929518-9e396f3cc809?q=80&w=800&auto=format&fit=crop',
  },
  {
    id: '11',
    title: 'Light and Shadow',
    artist: 'Nina Patel',
    price: '$22,000',
    category: 'Installations',
    image: 'https://images.unsplash.com/photo-1579546929518-9e396f3cc809?q=80&w=800&auto=format&fit=crop',
  },
];

const categories = ['All', 'Sculptures', 'Digital Art', 'Paintings', 'Photography', 'Installations'];

export default function MarketplaceScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const router = useRouter();

  const filteredArtworks = artworks.filter(artwork => {
    const matchesSearch = artwork.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         artwork.artist.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || artwork.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const renderItem = ({ item }: { item: Artwork }) => (
    <Pressable 
      style={styles.artworkCard}
      onPress={() => router.push({
        pathname: "/artwork/[id]",
        params: { id: item.id }
      })}
    >
      <Image source={{ uri: item.image }} style={styles.artworkImage} />
      <View style={styles.artworkInfo}>
        <Text style={styles.artworkTitle}>{item.title}</Text>
        <Text style={styles.artworkArtist}>{item.artist}</Text>
        <Text style={styles.artworkPrice}>{item.price}</Text>
      </View>
    </Pressable>
  );

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <Ionicons name="search" size={20} color="#6B7280" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search artworks..."
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>
      
      <View style={styles.categoriesHeader}>
        <Text style={styles.categoriesTitle}>Trending Categories</Text>
      </View>
      
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        style={styles.categoriesContainer}
      >
        {categories.map((category) => (
          <Pressable
            key={category}
            style={[
              styles.categoryButton,
              selectedCategory === category && styles.categoryButtonActive
            ]}
            onPress={() => setSelectedCategory(category)}
          >
            <Text style={[
              styles.categoryText,
              selectedCategory === category && styles.categoryTextActive
            ]}>
              {category}
            </Text>
          </Pressable>
        ))}
      </ScrollView>

      <FlatList
        data={filteredArtworks}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        numColumns={2}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    margin: 16,
    paddingHorizontal: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    height: 48,
    fontSize: 16,
  },
  categoriesHeader: {
    paddingHorizontal: 16,
    marginBottom: 8,
  },
  categoriesTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1F2937',
  },
  categoriesContainer: {
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  categoryButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginRight: 8,
    borderRadius: 20,
    backgroundColor: '#ffffff',
  },
  categoryButtonActive: {
    backgroundColor: '#7C3AED',
  },
  categoryText: {
    color: '#6B7280',
    fontSize: 14,
  },
  categoryTextActive: {
    color: '#ffffff',
  },
  listContainer: {
    padding: 10,
  },
  artworkCard: {
    flex: 1,
    margin: 8,
    backgroundColor: '#ffffff',
    borderRadius: 12,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  artworkImage: {
    width: '100%',
    height: 200,
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
});