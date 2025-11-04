import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Image, Alert } from 'react-native';
import { Star, MapPin, Heart } from 'phosphor-react-native';
import { Activity } from '../../types/api';
import { useFavorites } from '../../contexts/FavoritesContext';

interface FavoriteActivitiesProps {
  onActivityPress: (activity: Activity) => void;
  onSeeAllPress: () => void;
}

const FavoriteActivities: React.FC<FavoriteActivitiesProps> = ({ 
  onActivityPress, 
  onSeeAllPress 
}) => {
  const { favorites, isLoading, removeFromFavorites } = useFavorites();

  const handleRemoveFavorite = async (activityId: string, event: any) => {
    event.stopPropagation();
    await removeFromFavorites(activityId);
  };

  const handleActivityPress = (activity: Activity) => {
    onActivityPress(activity);
  };

  if (isLoading) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Избранное</Text>
        <View style={styles.loadingContainer}>
          <Text>Загружаем избранное...</Text>
        </View>
      </View>
    );
  }

  if (favorites.length === 0) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Избранное</Text>
        <View style={styles.emptyState}>
          <Text style={styles.emptyIcon}>❤️</Text>
          <Text style={styles.emptyTitle}>Пока нет избранного</Text>
          <Text style={styles.emptyDescription}>
            Добавляйте занятия в избранное, чтобы быстро находить их позже
          </Text>
          <TouchableOpacity style={styles.emptyAction} onPress={onSeeAllPress}>
            <Text style={styles.emptyActionText}>Найти занятия</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Избранное</Text>
        <TouchableOpacity onPress={onSeeAllPress}>
          <Text style={styles.seeAll}>Все</Text>
        </TouchableOpacity>
      </View>
      
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.activitiesContainer}
      >
        {favorites.map((activity) => (
          <TouchableOpacity
            key={activity.id}
            style={styles.activityCard}
            onPress={() => handleActivityPress(activity)}
          >
            <TouchableOpacity 
              style={styles.favoriteButton}
              onPress={(event) => handleRemoveFavorite(activity.id, event)}
            >
              <Heart size={20} color="#FF3B30" weight="fill" />
            </TouchableOpacity>

            <Image source={{ uri: activity.images[0] }} style={styles.activityImage} />
            <View style={styles.activityInfo}>
              <Text style={styles.activityName} numberOfLines={2}>
                {activity.name}
              </Text>
              <View style={styles.ratingContainer}>
                <Star size={12} color="#FFD700" weight="fill" />
                <Text style={styles.rating}>{activity.rating}</Text>
              </View>
              <View style={styles.locationContainer}>
                <MapPin size={10} color="#8E8E93" />
                <Text style={styles.location} numberOfLines={1}>
                  {activity.location.address}
                </Text>
              </View>
              <Text style={styles.price}>{activity.price} ₽/мес</Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 8,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 12,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: '#000000',
  },
  seeAll: {
    fontSize: 16,
    fontWeight: '500',
    color: '#007AFF',
  },
  activitiesContainer: {
    paddingHorizontal: 20,
    paddingRight: 10,
  },
  activityCard: {
    width: 160,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    marginRight: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
    position: 'relative',
  },
  favoriteButton: {
    position: 'absolute',
    top: 8,
    right: 8,
    zIndex: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 16,
    padding: 6,
  },
  activityImage: {
    width: '100%',
    height: 100,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  activityInfo: {
    padding: 12,
  },
  activityName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#000000',
    marginBottom: 6,
    lineHeight: 16,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  rating: {
    fontSize: 12,
    fontWeight: '500',
    color: '#000000',
    marginLeft: 4,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  location: {
    fontSize: 10,
    color: '#8E8E93',
    marginLeft: 4,
    flex: 1,
  },
  price: {
    fontSize: 14,
    fontWeight: '600',
    color: '#007AFF',
  },
  loadingContainer: {
    padding: 40,
    alignItems: 'center',
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 40,
  },
  emptyIcon: {
    fontSize: 48,
    marginBottom: 16,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000000',
    marginBottom: 8,
    textAlign: 'center',
  },
  emptyDescription: {
    fontSize: 14,
    color: '#666666',
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 24,
  },
  emptyAction: {
    backgroundColor: '#000000',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  emptyActionText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
});

export default FavoriteActivities;