// src/screens/main/SearchScreen.tsx - С РАБОЧИМ СЛАЙДЕРОМ ЦЕНЫ
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
  FlatList,
  Image,
  Alert,
  StatusBar,
  Modal,
  ScrollView,
  PanResponder,
  Dimensions,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { ArrowLeft, MagnifyingGlass, Faders, X, Check } from 'phosphor-react-native';
import { Activity } from '../../types/api';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

const SearchScreen = () => {
  const navigation = useNavigation();
  const [searchQuery, setSearchQuery] = useState('');
  const [activities, setActivities] = useState<Activity[]>([]);
  const [filteredActivities, setFilteredActivities] = useState<Activity[]>([]);
  const [showFilters, setShowFilters] = useState(false);
  
  // Состояние фильтров
  const [filters, setFilters] = useState({
    categories: [] as string[],
    priceRange: { min: 0, max: 5000 },
    ageRange: { min: 3, max: 18 },
    rating: 0,
  });

  // Слайдер цены
  const [isSliding, setIsSliding] = useState(false);
  const sliderWidth = SCREEN_WIDTH - 80; // Ширина слайдера с отступами

  // PanResponder для слайдера
  const panResponder = React.useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {
        setIsSliding(true);
      },
      onPanResponderMove: (_, gestureState) => {
        const newX = Math.max(0, Math.min(gestureState.moveX - 40, sliderWidth));
        const newValue = Math.round((newX / sliderWidth) * 5000);
        setFilters(prev => ({
          ...prev,
          priceRange: { ...prev.priceRange, max: newValue }
        }));
      },
      onPanResponderRelease: () => {
        setIsSliding(false);
      },
    })
  ).current;

  // Доступные категории
  const categories = [
    { id: 'sport', name: 'Спорт' },
    { id: 'art', name: 'Творчество' },
    { id: 'science', name: 'Наука' },
    { id: 'music', name: 'Музыка' },
    { id: 'dance', name: 'Танцы' },
    { id: 'languages', name: 'Языки' },
  ];

  // Возрастные группы (логичные для детских занятий)
  const ageGroups = [
    { label: '3-5 лет', range: { min: 3, max: 5 } },
    { label: '6-8 лет', range: { min: 6, max: 8 } },
    { label: '9-12 лет', range: { min: 9, max: 12 } },
    { label: '13-15 лет', range: { min: 13, max: 15 } },
    { label: '16-18 лет', range: { min: 16, max: 18 } },
  ];

  // Mock данные занятий
  const mockActivities: Activity[] = [
    {
      id: '1',
      name: 'Футбольная тренировка',
      category: 'sport',
      description: 'Профессиональные тренировки для детей от опытных тренеров',
      age_range: { min: 5, max: 12 },
      price: 800,
      duration: 90,
      location: {
        address: 'Москва, ул. Спортивная, 15',
        coordinates: { lat: 55.7558, lng: 37.6173 }
      },
      partner_id: 'partner_1',
      images: ['https://via.placeholder.com/300x200/4A90E2/FFFFFF?text=Футбол'],
      rating: 4.8,
      review_count: 124,
      available_slots: 5,
      schedule: []
    },
    {
      id: '2',
      name: 'Художественная студия',
      category: 'art',
      description: 'Рисование и лепка для развития творческих способностей',
      age_range: { min: 4, max: 10 },
      price: 600,
      duration: 60,
      location: {
        address: 'Москва, ул. Искусств, 8',
        coordinates: { lat: 55.7517, lng: 37.6178 }
      },
      partner_id: 'partner_2',
      images: ['https://via.placeholder.com/300x200/9C27B0/FFFFFF?text=Рисование'],
      rating: 4.6,
      review_count: 89,
      available_slots: 8,
      schedule: []
    },
    {
      id: '3',
      name: 'Программирование для детей',
      category: 'science',
      description: 'Изучение основ программирования в игровой форме',
      age_range: { min: 8, max: 14 },
      price: 1200,
      duration: 120,
      location: {
        address: 'Москва, ул. Техническая, 25',
        coordinates: { lat: 55.7580, lng: 37.6170 }
      },
      partner_id: 'partner_3',
      images: ['https://via.placeholder.com/300x200/00BCD4/FFFFFF?text=Программирование'],
      rating: 4.9,
      review_count: 67,
      available_slots: 6,
      schedule: []
    },
    {
      id: '4',
      name: 'Бальные танцы',
      category: 'dance',
      description: 'Классические бальные танцы для детей',
      age_range: { min: 6, max: 15 },
      price: 700,
      duration: 90,
      location: {
        address: 'Москва, ул. Танцевальная, 12',
        coordinates: { lat: 55.7570, lng: 37.6180 }
      },
      partner_id: 'partner_4',
      images: ['https://via.placeholder.com/300x200/E91E63/FFFFFF?text=Танцы'],
      rating: 4.7,
      review_count: 93,
      available_slots: 4,
      schedule: []
    },
    {
      id: '5',
      name: 'Английский язык для детей',
      category: 'languages',
      description: 'Изучение английского через игры и песни',
      age_range: { min: 3, max: 8 },
      price: 500,
      duration: 45,
      location: {
        address: 'Москва, ул. Языковая, 7',
        coordinates: { lat: 55.7560, lng: 37.6190 }
      },
      partner_id: 'partner_5',
      images: ['https://via.placeholder.com/300x200/4CAF50/FFFFFF?text=Английский'],
      rating: 4.5,
      review_count: 56,
      available_slots: 10,
      schedule: []
    },
  ];

  useEffect(() => {
    setActivities(mockActivities);
    setFilteredActivities(mockActivities);
  }, []);

  // Функция применения фильтров
  const applyFilters = () => {
    let filtered = [...activities];

    // Поиск по тексту
    if (searchQuery.trim() !== '') {
      filtered = filtered.filter(activity =>
        activity.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        activity.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        activity.category.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Фильтр по категориям
    if (filters.categories.length > 0) {
      filtered = filtered.filter(activity =>
        filters.categories.includes(activity.category)
      );
    }

    // Фильтр по цене
    filtered = filtered.filter(activity =>
      activity.price >= filters.priceRange.min &&
      activity.price <= filters.priceRange.max
    );

    // Фильтр по возрасту
    filtered = filtered.filter(activity =>
      activity.age_range.min <= filters.ageRange.max &&
      activity.age_range.max >= filters.ageRange.min
    );

    // Фильтр по рейтингу
    if (filters.rating > 0) {
      filtered = filtered.filter(activity => activity.rating >= filters.rating);
    }

    setFilteredActivities(filtered);
    setShowFilters(false);
  };

  // Сброс фильтров
  const resetFilters = () => {
    setFilters({
      categories: [],
      priceRange: { min: 0, max: 5000 },
      ageRange: { min: 3, max: 18 },
      rating: 0,
    });
    setFilteredActivities(activities);
    setShowFilters(false);
  };

  // Переключение категории
  const toggleCategory = (categoryId: string) => {
    setFilters(prev => ({
      ...prev,
      categories: prev.categories.includes(categoryId)
        ? prev.categories.filter(id => id !== categoryId)
        : [...prev.categories, categoryId]
    }));
  };

  // Выбор возрастной группы
  const selectAgeGroup = (ageGroup: typeof ageGroups[0]) => {
    setFilters(prev => ({
      ...prev,
      ageRange: ageGroup.range
    }));
  };

  // Быстрый выбор цены
  const setQuickPrice = (price: number) => {
    setFilters(prev => ({
      ...prev,
      priceRange: { ...prev.priceRange, max: price }
    }));
  };

  const handleActivityPress = (activity: Activity) => {
    Alert.alert(
      activity.name,
      `${activity.description}\n\nВозраст: ${activity.age_range.min}-${activity.age_range.max} лет\nЦена: ${activity.price} ₽`,
      [
        { text: 'Отмена', style: 'cancel' },
        { text: 'Записаться', onPress: () => handleBookActivity(activity) }
      ]
    );
  };

  const handleBookActivity = (activity: Activity) => {
    Alert.alert('Успех!', `Вы записаны на "${activity.name}"`);
  };

  const renderActivityItem = ({ item }: { item: Activity }) => (
    <TouchableOpacity style={styles.activityCard} onPress={() => handleActivityPress(item)}>
      <Image source={{ uri: item.images[0] }} style={styles.activityImage} />
      <View style={styles.activityInfo}>
        <Text style={styles.activityName} numberOfLines={2}>{item.name}</Text>
        <Text style={styles.activityCategory}>
          {item.category === 'sport' ? 'Спорт' : 
           item.category === 'art' ? 'Творчество' :
           item.category === 'science' ? 'Наука' :
           item.category === 'dance' ? 'Танцы' :
           item.category === 'languages' ? 'Языки' : item.category}
        </Text>
        <View style={styles.activityDetails}>
          <Text style={styles.activityAge}>{item.age_range.min}-{item.age_range.max} лет</Text>
          <Text style={styles.activityPrice}>{item.price} ₽</Text>
        </View>
        <View style={styles.ratingContainer}>
          <Text style={styles.rating}>★ {item.rating}</Text>
          <Text style={styles.reviews}>({item.review_count})</Text>
        </View>
        <Text style={styles.activityAddress} numberOfLines={1}>{item.location.address}</Text>
      </View>
    </TouchableOpacity>
  );

  // Компонент для отображения активных фильтров
  const ActiveFilters = () => {
    const activeFilters = [];
    
    if (filters.categories.length > 0) {
      activeFilters.push(`Категории: ${filters.categories.length}`);
    }
    if (filters.priceRange.max < 5000) {
      activeFilters.push(`До ${filters.priceRange.max}₽`);
    }
    if (filters.ageRange.min > 3 || filters.ageRange.max < 18) {
      activeFilters.push(`${filters.ageRange.min}-${filters.ageRange.max} лет`);
    }
    if (filters.rating > 0) {
      activeFilters.push(`★ ${filters.rating}+`);
    }

    if (activeFilters.length === 0) return null;

    return (
      <View style={styles.activeFilters}>
        <Text style={styles.activeFiltersTitle}>Активные фильтры:</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View style={styles.activeFiltersList}>
            {activeFilters.map((filter, index) => (
              <View key={index} style={styles.activeFilterTag}>
                <Text style={styles.activeFilterText}>{filter}</Text>
              </View>
            ))}
          </View>
        </ScrollView>
      </View>
    );
  };

  // Компонент слайдера цены
  const PriceSlider = () => {
    const percentage = (filters.priceRange.max / 5000) * 100;
    const thumbPosition = (percentage / 100) * sliderWidth;

    return (
      <View style={styles.sliderSection}>
        <View style={styles.sliderHeader}>
          <Text style={styles.sliderValue}>до {filters.priceRange.max} ₽</Text>
          <Text style={styles.sliderMax}>5 000 ₽</Text>
        </View>
        
        {/* Слайдер */}
        <View style={styles.sliderContainer} {...panResponder.panHandlers}>
          <View style={styles.sliderTrack}>
            <View 
              style={[
                styles.sliderFill,
                { width: `${percentage}%` }
              ]} 
            />
            <View
              style={[
                styles.sliderThumb,
                { 
                  left: thumbPosition,
                  transform: [{ translateX: -12 }],
                  elevation: isSliding ? 8 : 4,
                  shadowOpacity: isSliding ? 0.3 : 0.2,
                }
              ]}
            />
          </View>
        </View>

        {/* Быстрый выбор */}
        <View style={styles.quickPrices}>
          {[1000, 2000, 3000, 5000].map(price => (
            <TouchableOpacity
              key={price}
              style={[
                styles.quickPriceButton,
                filters.priceRange.max === price && styles.quickPriceButtonActive
              ]}
              onPress={() => setQuickPrice(price)}
            >
              <Text style={[
                styles.quickPriceText,
                filters.priceRange.max === price && styles.quickPriceTextActive
              ]}>
                {price === 5000 ? 'Любая' : `${price}₽`}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    );
  };

  // Модальное окно фильтров
  const renderFiltersModal = () => (
    <Modal
      visible={showFilters}
      animationType="slide"
      presentationStyle="pageSheet"
    >
      <SafeAreaView style={styles.modalContainer}>
        <View style={styles.modalHeader}>
          <Text style={styles.modalTitle}>Фильтры</Text>
          <TouchableOpacity onPress={() => setShowFilters(false)}>
            <X size={24} color="#000000" />
          </TouchableOpacity>
        </View>

        <ScrollView style={styles.modalContent} showsVerticalScrollIndicator={false}>
          {/* Цена - КРАСИВЫЙ РАБОЧИЙ СЛАЙДЕР */}
          <View style={styles.filterSection}>
            <Text style={styles.filterSectionTitle}>Бюджет</Text>
            <Text style={styles.filterSubtitle}>Максимальная цена за занятие</Text>
            <PriceSlider />
          </View>

          {/* Возраст - ЛОГИЧНЫЕ ВОЗРАСТНЫЕ ГРУППЫ */}
          <View style={styles.filterSection}>
            <Text style={styles.filterSectionTitle}>Возраст ребенка</Text>
            <Text style={styles.filterSubtitle}>Выберите подходящую возрастную группу</Text>
            <View style={styles.ageOptions}>
              {ageGroups.map((ageGroup) => {
                const isSelected = 
                  filters.ageRange.min === ageGroup.range.min && 
                  filters.ageRange.max === ageGroup.range.max;
                
                return (
                  <TouchableOpacity
                    key={ageGroup.label}
                    style={[
                      styles.ageOption,
                      isSelected && styles.ageOptionActive
                    ]}
                    onPress={() => selectAgeGroup(ageGroup)}
                  >
                    <Text style={[
                      styles.ageOptionText,
                      isSelected && styles.ageOptionTextActive
                    ]}>
                      {ageGroup.label}
                    </Text>
                    {isSelected && <Check size={16} color="#FFFFFF" />}
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>

          {/* Категории */}
          <View style={styles.filterSection}>
            <Text style={styles.filterSectionTitle}>Направления</Text>
            <Text style={styles.filterSubtitle}>Выберите интересующие категории</Text>
            <View style={styles.categoriesContainer}>
              {categories.map(category => (
                <TouchableOpacity
                  key={category.id}
                  style={[
                    styles.categoryButton,
                    filters.categories.includes(category.id) && styles.categoryButtonActive
                  ]}
                  onPress={() => toggleCategory(category.id)}
                >
                  <Text style={[
                    styles.categoryText,
                    filters.categories.includes(category.id) && styles.categoryTextActive
                  ]}>
                    {category.name}
                  </Text>
                  {filters.categories.includes(category.id) && (
                    <Check size={16} color="#FFFFFF" />
                  )}
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Рейтинг */}
          <View style={styles.filterSection}>
            <Text style={styles.filterSectionTitle}>Минимальный рейтинг</Text>
            <Text style={styles.filterSubtitle}>Показывать только проверенные занятия</Text>
            <View style={styles.ratingOptions}>
              {[
                { value: 0, label: 'Любой рейтинг' },
                { value: 4.0, label: '★ 4.0 и выше' },
                { value: 4.5, label: '★ 4.5 и выше' },
                { value: 4.8, label: '★ 4.8 и выше' },
              ].map((option) => (
                <TouchableOpacity
                  key={option.value}
                  style={[
                    styles.ratingOption,
                    filters.rating === option.value && styles.ratingOptionActive
                  ]}
                  onPress={() => setFilters(prev => ({ ...prev, rating: option.value }))}
                >
                  <Text style={[
                    styles.ratingOptionText,
                    filters.rating === option.value && styles.ratingOptionTextActive
                  ]}>
                    {option.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </ScrollView>

        <View style={styles.modalFooter}>
          <TouchableOpacity style={styles.resetButton} onPress={resetFilters}>
            <Text style={styles.resetButtonText}>Сбросить все</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.applyButton} onPress={applyFilters}>
            <Text style={styles.applyButtonText}>
              Показать {filteredActivities.length} занятий
            </Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </Modal>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <ArrowLeft size={24} color="#000000" />
        </TouchableOpacity>
        <View style={styles.searchContainer}>
          <MagnifyingGlass size={20} color="#8E8E93" />
          <TextInput
            style={styles.searchInput}
            placeholder="Поиск секций, кружков, курсов..."
            value={searchQuery}
            onChangeText={setSearchQuery}
            autoFocus={true}
          />
          <TouchableOpacity onPress={() => setShowFilters(true)}>
            <Faders size={20} color="#8E8E93" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Активные фильтры */}
      <ActiveFilters />

      {/* Results */}
      <View style={styles.content}>
        <Text style={styles.resultsTitle}>
          {searchQuery || filters.categories.length > 0 || filters.rating > 0 
            ? `Найдено ${filteredActivities.length} занятий` 
            : 'Все занятия'}
        </Text>
        
        <FlatList
          data={filteredActivities}
          renderItem={renderActivityItem}
          keyExtractor={item => item.id}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.listContainer}
        />
      </View>

      {/* Модальное окно фильтров */}
      {renderFiltersModal()}
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
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  backButton: {
    padding: 8,
    marginRight: 12,
  },
  searchContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8F8F8',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    marginHorizontal: 8,
    padding: 0,
  },
  // Активные фильтры
  activeFilters: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  activeFiltersTitle: {
    fontSize: 14,
    color: '#666666',
    marginBottom: 8,
  },
  activeFiltersList: {
    flexDirection: 'row',
    gap: 8,
  },
  activeFilterTag: {
    backgroundColor: '#000000',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  activeFilterText: {
    fontSize: 12,
    color: '#FFFFFF',
    fontWeight: '500',
  },
  content: {
    flex: 1,
    padding: 16,
  },
  resultsTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000000',
    marginBottom: 16,
  },
  listContainer: {
    paddingBottom: 16,
  },
  activityCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
    overflow: 'hidden',
  },
  activityImage: {
    width: '100%',
    height: 160,
  },
  activityInfo: {
    padding: 16,
  },
  activityName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000000',
    marginBottom: 4,
  },
  activityCategory: {
    fontSize: 14,
    color: '#666666',
    marginBottom: 8,
  },
  activityDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  activityAge: {
    fontSize: 14,
    color: '#666666',
  },
  activityPrice: {
    fontSize: 16,
    fontWeight: '600',
    color: '#007AFF',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
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
  activityAddress: {
    fontSize: 12,
    color: '#8E8E93',
  },
  // Стили для модального окна фильтров
  modalContainer: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000000',
  },
  modalContent: {
    flex: 1,
    padding: 20,
  },
  modalFooter: {
    flexDirection: 'row',
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
    gap: 12,
  },
  filterSection: {
    marginBottom: 32,
  },
  filterSectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000000',
    marginBottom: 4,
  },
  filterSubtitle: {
    fontSize: 14,
    color: '#666666',
    marginBottom: 16,
  },
  // Стили для слайдера цены
  sliderSection: {
    marginBottom: 8,
  },
  sliderHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sliderValue: {
    fontSize: 18,
    fontWeight: '700',
    color: '#000000',
  },
  sliderMax: {
    fontSize: 14,
    color: '#8E8E93',
  },
  sliderContainer: {
    marginBottom: 24,
  },
  sliderTrack: {
    height: 4,
    backgroundColor: '#E0E0E0',
    borderRadius: 2,
    position: 'relative',
  },
  sliderFill: {
    position: 'absolute',
    height: '100%',
    backgroundColor: '#000000',
    borderRadius: 2,
  },
  sliderThumb: {
    position: 'absolute',
    width: 24,
    height: 24,
    backgroundColor: '#000000',
    borderRadius: 12,
    top: -10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 4,
  },
  quickPrices: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  quickPriceButton: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: '#F8F8F8',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
  },
  quickPriceButtonActive: {
    backgroundColor: '#000000',
    borderColor: '#000000',
  },
  quickPriceText: {
    fontSize: 12,
    color: '#000000',
  },
  quickPriceTextActive: {
    color: '#FFFFFF',
    fontWeight: '600',
  },
  // Стили для возраста
  ageOptions: {
    gap: 8,
  },
  ageOption: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
    paddingHorizontal: 20,
    backgroundColor: '#F8F8F8',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 12,
  },
  ageOptionActive: {
    backgroundColor: '#000000',
    borderColor: '#000000',
  },
  ageOptionText: {
    fontSize: 16,
    color: '#000000',
  },
  ageOptionTextActive: {
    color: '#FFFFFF',
    fontWeight: '600',
  },
  // Стили для категорий
  categoriesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  categoryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: '#F8F8F8',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 20,
    gap: 6,
  },
  categoryButtonActive: {
    backgroundColor: '#000000',
    borderColor: '#000000',
  },
  categoryText: {
    fontSize: 14,
    color: '#000000',
  },
  categoryTextActive: {
    color: '#FFFFFF',
  },
  // Стили для рейтинга
  ratingOptions: {
    gap: 8,
  },
  ratingOption: {
    paddingVertical: 16,
    paddingHorizontal: 20,
    backgroundColor: '#F8F8F8',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 12,
  },
  ratingOptionActive: {
    backgroundColor: '#000000',
    borderColor: '#000000',
  },
  ratingOptionText: {
    fontSize: 16,
    color: '#000000',
    textAlign: 'center',
  },
  ratingOptionTextActive: {
    color: '#FFFFFF',
    fontWeight: '600',
  },
  resetButton: {
    flex: 1,
    paddingVertical: 16,
    alignItems: 'center',
    backgroundColor: '#F8F8F8',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 12,
  },
  resetButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000000',
  },
  applyButton: {
    flex: 2,
    paddingVertical: 16,
    alignItems: 'center',
    backgroundColor: '#000000',
    borderRadius: 12,
  },
  applyButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
});

export default SearchScreen;