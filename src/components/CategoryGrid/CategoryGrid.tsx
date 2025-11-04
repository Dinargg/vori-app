import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

interface Category {
  id: string;
  name: string;
  icon: string;
  color: string;
}

interface CategoryGridProps {
  onCategoryPress: (category: Category) => void;
}

const CategoryGrid: React.FC<CategoryGridProps> = ({ onCategoryPress }) => {
  const categories: Category[] = [
    {
      id: 'sport',
      name: 'Спорт',
      icon: 'soccer',
      color: '#424242' // Темный серый
    },
    {
      id: 'art',
      name: 'Творчество',
      icon: 'palette',
      color: '#4A4A4A' 
    },
    {
      id: 'science',
      name: 'Наука',
      icon: 'microscope',
      color: '#525252'
    },
    {
      id: 'music',
      name: 'Музыка',
      icon: 'music',
      color: '#5A5A5A'
    },
    {
      id: 'dance',
      name: 'Танцы',
      icon: 'human-female-dance',
      color: '#626262'
    },
    {
      id: 'chess',
      name: 'Шахматы',
      icon: 'chess-knight',
      color: '#6A6A6A'
    },
    {
      id: 'theater',
      name: 'Театр',
      icon: 'drama-masks',
      color: '#727272'
    },
    {
      id: 'languages',
      name: 'Языки',
      icon: 'translate',
      color: '#7A7A7A'
    },
  ];

  return (
    <ScrollView 
      horizontal 
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.container}
    >
      {categories.map((category) => (
        <TouchableOpacity
          key={category.id}
          style={styles.categoryItem}
          onPress={() => onCategoryPress(category)}
        >
          <View style={[styles.iconContainer, { backgroundColor: category.color }]}>
            <Icon name={category.icon} size={28} color="#FFFFFF" />
          </View>
          <Text style={styles.categoryName} numberOfLines={2}>
            {category.name}
          </Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingVertical: 8,
  },
  categoryItem: {
    alignItems: 'center',
    marginRight: 16,
    width: 70,
  },
  iconContainer: {
    width: 56,
    height: 56,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  categoryName: {
    fontSize: 12,
    fontWeight: '500',
    color: '#000000',
    textAlign: 'center',
    lineHeight: 14,
  },
});

export default CategoryGrid;