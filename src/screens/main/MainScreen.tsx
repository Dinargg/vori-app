// src/screens/main/MainScreen.tsx - ПОЛНЫЙ КОД С РАБОЧИМ ПОИСКОМ
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  Dimensions,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { 
  MagnifyingGlass, 
  Bell, 
  MapPin, 
  Heart,
  Faders
} from 'phosphor-react-native';

// Новые компоненты
import CategoryGrid from '../../components/CategoryGrid/CategoryGrid';
import FavoriteActivities from '../../components/FavoriteActivities/FavoriteActivities';
import QuickSearch from '../../components/QuickSearch/QuickSearch';
import BannerCarousel from '../../components/BannerCarousel';

const { width } = Dimensions.get('window');

const MainScreen: React.FC = () => {
  const navigation = useNavigation();
  const [currentLocation, setCurrentLocation] = useState('Москва');

  // Mock данные для избранного
  const favoriteActivities = [
    {
      id: '1',
      name: 'Футбольная академия "Чемпион"',
      type: 'sport',
      rating: 4.8,
      price: '2 500 ₽/мес',
      image: 'https://via.placeholder.com/300x200/4A90E2/FFFFFF?text=Футбол',
      location: '5 мин от метро'
    },
    {
      id: '2',
      name: 'Художественная студия "Радуга"',
      type: 'art',
      rating: 4.6,
      price: '1 800 ₽/мес',
      image: 'https://via.placeholder.com/300x200/9C27B0/FFFFFF?text=Рисование',
      location: '10 мин от метро'
    },
    {
      id: '3',
      name: 'Программирование для детей',
      type: 'science',
      rating: 4.9,
      price: '3 200 ₽/мес',
      image: 'https://via.placeholder.com/300x200/00BCD4/FFFFFF?text=Программирование',
      location: '15 мин от метро'
    },
  ];

  // Обработчики событий
  const handleCategoryPress = (category: any) => {
    Alert.alert(
      'Категория',
      `Выбрана категория: ${category.name}`,
      [{ text: 'OK' }]
    );
  };

  const handleFavoritePress = (activity: any) => {
    Alert.alert(
      'Избранное',
      `Открыть "${activity.name}"?`,
      [
        { text: 'Отмена', style: 'cancel' },
        { text: 'Открыть', onPress: () => {
          // Навигация к детальной странице занятия
          Alert.alert('Успех', 'Переход к занятию (в разработке)');
        }}
      ]
    );
  };

  const handleSeeAllFavorites = () => {
    Alert.alert('Избранное', 'Открыть все избранные занятия (в разработке)');
  };

  const handleQuickFilterPress = (filter: any) => {
    switch (filter.type) {
      case 'location':
        Alert.alert('Локация', `Поиск занятий в ${currentLocation} (в разработке)`);
        break;
      case 'filter':
        Alert.alert('Фильтры', 'Открыть расширенные фильтры (в разработке)');
        break;
      case 'time':
        Alert.alert('Сегодня', 'Занятия на сегодня (в разработке)');
        break;
      case 'rating':
        Alert.alert('Топ', 'Лучшие занятия по рейтингу (в разработке)');
        break;
    }
  };

  // РАБОЧИЙ ПОИСК - ОТКРЫВАЕТ ЭКРАН ПОИСКА
  const handleSearchPress = () => {
    navigation.navigate('Search' as never);
  };

  const handleNotificationsPress = () => {
    Alert.alert('Уведомления', 'Открыть уведомления (в разработке)');
  };

  const handleLocationPress = () => {
    Alert.alert('Локация', 'Сменить город (в разработке)');
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Шапка с логотипом и действиями */}
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.locationContainer}
          onPress={handleLocationPress}
        >
          <MapPin size={20} color="#007AFF" />
          <Text style={styles.locationText}>{currentLocation}</Text>
        </TouchableOpacity>
        
        {/* Логотип приложения по центру - абсолютное позиционирование */}
        <View style={styles.logoContainer}>
          <Text style={styles.logoText}>VORI</Text>
        </View>
        
        <View style={styles.headerActions}>
          <TouchableOpacity style={styles.iconButton} onPress={handleNotificationsPress}>
            <Bell size={24} color="#333" />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView 
        style={styles.scrollView} 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Поиск - ТЕПЕРЬ РАБОЧАЯ КНОПКА */}
        <TouchableOpacity style={styles.searchContainer} onPress={handleSearchPress}>
          <View style={styles.searchInput}>
            <MagnifyingGlass size={20} color="#8E8E93" />
            <Text style={styles.searchPlaceholder}>Поиск секций, кружков, курсов...</Text>
            <Faders size={20} color="#8E8E93" />
          </View>
        </TouchableOpacity>

        {/* Быстрый поиск */}
        <QuickSearch 
          onFilterPress={handleQuickFilterPress}
          currentLocation={currentLocation}
        />

        {/* Карусель баннеров */}
        <BannerCarousel />

        {/* Избранное */}
        <FavoriteActivities 
          activities={favoriteActivities}
          onActivityPress={handleFavoritePress}
          onSeeAllPress={handleSeeAllFavorites}
        />

        {/* Категории занятий */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Категории</Text>
          <CategoryGrid onCategoryPress={handleCategoryPress} />
        </View>

        {/* Популярные секции */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Популярные секции</Text>
            <TouchableOpacity>
              <Text style={styles.seeAllText}>Все</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.coursesList}>
            <TouchableOpacity style={styles.courseCard}>
              <View style={styles.courseImage} />
              <View style={styles.courseInfo}>
                <Text style={styles.courseTitle}>Футбольная академия "Чемпион"</Text>
                <Text style={styles.courseDescription}>Для детей 6-12 лет • 2 раза в неделю</Text>
                <View style={styles.courseMeta}>
                  <View style={styles.ratingContainer}>
                    <Heart size={16} color="#FFD700" weight="fill" />
                    <Text style={styles.rating}>4.9</Text>
                    <Text style={styles.reviewsCount}>(124)</Text>
                  </View>
                  <Text style={styles.coursePrice}>2 500 ₽/мес</Text>
                </View>
                <View style={styles.locationBadge}>
                  <MapPin size={12} color="#8E8E93" />
                  <Text style={styles.locationBadgeText}>5 мин от метро</Text>
                </View>
              </View>
            </TouchableOpacity>

            <TouchableOpacity style={styles.courseCard}>
              <View style={styles.courseImage} />
              <View style={styles.courseInfo}>
                <Text style={styles.courseTitle}>Художественная студия "Радуга"</Text>
                <Text style={styles.courseDescription}>Рисование для детей 4-10 лет • 1 раз в неделю</Text>
                <View style={styles.courseMeta}>
                  <View style={styles.ratingContainer}>
                    <Heart size={16} color="#FFD700" weight="fill" />
                    <Text style={styles.rating}>4.8</Text>
                    <Text style={styles.reviewsCount}>(89)</Text>
                  </View>
                  <Text style={styles.coursePrice}>1 800 ₽/мес</Text>
                </View>
                <View style={styles.locationBadge}>
                  <MapPin size={12} color="#8E8E93" />
                  <Text style={styles.locationBadgeText}>10 мин от метро</Text>
                </View>
              </View>
            </TouchableOpacity>
          </View>
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#F2F2F7',
    position: 'relative', // Для абсолютного позиционирования логотипа
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    zIndex: 1, // Чтобы был поверх логотипа
  },
  locationText: {
    fontFamily: 'SanFranciscoDisplay-Medium',
    marginLeft: 5,
    fontSize: 16,
    color: '#007AFF',
  },
  logoContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
    pointerEvents: 'none', // Чтобы не блокировал клики на другие элементы
  },
  logoText: {
    fontFamily: 'SanFranciscoDisplay-Bold',
    fontSize: 20,
    color: '#000000',
    letterSpacing: 1,
  },
  headerActions: {
    flexDirection: 'row',
    zIndex: 1, // Чтобы был поверх логотипа
  },
  iconButton: {
    padding: 5,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 30,
  },
  searchContainer: {
    paddingHorizontal: 20,
    marginBottom: 10,
    marginTop: 10,
  },
  searchInput: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#F2F2F7',
    paddingHorizontal: 15,
    paddingVertical: 12,
    borderRadius: 12,
  },
  searchPlaceholder: {
    fontFamily: 'SanFranciscoDisplay-Regular',
    fontSize: 16,
    color: '#8E8E93',
    flex: 1,
    marginHorizontal: 10,
  },
  section: {
    marginTop: 25,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontFamily: 'SanFranciscoDisplay-Bold',
    fontSize: 22,
    color: '#000000',
  },
  seeAllText: {
    fontFamily: 'SanFranciscoDisplay-Medium',
    fontSize: 16,
    color: '#007AFF',
  },
  coursesList: {
    paddingHorizontal: 20,
  },
  courseCard: {
    flexDirection: 'row',
    backgroundColor: '#F8F8F8',
    borderRadius: 16,
    padding: 15,
    marginBottom: 12,
  },
  courseImage: {
    width: 80,
    height: 80,
    backgroundColor: '#E5E5E5',
    borderRadius: 12,
    marginRight: 15,
  },
  courseInfo: {
    flex: 1,
    justifyContent: 'center',
  },
  courseTitle: {
    fontFamily: 'SanFranciscoDisplay-Semibold',
    fontSize: 17,
    color: '#000000',
    marginBottom: 4,
  },
  courseDescription: {
    fontFamily: 'SanFranciscoDisplay-Regular',
    fontSize: 14,
    color: '#8E8E93',
    marginBottom: 8,
  },
  courseMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rating: {
    fontFamily: 'SanFranciscoDisplay-Medium',
    marginLeft: 4,
    fontSize: 14,
    color: '#000000',
  },
  reviewsCount: {
    fontFamily: 'SanFranciscoDisplay-Regular',
    marginLeft: 4,
    fontSize: 12,
    color: '#8E8E93',
  },
  coursePrice: {
    fontFamily: 'SanFranciscoDisplay-Semibold',
    fontSize: 16,
    color: '#007AFF',
  },
  locationBadge: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  locationBadgeText: {
    fontFamily: 'SanFranciscoDisplay-Regular',
    marginLeft: 4,
    fontSize: 12,
    color: '#8E8E93',
  },
});

export default MainScreen;