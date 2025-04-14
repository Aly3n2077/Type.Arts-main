import { View, Text, StyleSheet, FlatList, Image, Pressable } from 'react-native';

const artists = [
  {
    id: '1',
    name: 'Elena Rodriguez',
    specialty: 'Bronze Sculptures',
    followers: '12.5K',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=800&auto=format&fit=crop',
  },
  {
    id: '2',
    name: 'Michael Chen',
    specialty: 'Marble Sculptures',
    followers: '8.9K',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=800&auto=format&fit=crop',
  },
  {
    id: '3',
    name: 'Sarah Johnson',
    specialty: 'Metal Sculptures',
    followers: '15K',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=800&auto=format&fit=crop',
  },
];

export default function ArtistsScreen() {
  const renderItem = ({ item }) => (
    <Pressable style={styles.artistCard}>
      <Image source={{ uri: item.image }} style={styles.artistImage} />
      <View style={styles.artistInfo}>
        <Text style={styles.artistName}>{item.name}</Text>
        <Text style={styles.artistSpecialty}>{item.specialty}</Text>
        <Text style={styles.artistFollowers}>{item.followers} followers</Text>
      </View>
      <Pressable style={styles.followButton}>
        <Text style={styles.followButtonText}>Follow</Text>
      </Pressable>
    </Pressable>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={artists}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
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
  listContainer: {
    padding: 16,
  },
  artistCard: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  artistImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  artistInfo: {
    flex: 1,
    marginLeft: 16,
  },
  artistName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1F2937',
  },
  artistSpecialty: {
    fontSize: 14,
    color: '#6B7280',
    marginTop: 2,
  },
  artistFollowers: {
    fontSize: 14,
    color: '#7C3AED',
    marginTop: 4,
  },
  followButton: {
    backgroundColor: '#7C3AED',
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 20,
  },
  followButtonText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '600',
  },
});