import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Activity } from '../types/api';

interface FavoritesContextType {
  favorites: Activity[];
  isLoading: boolean;
  addToFavorites: (activityId: string) => Promise<void>;
  removeFromFavorites: (activityId: string) => Promise<void>;
  isFavorite: (activityId: string) => boolean;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

export const FavoritesProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [favorites, setFavorites] = useState<Activity[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // Mock данные для избранного
  const mockFavorites: Activity[] = [
    {
      id: '1',
      name: 'Футбольная академия "Чемпион"',
      category: 'sport',
      description: 'Профессиональные тренировки для детей',
      age_range: { min: 5, max: 12 },
      price: 2500,
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
    }
  ];

  useEffect(() => {
    // Имитация загрузки избранного
    setIsLoading(true);
    setTimeout(() => {
      setFavorites(mockFavorites);
      setIsLoading(false);
    }, 1000);
  }, []);

  const addToFavorites = async (activityId: string): Promise<void> => {
    // Здесь будет логика добавления в избранное
    console.log('Add to favorites:', activityId);
  };

  const removeFromFavorites = async (activityId: string): Promise<void> => {
    // Здесь будет логика удаления из избранного
    console.log('Remove from favorites:', activityId);
  };

  const isFavorite = (activityId: string): boolean => {
    return favorites.some(fav => fav.id === activityId);
  };

  return (
    <FavoritesContext.Provider value={{
      favorites,
      isLoading,
      addToFavorites,
      removeFromFavorites,
      isFavorite
    }}>
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = (): FavoritesContextType => {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error('useFavorites must be used within a FavoritesProvider');
  }
  return context;
};