import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

interface QuickFilter {
  id: string;
  title: string;
  subtitle: string;
  icon: string;
  type: 'location' | 'filter' | 'time' | 'rating';
}

interface QuickSearchProps {
  onFilterPress: (filter: QuickFilter) => void;
  currentLocation?: string;
}

const QuickSearch: React.FC<QuickSearchProps> = ({ onFilterPress, currentLocation = 'Москва' }) => {
  const quickFilters: QuickFilter[] = [
    {
      id: 'nearby',
      title: 'Рядом со мной',
      subtitle: currentLocation,
      icon: 'map-marker',
      type: 'location'
    },
    {
      id: 'filters',
      title: 'Расширенные фильтры',
      subtitle: 'Возраст, цена, рейтинг',
      icon: 'filter-variant',
      type: 'filter'
    },
    {
      id: 'today',
      title: 'Занятия сегодня',
      subtitle: 'Свободные места',
      icon: 'clock-outline',
      type: 'time'
    },
    {
      id: 'top',
      title: 'Топ рейтинга',
      subtitle: '⭐ 4.5+',
      icon: 'star',
      type: 'rating'
    },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Быстрый поиск</Text>
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.filtersContainer}
      >
        {quickFilters.map((filter, index) => (
          <TouchableOpacity
            key={filter.id}
            style={styles.filterCard}
            onPress={() => onFilterPress(filter)}
          >
            <View style={[styles.iconContainer, { backgroundColor: getIconColor(index) }]}>
              <Icon name={filter.icon} size={20} color="#FFFFFF" />
            </View>
            <View style={styles.textContainer}>
              <Text style={styles.filterTitle}>{filter.title}</Text>
              <Text style={styles.filterSubtitle}>{filter.subtitle}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

// Градиентные серые цвета для QuickSearch
const getIconColor = (index: number) => {
  const colors = [
    '#424242', // Самый темный
    '#4A4A4A',
    '#525252', 
    '#5A5A5A', // Самый светлый из темных
  ];
  return colors[index] || '#424242';
};

const styles = StyleSheet.create({
  container: {
    marginTop: 8,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: '#000000',
    marginBottom: 16,
    paddingHorizontal: 20,
  },
  filtersContainer: {
    paddingHorizontal: 20,
    paddingRight: 10,
  },
  filterCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8F8F8',
    padding: 16,
    borderRadius: 12,
    marginRight: 12,
    minWidth: 200,
  },
  iconContainer: {
    width: 36,
    height: 36,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  textContainer: {
    flex: 1,
  },
  filterTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000000',
    marginBottom: 4,
  },
  filterSubtitle: {
    fontSize: 14,
    color: '#8E8E93',
  },
});

export default QuickSearch;