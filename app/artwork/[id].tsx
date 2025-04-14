import { View, Text, StyleSheet, Image, ScrollView, Pressable } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

interface Artwork {
  id: string;
  title: string;
  artist: string;
  price: string;
  category: string;
  description: string;
  dimensions: string;
  year: string;
  image: string;
  artistBio: string;
}

// This would typically come from an API or database
const artworkDetails: Record<string, Artwork> = {
  '1': {
    id: '1',
    title: 'Bronze Harmony',
    artist: 'Elena Rodriguez',
    price: '$12,500',
    category: 'Sculptures',
    description: 'A stunning bronze sculpture that captures the essence of human emotion through abstract forms. Created in 2023, this piece represents the artist\'s exploration of balance and harmony in modern art.',
    dimensions: '120cm x 80cm x 60cm',
    year: '2023',
    image: 'https://images.unsplash.com/photo-1561839561-b13bcfe95249?q=80&w=800&auto=format&fit=crop',
    artistBio: 'Elena Rodriguez is a contemporary sculptor based in Madrid, Spain. With over 15 years of experience, her work has been exhibited in major galleries across Europe and North America.',
  },
  '2': {
    id: '2',
    title: 'Marble Dreams',
    artist: 'Michael Chen',
    price: '$8,900',
    category: 'Sculptures',
    description: 'An elegant marble sculpture that explores the relationship between form and space. The smooth surfaces and flowing lines create a sense of movement and grace.',
    dimensions: '90cm x 60cm x 45cm',
    year: '2023',
    image: 'https://images.unsplash.com/photo-1561214115-f2f134cc4912?q=80&w=800&auto=format&fit=crop',
    artistBio: 'Michael Chen is a renowned sculptor known for his innovative approach to traditional materials. His work has been featured in numerous international exhibitions.',
  },
  '3': {
    id: '3',
    title: 'Steel Waves',
    artist: 'Sarah Johnson',
    price: '$15,000',
    category: 'Sculptures',
    description: 'A dynamic steel sculpture that captures the energy and movement of ocean waves. The polished surfaces reflect light in unexpected ways, creating an ever-changing visual experience.',
    dimensions: '150cm x 100cm x 70cm',
    year: '2023',
    image: 'https://images.unsplash.com/photo-1554188248-986adbb73be4?q=80&w=800&auto=format&fit=crop',
    artistBio: 'Sarah Johnson is a contemporary sculptor specializing in large-scale public art installations. Her work can be found in cities around the world.',
  },
  '4': {
    id: '4',
    title: 'Digital Dreams',
    artist: 'Alex Rivera',
    price: '$5,000',
    category: 'Digital Art',
    description: 'A mesmerizing digital artwork that explores the intersection of technology and human consciousness. The piece uses advanced algorithms to create a constantly evolving visual experience.',
    dimensions: 'Digital file (4K resolution)',
    year: '2023',
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=800&auto=format&fit=crop',
    artistBio: 'Alex Rivera is a pioneer in the field of digital art, pushing the boundaries of what is possible with technology. Their work has been featured in major digital art festivals worldwide.',
  },
  '5': {
    id: '5',
    title: 'Virtual Reality',
    artist: 'Maya Patel',
    price: '$7,200',
    category: 'Digital Art',
    description: 'An immersive virtual reality experience that transports viewers to otherworldly landscapes. The piece combines cutting-edge technology with traditional artistic principles.',
    dimensions: 'VR experience (compatible with major VR platforms)',
    year: '2023',
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=800&auto=format&fit=crop',
    artistBio: 'Maya Patel is at the forefront of VR art, creating experiences that challenge our perception of reality. Her work has been exhibited in major tech and art festivals.',
  },
  '6': {
    id: '6',
    title: 'Abstract Emotions',
    artist: 'David Kim',
    price: '$9,500',
    category: 'Paintings',
    description: 'A vibrant abstract painting that captures the complexity of human emotions through color and form. The bold brushstrokes and rich palette create a powerful visual impact.',
    dimensions: '100cm x 120cm',
    year: '2023',
    image: 'https://images.unsplash.com/photo-1549887534-1541e9326642?q=80&w=800&auto=format&fit=crop',
    artistBio: 'David Kim is an abstract expressionist painter known for his emotional intensity and technical mastery. His work has been collected by major museums and private collectors.',
  },
  '7': {
    id: '7',
    title: 'Urban Landscape',
    artist: 'Sophie Turner',
    price: '$11,000',
    category: 'Paintings',
    description: 'A striking urban landscape that captures the energy and rhythm of city life. The painting combines realistic elements with abstract interpretations of urban spaces.',
    dimensions: '120cm x 90cm',
    year: '2023',
    image: 'https://images.unsplash.com/photo-1549887534-1541e9326642?q=80&w=800&auto=format&fit=crop',
    artistBio: 'Sophie Turner is known for her unique perspective on urban environments. Her paintings have been featured in galleries across Europe and North America.',
  },
  '8': {
    id: '8',
    title: 'Nature\'s Beauty',
    artist: 'James Wilson',
    price: '$3,800',
    category: 'Photography',
    description: 'A breathtaking photograph that captures the raw beauty of untouched wilderness. The composition and lighting create a sense of awe and wonder.',
    dimensions: '60cm x 90cm (printed on archival paper)',
    year: '2023',
    image: 'https://images.unsplash.com/photo-1501854140801-50d01698950b?q=80&w=800&auto=format&fit=crop',
    artistBio: 'James Wilson is a nature photographer who has traveled to some of the most remote places on Earth. His work has been published in major nature magazines and books.',
  },
  '9': {
    id: '9',
    title: 'City Lights',
    artist: 'Emma Davis',
    price: '$4,200',
    category: 'Photography',
    description: 'A stunning night photography piece that captures the vibrant energy of city lights. The long exposure technique creates mesmerizing light trails and patterns.',
    dimensions: '70cm x 100cm (printed on archival paper)',
    year: '2023',
    image: 'https://images.unsplash.com/photo-1501854140801-50d01698950b?q=80&w=800&auto=format&fit=crop',
    artistBio: 'Emma Davis specializes in urban night photography, capturing the unique beauty of cities after dark. Her work has been featured in major photography exhibitions.',
  },
  '10': {
    id: '10',
    title: 'Interactive Space',
    artist: 'Carlos Mendez',
    price: '$18,000',
    category: 'Installations',
    description: 'An immersive installation that responds to viewer movement and interaction. The piece combines sculpture, light, and sound to create a multi-sensory experience.',
    dimensions: 'Variable (site-specific installation)',
    year: '2023',
    image: 'https://images.unsplash.com/photo-1579546929518-9e396f3cc809?q=80&w=800&auto=format&fit=crop',
    artistBio: 'Carlos Mendez creates large-scale interactive installations that challenge our perception of space and reality. His work has been exhibited in major museums and art festivals.',
  },
  '11': {
    id: '11',
    title: 'Light and Shadow',
    artist: 'Nina Patel',
    price: '$22,000',
    category: 'Installations',
    description: 'A dramatic installation that explores the interplay of light and shadow. The piece creates ever-changing patterns and forms as viewers move around it.',
    dimensions: 'Variable (site-specific installation)',
    year: '2023',
    image: 'https://images.unsplash.com/photo-1579546929518-9e396f3cc809?q=80&w=800&auto=format&fit=crop',
    artistBio: 'Nina Patel is known for her innovative use of light and space in large-scale installations. Her work has been commissioned by major cultural institutions worldwide.',
  },
};

