import { View, Text, StyleSheet, ScrollView, Image, Pressable } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useState } from 'react';

interface Artist {
  id: string;
  name: string;
  specialty: string;
  followers: number;
  image: string;
  bio: string;
  artworks: {
    id: string;
    title: string;
    image: string;
    price: string;
  }[];
}

const artistDetails: Record<string, Artist> = {
  '1': {
    id: '1',
    name: 'Elena Rodriguez',
    specialty: 'Sculptures',
    followers: 12400,
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=800&auto=format&fit=crop',
    bio: 'Elena Rodriguez is a contemporary sculptor known for her innovative use of bronze and mixed media. With over 15 years of experience, she has exhibited her work in galleries across Europe and North America. Her sculptures often explore themes of human emotion and nature.',
    artworks: [
      {
        id: '1',
        title: 'Bronze Harmony',
        image: 'https://images.unsplash.com/photo-1561839561-b13bcfe95249?q=80&w=800&auto=format&fit=crop',
        price: '$12,500'
      },
      {
        id: '2',
        title: 'Eternal Flow',
        image: 'https://images.unsplash.com/photo-1561839561-b13bcfe95249?q=80&w=800&auto=format&fit=crop',
        price: '$9,800'
      }
    ]
  },
  '2': {
    id: '2',
    name: 'Michael Chen',
    specialty: 'Sculptures',
    followers: 8900,
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=800&auto=format&fit=crop',
    bio: 'Michael Chen is a rising star in the contemporary sculpture scene. His work combines traditional techniques with modern materials, creating pieces that challenge conventional notions of form and space.',
    artworks: [
      {
        id: '3',
        title: 'Urban Reflection',
        image: 'https://images.unsplash.com/photo-1561839561-b13bcfe95249?q=80&w=800&auto=format&fit=crop',
        price: '$8,500'
      }
    ]
  },
  '3': {
    id: '3',
    name: 'Sarah Johnson',
    specialty: 'Sculptures',
    followers: 15600,
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=800&auto=format&fit=crop',
    bio: 'Sarah Johnson\'s sculptures are characterized by their organic forms and intricate details. Her work has been featured in numerous international exhibitions and has won several prestigious awards.',
    artworks: [
      {
        id: '4',
        title: 'Nature\'s Whisper',
        image: 'https://images.unsplash.com/photo-1561839561-b13bcfe95249?q=80&w=800&auto=format&fit=crop',
        price: '$11,200'
      }
    ]
  },
  '4': {
    id: '4',
    name: 'Alex Rivera',
    specialty: 'Digital Art',
    followers: 21300,
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=800&auto=format&fit=crop',
    bio: 'Alex Rivera is a pioneer in digital art, pushing the boundaries of technology and creativity. Their work explores the intersection of art and digital media, creating immersive experiences that challenge traditional artistic conventions.',
    artworks: [
      {
        id: '5',
        title: 'Digital Dreams',
        image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=800&auto=format&fit=crop',
        price: '$5,000'
      }
    ]
  }
};

export default function ArtistDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const artist = artistDetails[id];
  const [isFollowing, setIsFollowing] = useState(false);

  if (!artist) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Artist not found</Text>
      </View>
    );
  }

  const handleFollow = () => {
    setIsFollowing(!isFollowing);
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Artist Header */}
      <View style={styles.header}>
        <Image source={{ uri: artist.image }} style={styles.artistImage} />
        <LinearGradient
          colors={['transparent', 'rgba(0,0,0,0.8)']}
          style={styles.headerGradient}
        />
        <View style={styles.headerContent}>
          <Text style={styles.artistName}>{artist.name}</Text>
          <Text style={styles.artistSpecialty}>{artist.specialty}</Text>
          <View style={styles.statsContainer}>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{artist.followers.toLocaleString()}</Text>
              <Text style={styles.statLabel}>Followers</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{artist.artworks.length}</Text>
              <Text style={styles.statLabel}>Artworks</Text>
            </View>
          </View>
        </View>
      </View>

      {/* Action Buttons */}
      <View style={styles.actionButtonsContainer}>
        <Pressable 
          style={[
            styles.actionButton, 
            isFollowing ? styles.followingButton : styles.followButton
          ]}
          onPress={handleFollow}
        >
          <Ionicons 
            name={isFollowing ? "checkmark" : "add"} 
            size={20} 
            color="#ffffff" 
            style={styles.buttonIcon} 
          />
          <Text style={styles.actionButtonText}>
            {isFollowing ? "Following" : "Follow"}
          </Text>
        </Pressable>
        
        <Pressable style={styles.actionButton}>
          <Ionicons name="share-social-outline" size={20} color="#ffffff" style={styles.buttonIcon} />
          <Text style={styles.actionButtonText}>Share</Text>
        </Pressable>
      </View>

      {/* Artist Bio */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>About</Text>
        <Text style={styles.bioText}>{artist.bio}</Text>
      </View>

      {/* Artist's Artworks */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Artworks</Text>
        <View style={styles.artworksGrid}>
          {artist.artworks.map((artwork) => (
            <Pressable
              key={artwork.id}
              style={styles.artworkCard}
              onPress={() => router.push({
                pathname: "/artwork/[id]" as const,
                params: { id: artwork.id }
              })}
            >
              <Image source={{ uri: artwork.image }} style={styles.artworkImage} />
              <View style={styles.artworkInfo}>
                <Text style={styles.artworkTitle}>{artwork.title}</Text>
                <Text style={styles.artworkPrice}>{artwork.price}</Text>
              </View>
            </Pressable>
          ))}
        </View>
      </View>

      {/* Contact Button */}
      <View style={styles.section}>
        <Pressable style={styles.contactButton}>
          <Ionicons name="mail-outline" size={20} color="#ffffff" style={styles.buttonIcon} />
          <Text style={styles.contactButtonText}>Contact Artist</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  header: {
    height: 400,
    position: 'relative',
  },
  artistImage: {
    width: '100%',
    height: '100%',
  },
  headerGradient: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '70%',
  },
  headerContent: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 20,
  },
  artistName: {
    color: '#ffffff',
    fontSize: 32,
    fontWeight: 'bold',
  },
  artistSpecialty: {
    color: '#ffffff',
    fontSize: 18,
    marginTop: 4,
    opacity: 0.9,
  },
  statsContainer: {
    flexDirection: 'row',
    marginTop: 16,
  },
  statItem: {
    marginRight: 24,
  },
  statValue: {
    color: '#ffffff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  statLabel: {
    color: '#ffffff',
    fontSize: 14,
    opacity: 0.8,
  },
  actionButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 20,
    marginTop: -20,
    zIndex: 10,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
    flex: 1,
    marginHorizontal: 6,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 5,
  },
  followButton: {
    backgroundColor: '#7C3AED',
  },
  followingButton: {
    backgroundColor: '#10B981',
  },
  actionButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
  section: {
    padding: 20,
    backgroundColor: '#ffffff',
    marginBottom: 12,
    borderRadius: 12,
    marginHorizontal: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#1F2937',
  },
  bioText: {
    fontSize: 16,
    lineHeight: 24,
    color: '#4B5563',
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
  artworkPrice: {
    fontSize: 16,
    fontWeight: '600',
    color: '#7C3AED',
    marginTop: 8,
  },
  contactButton: {
    backgroundColor: '#7C3AED',
    paddingHorizontal: 24,
    paddingVertical: 16,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
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
  contactButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
  buttonIcon: {
    marginRight: 8,
  },
  errorText: {
    fontSize: 18,
    color: '#EF4444',
    textAlign: 'center',
    marginTop: 20,
  },
}); 