import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { Heart } from 'phosphor-react-native';
import { Activity } from '../../types/api';
import { useFavorites } from '../../contexts/FavoritesContext';

interface ActivityCardProps {
  activity: Activity;
  onPress: (activity: Activity) => void;
  onBookPress: (activity: Activity) => void;
}

const ActivityCard: React.FC<ActivityCardProps> = ({ activity, onPress, onBookPress }) => {
  const { isFavorite, addToFavorites, removeFromFavorites } = useFavorites();

  const handleFavoritePress = async (event: any) => {
    event.stopPropagation();
    if (isFavorite(activity.id)) {
      await removeFromFavorites(activity.id);
    } else {
      await addToFavorites(activity.id);
    }
  };

  return (
    <TouchableOpacity style={styles.card} onPress={() => onPress(activity)}>
      <Image source={{ uri: activity.images[0] }} style={styles.image} />
      
      <TouchableOpacity 
        style={styles.favoriteButton}
        onPress={handleFavoritePress}
      >
        <Heart 
          size={24} 
          color={isFavorite(activity.id) ? '#FF3B30' : '#C7C7CC'} 
          weight={isFavorite(activity.id) ? 'fill' : 'regular'} 
        />
      </TouchableOpacity>

      <View style={styles.content}>
        <Text style={styles.name} numberOfLines={2}>{activity.name}</Text>
        <Text style={styles.description} numberOfLines={2}>{activity.description}</Text>
        
        <View style={styles.details}>
          <Text style={styles.age}>{activity.age_range.min}-{activity.age_range.max} лет</Text>
          <Text style={styles.price}>{activity.price} ₽</Text>
        </View>
        
        <View style={styles.ratingContainer}>
          <Text style={styles.rating}>★ {activity.rating}</Text>
          <Text style={styles.reviews}>({activity.review_count})</Text>
        </View>
        
        <TouchableOpacity 
          style={styles.bookButton}
          onPress={(event) => {
            event.stopPropagation();
            onBookPress(activity);
          }}
        >
          <Text style={styles.bookButtonText}>Записаться</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
    position: 'relative',
  },
  image: {
    width: '100%',
    height: 200,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  favoriteButton: {
    position: 'absolute',
    top: 12,
    right: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 20,
    padding: 8,
  },
  content: {
    padding: 16,
  },
  name: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000000',
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    color: '#666666',
    marginBottom: 12,
    lineHeight: 18,
  },
  details: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  age: {
    fontSize: 14,
    color: '#666666',
  },
  price: {
    fontSize: 16,
    fontWeight: '600',
    color: '#007AFF',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  rating: {
    fontSize: 14,
    fontWeight: '600',
    color: '#000000',
  },
  reviews: {
    fontSize: 12,
    color: '#8E8E93',
    marginLeft: 4,
  },
  bookButton: {
    backgroundColor: '#000000',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  bookButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default ActivityCard;