export default function ArtworkDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const artwork = artworkDetails[id];

  if (!artwork) {
    return (
      <View style={styles.container}>
        <Text>Artwork not found</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Pressable 
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Ionicons name="arrow-back" size={24} color="#ffffff" />
        </Pressable>
        <Pressable style={styles.shareButton}>
          <Ionicons name="share-outline" size={24} color="#ffffff" />
        </Pressable>
      </View>

      <Image source={{ uri: artwork.image }} style={styles.artworkImage} />
      
      <View style={styles.content}>
        <Text style={styles.title}>{artwork.title}</Text>
        <Text style={styles.artist}>{artwork.artist}</Text>
        <Text style={styles.price}>{artwork.price}</Text>

        <View style={styles.infoSection}>
          <Text style={styles.sectionTitle}>About the Artwork</Text>
          <Text style={styles.description}>{artwork.description}</Text>
        </View>

        <View style={styles.detailsGrid}>
          <View style={styles.detailItem}>
            <Text style={styles.detailLabel}>Category</Text>
            <Text style={styles.detailValue}>{artwork.category}</Text>
          </View>
          <View style={styles.detailItem}>
            <Text style={styles.detailLabel}>Dimensions</Text>
            <Text style={styles.detailValue}>{artwork.dimensions}</Text>
          </View>
          <View style={styles.detailItem}>
            <Text style={styles.detailLabel}>Year</Text>
            <Text style={styles.detailValue}>{artwork.year}</Text>
          </View>
        </View>

        <View style={styles.infoSection}>
          <Text style={styles.sectionTitle}>About the Artist</Text>
          <Text style={styles.description}>{artwork.artistBio}</Text>
        </View>

        <Pressable style={styles.contactButton}>
          <Text style={styles.contactButtonText}>Contact Artist</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
    zIndex: 1,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  shareButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  artworkImage: {
    width: '100%',
    height: 400,
  },
  content: {
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 4,
  },
  artist: {
    fontSize: 18,
    color: '#6B7280',
    marginBottom: 8,
  },
  price: {
    fontSize: 20,
    fontWeight: '600',
    color: '#7C3AED',
    marginBottom: 24,
  },
  infoSection: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 8,
  },
  description: {
    fontSize: 16,
    color: '#4B5563',
    lineHeight: 24,
  },
  detailsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 24,
  },
  detailItem: {
    width: '33.33%',
    marginBottom: 16,
  },
  detailLabel: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 4,
  },
  detailValue: {
    fontSize: 16,
    color: '#1F2937',
    fontWeight: '500',
  },
  contactButton: {
    backgroundColor: '#7C3AED',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 8,
  },
  contactButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
}); 