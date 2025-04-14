import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, FlatList, Image, Pressable } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

// Mock data for search results
const mockArtworks = [
  {
    id: '1',
    title: 'Bronze Harmony',
    artist: 'Elena Rodriguez',
    image: 'https://images.unsplash.com/photo-1561839561-b13bcfe95249?q=80&w=800&auto=format&fit=crop',
    price: '$12,500',
    category: 'Sculptures'
  },
  {
    id: '2',
    title: 'Eternal Flow',
    artist: 'Elena Rodriguez',
    image: 'https://images.unsplash.com/photo-1561839561-b13bcfe95249?q=80&w=800&auto=format&fit=crop',
    price: '$9,800',
    category: 'Sculptures'
  },
  {
    id: '3',
    title: 'Urban Reflection',
    artist: 'Michael Chen',
    image: 'https://images.unsplash.com/photo-1561839561-b13bcfe95249?q=80&w=800&auto=format&fit=crop',
    price: '$8,500',
    category: 'Sculptures'
  },
  {
    id: '4',
    title: 'Nature\'s Whisper',
    artist: 'Sarah Johnson',
    image: 'https://images.unsplash.com/photo-1561839561-b13bcfe95249?q=80&w=800&auto=format&fit=crop',
    price: '$11,200',
    category: 'Sculptures'
  },
  {
    id: '5',
    title: 'Digital Dreams',
    artist: 'Alex Rivera',
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=800&auto=format&fit=crop',
    price: '$5,000',
    category: 'Digital Art'
  },
  {
    id: '6',
    title: 'Abstract Emotions',
    artist: 'David Kim',
    image: 'https://images.unsplash.com/photo-1549887534-1541e9326642?q=80&w=800&auto=format&fit=crop',
    price: '$9,500',
    category: 'Paintings'
  }
];

const mockArtists = [
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
  {
    id: '5',
    name: 'David Kim',
    specialty: 'Paintings',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=800&auto=format&fit=crop',
  }
];

