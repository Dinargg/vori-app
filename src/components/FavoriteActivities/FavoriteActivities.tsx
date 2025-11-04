import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Image } from 'react-native';
import { Star, MapPin } from 'phosphor-react-native';

interface Activity {
  id: string;
  name: string;
  type: string;
  rating: number;
  price: string;
  image: string;
  location: string;
}

interface FavoriteActivitiesProps {
  activities: Activity[];
  onActivityPress: (activity: Activity) => void;
  onSeeAllPress: () => void;
}

const FavoriteActivities: React.FC<FavoriteActivitiesProps> = ({ 
  activities, 
  onActivityPress, 
  onSeeAllPress 
}) => {
  if (activities.length === 0) {
    return (
      <View style={styles.emptyState}>
        <Star size={48} color="#E5E5EA" weight="light" />
        <Text style={styles.emptyTitle}>Пока нет избранного</Text>
        <Text style={styles.emptyText}>
          Добавляйте занятия в избранное,{'\n'}чтобы быстро находить их позже
        </Text>
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
        {activities.map((activity) => (
          <TouchableOpacity
            key={activity.id}
            style={styles.activityCard}
            onPress={() => onActivityPress(activity)}
          >
            <Image source={{ uri: activity.image }} style={styles.activityImage} />
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
                  {activity.location}
                </Text>
              </View>
              <Text style={styles.price}>{activity.price}</Text>
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
  emptyState: {
    alignItems: 'center',
    paddingVertical: 40,
    paddingHorizontal: 20,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000000',
    marginTop: 16,
    marginBottom: 8,
  },
  emptyText: {
    fontSize: 14,
    color: '#8E8E93',
    textAlign: 'center',
    lineHeight: 18,
  },
});

export default FavoriteActivities;