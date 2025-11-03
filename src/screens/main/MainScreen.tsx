// src/screens/main/MainScreen.tsx - С ШРИФТАМИ SF PRO DISPLAY
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { 
  MagnifyingGlass, 
  Bell, 
  MapPin, 
  Heart, 
  Star
} from 'phosphor-react-native';
import BannerCarousel from '../../components/BannerCarousel';

const { width } = Dimensions.get('window');

const MainScreen: React.FC = () => {
  return (
    <SafeAreaView style={styles.container}>
      {/* Шапка с локацией и действиями */}
      <View style={styles.header}>
        <View style={styles.locationContainer}>
          <MapPin size={20} color="#007AFF" />
          <Text style={styles.locationText}>Москва</Text>
        </View>
        
        <View style={styles.headerActions}>
          <TouchableOpacity style={styles.iconButton}>
            <Heart size={24} color="#333" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton}>
            <Bell size={24} color="#333" />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView 
        style={styles.scrollView} 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Приветствие */}
        <View style={styles.welcomeSection}>
          <Text style={styles.welcomeTitle}>Найдите занятия для ребенка</Text>
          <Text style={styles.welcomeSubtitle}>Секции, кружки и курсы рядом с вами</Text>
        </View>

        {/* Поиск */}
        <TouchableOpacity style={styles.searchContainer}>
          <View style={styles.searchInput}>
            <MagnifyingGlass size={20} color="#8E8E93" />
            <Text style={styles.searchPlaceholder}>Поиск секций, кружков, курсов...</Text>
          </View>
        </TouchableOpacity>

        {/* Карусель баннеров */}
        <BannerCarousel />

        {/* Категории занятий */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Категории</Text>
          <View style={styles.categoriesGrid}>
            <TouchableOpacity style={styles.categoryItem}>
              <View style={styles.categoryIcon}>
                <Text style={styles.emoji}>⚽</Text>
              </View>
              <Text style={styles.categoryText}>Спорт</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.categoryItem}>
              <View style={styles.categoryIcon}>
                <Text style={styles.emoji}>🎨</Text>
              </View>
              <Text style={styles.categoryText}>Творчество</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.categoryItem}>
              <View style={styles.categoryIcon}>
                <Text style={styles.emoji}>🔬</Text>
              </View>
              <Text style={styles.categoryText}>Наука</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.categoryItem}>
              <View style={styles.categoryIcon}>
                <Text style={styles.emoji}>💃</Text>
              </View>
              <Text style={styles.categoryText}>Танцы</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.categoryItem}>
              <View style={styles.categoryIcon}>
                <Text style={styles.emoji}>🎭</Text>
              </View>
              <Text style={styles.categoryText}>Театр</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.categoryItem}>
              <View style={styles.categoryIcon}>
                <Text style={styles.emoji}>🎵</Text>
              </View>
              <Text style={styles.categoryText}>Музыка</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.categoryItem}>
              <View style={styles.categoryIcon}>
                <Text style={styles.emoji}>♟️</Text>
              </View>
              <Text style={styles.categoryText}>Шахматы</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.categoryItem}>
              <View style={styles.categoryIcon}>
                <Text style={styles.emoji}>🗣️</Text>
              </View>
              <Text style={styles.categoryText}>Языки</Text>
            </TouchableOpacity>
          </View>
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
                    <Star size={16} color="#FFD700" weight="fill" />
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
                    <Star size={16} color="#FFD700" weight="fill" />
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
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  locationText: {
    fontFamily: 'SanFranciscoDisplay-Medium',
    marginLeft: 5,
    fontSize: 16,
    color: '#007AFF',
  },
  headerActions: {
    flexDirection: 'row',
  },
  iconButton: {
    marginLeft: 15,
    padding: 5,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 30,
  },
  welcomeSection: {
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  welcomeTitle: {
    fontFamily: 'SanFranciscoDisplay-Bold',
    fontSize: 28,
    color: '#000000',
    marginBottom: 5,
  },
  welcomeSubtitle: {
    fontFamily: 'SanFranciscoDisplay-Regular',
    fontSize: 16,
    color: '#8E8E93',
  },
  searchContainer: {
    paddingHorizontal: 20,
    marginBottom: 10,
  },
  searchInput: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F2F2F7',
    paddingHorizontal: 15,
    paddingVertical: 12,
    borderRadius: 12,
  },
  searchPlaceholder: {
    fontFamily: 'SanFranciscoDisplay-Regular',
    marginLeft: 10,
    fontSize: 16,
    color: '#8E8E93',
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
  categoriesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
  },
  categoryItem: {
    alignItems: 'center',
    width: (width - 60) / 4,
    marginBottom: 20,
  },
  categoryIcon: {
    width: 64,
    height: 64,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
    backgroundColor: '#F8F8F8',
  },
  emoji: {
    fontSize: 28,
  },
  categoryText: {
    fontFamily: 'SanFranciscoDisplay-Medium',
    fontSize: 13,
    textAlign: 'center',
    color: '#000000',
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