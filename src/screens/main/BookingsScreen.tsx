// src/screens/main/BookingsScreen.tsx - ПОЛНЫЙ ОБНОВЛЕННЫЙ КОД
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  Image,
  Alert,
  StatusBar,
} from 'react-native';

const BookingsScreen = () => {
  const [activeTab, setActiveTab] = useState<'upcoming' | 'past'>('upcoming');

  // Данные предстоящих записей
  const upcomingBookings = [
    {
      id: '1',
      activityName: 'Футбольная тренировка',
      schoolName: 'Спортивная школа Спартак',
      date: '15 декабря 2024',
      time: '16:00 - 17:30',
      price: '800 ₽',
      status: 'confirmed',
      image: 'https://via.placeholder.com/300x200/4A90E2/FFFFFF?text=Футбол',
      address: 'ул. Спортивная, 15',
    },
    {
      id: '2', 
      activityName: 'Художественная студия',
      schoolName: 'Детская художественная школа',
      date: '16 декабря 2024',
      time: '14:00 - 15:00',
      price: '600 ₽',
      status: 'confirmed',
      image: 'https://via.placeholder.com/300x200/9C27B0/FFFFFF?text=Рисование',
      address: 'ул. Искусств, 8',
    },
  ];

  // Данные прошедших записей
  const pastBookings = [
    {
      id: '3',
      activityName: 'Программирование для детей',
      schoolName: 'IT-Академия',
      date: '10 декабря 2024',
      time: '17:00 - 19:00',
      price: '1000 ₽',
      status: 'completed',
      image: 'https://via.placeholder.com/300x200/00BCD4/FFFFFF?text=Программирование',
      address: 'ул. Техническая, 25',
    },
    {
      id: '4',
      activityName: 'Бальные танцы',
      schoolName: 'Танцевальная студия',
      date: '8 декабря 2024',
      time: '15:00 - 16:30',
      price: '700 ₽',
      status: 'completed',
      image: 'https://via.placeholder.com/300x200/E91E63/FFFFFF?text=Танцы',
      address: 'ул. Танцевальная, 12',
    },
  ];

  const currentBookings = activeTab === 'upcoming' ? upcomingBookings : pastBookings;

  const handleCancelBooking = (booking: any) => {
    Alert.alert(
      'Отмена записи',
      `Вы уверены, что хотите отменить запись на "${booking.activityName}"?`,
      [
        { text: 'Нет', style: 'cancel' },
        { text: 'Да, отменить', style: 'destructive' }
      ]
    );
  };

  const handleReorder = (booking: any) => {
    Alert.alert('Повторная запись', `Запись на "${booking.activityName}"\n\nФункция в разработке`);
  };

  const handleContact = (booking: any) => {
    Alert.alert('Связь с организатором', `Контактные данные для "${booking.schoolName}"\n\nФункция в разработке`);
  };

  const renderBooking = (booking: any) => (
    <View key={booking.id} style={styles.bookingCard}>
      <Image source={{ uri: booking.image }} style={styles.bookingImage} />
      <View style={styles.bookingInfo}>
        <Text style={styles.activityName} numberOfLines={2}>{booking.activityName}</Text>
        <Text style={styles.schoolName} numberOfLines={1}>{booking.schoolName}</Text>
        
        <View style={styles.bookingDetails}>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>📅</Text>
            <Text style={styles.detailText}>{booking.date}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>🕒</Text>
            <Text style={styles.detailText}>{booking.time}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>📍</Text>
            <Text style={styles.detailText} numberOfLines={1}>{booking.address}</Text>
          </View>
        </View>

        <View style={styles.bookingFooter}>
          <Text style={styles.price}>{booking.price}</Text>
          <View style={[
            styles.statusBadge,
            booking.status === 'confirmed' ? styles.statusConfirmed : styles.statusCompleted
          ]}>
            <Text style={styles.statusText}>
              {booking.status === 'confirmed' ? 'Подтверждено' : 'Завершено'}
            </Text>
          </View>
        </View>

        <View style={styles.actions}>
          {activeTab === 'upcoming' ? (
            <>
              <TouchableOpacity 
                style={styles.actionButton} 
                onPress={() => handleContact(booking)}
              >
                <Text style={styles.actionText}>Связаться</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={[styles.actionButton, styles.cancelButton]} 
                onPress={() => handleCancelBooking(booking)}
              >
                <Text style={[styles.actionText, styles.cancelText]}>Отменить</Text>
              </TouchableOpacity>
            </>
          ) : (
            <TouchableOpacity 
              style={styles.actionButton} 
              onPress={() => handleReorder(booking)}
            >
              <Text style={styles.actionText}>Записаться снова</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      
      {/* УПРОЩЕННЫЙ Header - убраны кнопки навигации */}
      <View style={styles.header}>
        <Text style={styles.title}>Мои записи</Text>
      </View>

      {/* Табы */}
      <View style={styles.tabs}>
        <TouchableOpacity 
          style={[styles.tab, activeTab === 'upcoming' && styles.tabActive]}
          onPress={() => setActiveTab('upcoming')}
        >
          <Text style={[styles.tabText, activeTab === 'upcoming' && styles.tabTextActive]}>
            Предстоящие
          </Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.tab, activeTab === 'past' && styles.tabActive]}
          onPress={() => setActiveTab('past')}
        >
          <Text style={[styles.tabText, activeTab === 'past' && styles.tabTextActive]}>
            Прошедшие
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        
        {currentBookings.length === 0 ? (
          <View style={styles.emptyState}>
            <Text style={styles.emptyStateTitle}>
              {activeTab === 'upcoming' ? 'Нет предстоящих записей' : 'Нет прошедших записей'}
            </Text>
            <Text style={styles.emptyStateText}>
              {activeTab === 'upcoming' 
                ? 'Запишитесь на занятия, чтобы они появились здесь'
                : 'Здесь появятся ваши завершенные занятия'
              }
            </Text>
          </View>
        ) : (
          <View style={styles.bookingsList}>
            {currentBookings.map(renderBooking)}
          </View>
        )}
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
  tabs: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  tab: {
    flex: 1,
    paddingVertical: 16,
    alignItems: 'center',
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  tabActive: {
    borderBottomColor: '#000000',
  },
  tabText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#666666',
  },
  tabTextActive: {
    color: '#000000',
    fontWeight: '600',
  },
  content: {
    flex: 1,
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 40,
    marginTop: 60,
  },
  emptyStateTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000000',
    marginBottom: 8,
    textAlign: 'center',
  },
  emptyStateText: {
    fontSize: 14,
    color: '#666666',
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 24,
  },
  bookingsList: {
    padding: 20,
  },
  bookingCard: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    marginBottom: 16,
    borderRadius: 12,
    overflow: 'hidden',
  },
  bookingImage: {
    width: '100%',
    height: 160,
    resizeMode: 'cover',
  },
  bookingInfo: {
    padding: 16,
  },
  activityName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000000',
    marginBottom: 4,
  },
  schoolName: {
    fontSize: 14,
    color: '#666666',
    marginBottom: 12,
  },
  bookingDetails: {
    marginBottom: 12,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  detailLabel: {
    fontSize: 12,
    marginRight: 8,
    width: 20,
  },
  detailText: {
    fontSize: 14,
    color: '#333333',
    flex: 1,
  },
  bookingFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  price: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000000',
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  statusConfirmed: {
    backgroundColor: '#E8F5E8',
  },
  statusCompleted: {
    backgroundColor: '#F0F0F0',
  },
  statusText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#000000',
  },
  actions: {
    flexDirection: 'row',
    gap: 12,
  },
  actionButton: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
    backgroundColor: '#000000',
    borderRadius: 8,
  },
  cancelButton: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  actionText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  cancelText: {
    color: '#000000',
  },
});

export default BookingsScreen;