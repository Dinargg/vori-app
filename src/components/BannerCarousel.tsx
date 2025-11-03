// src/components/BannerCarousel.tsx - ПОЛНЫЙ ИСПРАВЛЕННЫЙ КОД
import React from 'react';
import {
  View,
  Image,
  FlatList,
  StyleSheet,
  Dimensions,
} from 'react-native';

const { width } = Dimensions.get('window');

// Правильный путь к изображениям из папки foto
const banners = [
  { 
    id: '1', 
    image: require('../foto/banner1.png')
  },
  { 
    id: '2', 
    image: require('../foto/banner2.png')
  },
  { 
    id: '3', 
    image: require('../foto/banner3.png')
  },
];

const BannerCarousel: React.FC = () => {
  const bannerWidth = width - 40;
  const bannerHeight = (bannerWidth * 400) / 720;

  const renderBanner = ({ item }: { item: { id: string; image: any } }) => (
    <View style={[styles.bannerContainer, { width: bannerWidth, height: bannerHeight }]}>
      <Image
        source={item.image}
        style={styles.bannerImage}
        resizeMode="cover"
      />
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={banners}
        renderItem={renderBanner}
        keyExtractor={(item) => item.id}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        snapToAlignment="center"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
  },
  bannerContainer: {
    marginHorizontal: 10,
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: '#f0f0f0',
  },
  bannerImage: {
    width: '100%',
    height: '100%',
  },
});

export default BannerCarousel;