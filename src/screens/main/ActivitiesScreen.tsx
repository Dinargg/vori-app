// src/screens/main/ActivitiesScreen.tsx - ПОЛНЫЙ ОБНОВЛЕННЫЙ КОД
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  TextInput,
  FlatList,
  Image,
  Alert,
  StatusBar,
} from 'react-native';

const ActivitiesScreen = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);

  // Фильтры
  const filters = [
    { id: 'sport', name: 'Спорт' },
    { id: 'art', name: 'Творчество' },
    { id: 'science', name: 'Наука' },
    { id: 'music', name: 'Музыка' },
    { id: 'dance', name: 'Танцы' },
    { id: 'languages', name: 'Языки' },
  ];

  // Пример данных занятий
  const activities = [
    {
      id: '1',
      name: 'Футбольная тренировка',
      type: 'Спорт',
      age: '5-12 лет',
      price: '800 ₽',
      duration: '1.5 часа',
      location: 'м. Спортивная',
      rating: 4.8,
      image: 'https://via.placeholder.com/300x200/4A90E2/FFFFFF?text=Футбол',
    },
    {
      id: '2',
      name: 'Художественная студия',
      type: 'Творчество',
      age: '4-10 лет',
      price: '600 ₽',
      duration: '1 час',
      location: 'м. Искусств',
      rating: 4.6,
      image: 'https://via.placeholder.com/300x200/9C27B0/FFFFFF?text=Рисование',
    },
    {
      id: '3',
      name: 'Программирование для детей',
      type: 'Наука',
      age: '8-14 лет',
      price: '1000 ₽',
      duration: '2 часа',
      location: 'м. Технопарк',
      rating: 4.9,
      image: 'https://via.placeholder.com/300x200/00BCD4/FFFFFF?text=Программирование',
    },
    {
      id: '4',
      name: 'Бальные танцы',
      type: 'Танцы',
      age: '6-15 лет',
      price: '700 ₽',
      duration: '1.5 часа',
      location: 'м. Танцевальная',
      rating: 4.7,
      image: 'https://via.placeholder.com/300x200/E91E63/FFFFFF?text=Танцы',
    },
  ];

  const toggleFilter = (filterId: string) => {
    setSelectedFilters(prev =>
      prev.includes(filterId)
        ? prev.filter(id => id !== filterId)
        : [...prev, filterId]
    );
  };

  const handleActivityPress = (activity: any) => {
    Alert.alert('Занятие', `${activity.name}\n\nДетальная страница в разработке`);
  };

  const handleBookPress = (activity: any) => {
    Alert.alert('Запись', `Запись на "${activity.name}"\n\nФункция в разработке`);
  };

  const filteredActivities = activities.filter(activity => {
    const matchesSearch = activity.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         activity.type.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = selectedFilters.length === 0 || selectedFilters.includes(activity.type.toLowerCase());
    return matchesSearch && matchesFilter;
  });

  const renderActivity = ({ item }: { item: any }) => (
    <TouchableOpacity style={styles.activityCard} onPress={() => handleActivityPress(item)}>
      <Image source={{ uri: item.image }} style={styles.activityImage} />
      <View style={styles.activityInfo}>
        <Text style={styles.activityName} numberOfLines={2}>{item.name}</Text>
        <View style={styles.activityMeta}>
          <Text style={styles.activityType}>{item.type}</Text>
          <Text style={styles.activityAge}>{item.age}</Text>
        </View>
        <View style={styles.activityDetails}>
          <Text style={styles.activityLocation}>{item.location}</Text>
          <Text style={styles.activityDuration}>{item.duration}</Text>
        </View>
        <View style={styles.activityFooter}>
          <View style={styles.rating}>
            <Text style={styles.ratingText}>★ {item.rating}</Text>
          </View>
          <Text style={styles.price}>{item.price}</Text>
        </View>
        <TouchableOpacity 
          style={styles.bookButton} 
          onPress={() => handleBookPress(item)}
        >
          <Text style={styles.bookButtonText}>Записаться</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      
      {/* УПРОЩЕННЫЙ Header - убраны кнопки навигации */}
      <View style={styles.header}>
        <Text style={styles.title}>Поиск занятий</Text>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        
        {/* Поиск */}
        <View style={styles.searchSection}>
          <TextInput
            style={styles.searchInput}
            placeholder="Поиск занятий, видов спорта, школ..."
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>

        {/* Фильтры */}
        <View style={styles.filtersSection}>
          <Text style={styles.sectionTitle}>Категории</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filtersScroll}>
            {filters.map(filter => (
              <TouchableOpacity
                key={filter.id}
                style={[
                  styles.filterButton,
                  selectedFilters.includes(filter.id) && styles.filterButtonActive
                ]}
                onPress={() => toggleFilter(filter.id)}
              >
                <Text style={[
                  styles.filterText,
                  selectedFilters.includes(filter.id) && styles.filterTextActive
                ]}>
                  {filter.name}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Результаты */}
        <View style={styles.resultsSection}>
          <Text style={styles.sectionTitle}>
            Найдено {filteredActivities.length} занятий
          </Text>
          <FlatList
            data={filteredActivities}
            renderItem={renderActivity}
            keyExtractor={item => item.id}
            scrollEnabled={false}
            showsVerticalScrollIndicator={false}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000000',
  },
  content: {
    flex: 1,
  },
  searchSection: {
    padding: 20,
  },
  searchInput: {
    backgroundColor: '#F8F8F8',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    padding: 16,
    fontSize: 16,
    borderRadius: 12,
  },
  filtersSection: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000000',
    marginBottom: 12,
  },
  filtersScroll: {
    marginHorizontal: -20,
    paddingHorizontal: 20,
  },
  filterButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: '#F8F8F8',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    marginRight: 8,
    borderRadius: 20,
  },
  filterButtonActive: {
    backgroundColor: '#000000',
    borderColor: '#000000',
  },
  filterText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#000000',
  },
  filterTextActive: {
    color: '#FFFFFF',
  },
  resultsSection: {
    paddingHorizontal: 20,
  },
  activityCard: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    marginBottom: 16,
    borderRadius: 12,
    overflow: 'hidden',
  },
  activityImage: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
  },
  activityInfo: {
    padding: 16,
  },
  activityName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000000',
    marginBottom: 8,
  },
  activityMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  activityType: {
    fontSize: 14,
    color: '#666666',
  },
  activityAge: {
    fontSize: 14,
    color: '#666666',
  },
  activityDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  activityLocation: {
    fontSize: 14,
    color: '#666666',
  },
  activityDuration: {
    fontSize: 14,
    color: '#666666',
  },
  activityFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  rating: {
    backgroundColor: '#F8F8F8',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  ratingText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#000000',
  },
  price: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000000',
  },
  bookButton: {
    backgroundColor: '#000000',
    paddingVertical: 12,
    alignItems: 'center',
    borderRadius: 8,
  },
  bookButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
});

export default ActivitiesScreen;