export default function SearchScreen() {
  const { query } = useLocalSearchParams<{ query: string }>();
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState(query || '');
  const [activeTab, setActiveTab] = useState<'all' | 'artworks' | 'artists'>('all');
  
  const [artworkResults, setArtworkResults] = useState<any[]>([]);
  const [artistResults, setArtistResults] = useState<any[]>([]);
  
  useEffect(() => {
    if (searchQuery) {
      // Filter artworks
      const filteredArtworks = mockArtworks.filter(artwork => 
        artwork.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        artwork.artist.toLowerCase().includes(searchQuery.toLowerCase()) ||
        artwork.category.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setArtworkResults(filteredArtworks);
      
      // Filter artists
      const filteredArtists = mockArtists.filter(artist => 
        artist.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        artist.specialty.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setArtistResults(filteredArtists);
    } else {
      setArtworkResults([]);
      setArtistResults([]);
    }
  }, [searchQuery]);
  
  const handleSearch = (text: string) => {
    setSearchQuery(text);
  };
  
  const renderArtworkItem = ({ item }: { item: any }) => (
    <Pressable 
      style={styles.artworkCard}
      onPress={() => router.push({
        pathname: "/artwork/[id]" as const,
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
  
  const renderArtistItem = ({ item }: { item: any }) => (
    <Pressable 
      style={styles.artistCard}
      onPress={() => router.push({
        pathname: "/artists/[id]" as const,
        params: { id: item.id }
      })}
    >
      <Image source={{ uri: item.image }} style={styles.artistImage} />
      <View style={styles.artistInfo}>
        <Text style={styles.artistName}>{item.name}</Text>
        <Text style={styles.artistSpecialty}>{item.specialty}</Text>
      </View>
    </Pressable>
  );
  
  const renderEmptyState = () => (
    <View style={styles.emptyState}>
      <Ionicons name="search-outline" size={48} color="#9CA3AF" />
      <Text style={styles.emptyStateText}>No results found for "{searchQuery}"</Text>
      <Text style={styles.emptyStateSubtext}>Try different keywords or browse categories</Text>
    </View>
  );
  
  return (
    <View style={styles.container}>
      {/* Search Header */}
      <View style={styles.searchHeader}>
        <View style={styles.searchBar}>
          <Ionicons name="search" size={20} color="#6B7280" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search artworks, artists..."
            placeholderTextColor="#9CA3AF"
            value={searchQuery}
            onChangeText={handleSearch}
            autoFocus
          />
          {searchQuery.length > 0 && (
            <Pressable onPress={() => setSearchQuery('')}>
              <Ionicons name="close-circle" size={20} color="#6B7280" />
            </Pressable>
          )}
        </View>
      </View>
      
      {/* Tabs */}
      <View style={styles.tabsContainer}>
        <Pressable 
          style={[styles.tab, activeTab === 'all' && styles.activeTab]}
          onPress={() => setActiveTab('all')}
        >
          <Text style={[styles.tabText, activeTab === 'all' && styles.activeTabText]}>All</Text>
        </Pressable>
        <Pressable 
          style={[styles.tab, activeTab === 'artworks' && styles.activeTab]}
          onPress={() => setActiveTab('artworks')}
        >
          <Text style={[styles.tabText, activeTab === 'artworks' && styles.activeTabText]}>Artworks</Text>
        </Pressable>
        <Pressable 
          style={[styles.tab, activeTab === 'artists' && styles.activeTab]}
          onPress={() => setActiveTab('artists')}
        >
          <Text style={[styles.tabText, activeTab === 'artists' && styles.activeTabText]}>Artists</Text>
        </Pressable>
      </View>
      
      {/* Results */}
      {searchQuery ? (
        <>
          {activeTab === 'all' && (
            <>
              {artworkResults.length > 0 && (
                <View style={styles.section}>
                  <Text style={styles.sectionTitle}>Artworks</Text>
                  <FlatList
                    data={artworkResults}
                    renderItem={renderArtworkItem}
                    keyExtractor={item => item.id}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={styles.artworksList}
                  />
                </View>
              )}
              
              {artistResults.length > 0 && (
                <View style={styles.section}>
                  <Text style={styles.sectionTitle}>Artists</Text>
                  <FlatList
                    data={artistResults}
                    renderItem={renderArtistItem}
                    keyExtractor={item => item.id}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={styles.artistsList}
                  />
                </View>
              )}
              
              {artworkResults.length === 0 && artistResults.length === 0 && renderEmptyState()}
            </>
          )}
          
          {activeTab === 'artworks' && (
            <>
              {artworkResults.length > 0 ? (
                <FlatList
                  data={artworkResults}
                  renderItem={renderArtworkItem}
                  keyExtractor={item => item.id}
                  numColumns={2}
                  contentContainerStyle={styles.artworksGrid}
                />
              ) : renderEmptyState()}
            </>
          )}
          
          {activeTab === 'artists' && (
            <>
              {artistResults.length > 0 ? (
                <FlatList
                  data={artistResults}
                  renderItem={renderArtistItem}
                  keyExtractor={item => item.id}
                  numColumns={2}
                  contentContainerStyle={styles.artistsGrid}
                />
              ) : renderEmptyState()}
            </>
          )}
        </>
      ) : (
        <View style={styles.emptyState}>
          <Ionicons name="search-outline" size={48} color="#9CA3AF" />
          <Text style={styles.emptyStateText}>Search for artworks and artists</Text>
          <Text style={styles.emptyStateSubtext}>Enter keywords to find what you're looking for</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  searchHeader: {
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
    fontSize: 16,
    color: '#1F2937',
  },
  tabsContainer: {
    flexDirection: 'row',
    padding: 16,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  tab: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginRight: 8,
    borderRadius: 20,
    backgroundColor: '#F3F4F6',
  },
  activeTab: {
    backgroundColor: '#7C3AED',
  },
  tabText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#4B5563',
  },
  activeTabText: {
    color: '#ffffff',
  },
  section: {
    padding: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
    color: '#1F2937',
  },
  artworksList: {
    paddingRight: 16,
  },
  artistsList: {
    paddingRight: 16,
  },
  artworksGrid: {
    padding: 16,
  },
  artistsGrid: {
    padding: 16,
  },
  artworkCard: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    marginBottom: 16,
    width: '48%',
    marginHorizontal: '1%',
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
  artistCard: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    marginBottom: 16,
    width: '48%',
    marginHorizontal: '1%',
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
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 32,
  },
  emptyStateText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1F2937',
    marginTop: 16,
    textAlign: 'center',
  },
  emptyStateSubtext: {
    fontSize: 14,
    color: '#6B7280',
    marginTop: 8,
    textAlign: 'center',
  },
}); 