// src/screens/main/ProfileScreen.tsx - ПОЛНЫЙ ОБНОВЛЕННЫЙ КОД
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  Alert,
  StatusBar,
  Switch,
} from 'react-native';

const ProfileScreen = () => {
  const [notifications, setNotifications] = useState(true);
  const [emailNotifications, setEmailNotifications] = useState(false);

  // Данные пользователя
  const userData = {
    name: 'Анна Иванова',
    phone: '+7 (999) 123-45-67',
    email: 'anna@example.com',
    children: [
      { id: '1', name: 'Мария', age: '5 лет', gender: 'Девочка' },
      { id: '2', name: 'Иван', age: '8 лет', gender: 'Мальчик' },
    ],
  };

  const menuItems = [
    {
      id: '1',
      title: 'Мои дети',
      icon: '👶',
      onPress: () => Alert.alert('Мои дети', 'Редактирование детей в разработке'),
    },
    {
      id: '2',
      title: 'История платежей',
      icon: '💳',
      onPress: () => Alert.alert('Платежи', 'История платежей в разработке'),
    },
    {
      id: '3',
      title: 'Избранное',
      icon: '❤️',
      onPress: () => Alert.alert('Избранное', 'Избранные занятия в разработке'),
    },
    {
      id: '4',
      title: 'Уведомления',
      icon: '🔔',
      onPress: () => {},
      hasSwitch: true,
      switchValue: notifications,
      onSwitchChange: setNotifications,
    },
    {
      id: '5',
      title: 'Email-уведомления',
      icon: '📧',
      onPress: () => {},
      hasSwitch: true,
      switchValue: emailNotifications,
      onSwitchChange: setEmailNotifications,
    },
    {
      id: '6',
      title: 'Помощь и поддержка',
      icon: '❓',
      onPress: () => Alert.alert('Поддержка', 'support@vori.app\n+7 (999) 123-45-67'),
    },
    {
      id: '7',
      title: 'О приложении',
      icon: 'ℹ️',
      onPress: () => Alert.alert('О приложении', 'VORI - детские активности\nВерсия 1.0.0'),
    },
  ];

  const handleEditProfile = () => {
    Alert.alert('Редактирование', 'Редактирование профиля в разработке');
  };

  const handleAddChild = () => {
    Alert.alert('Добавить ребенка', 'Добавление ребенка в разработке');
  };

  const handleLogout = () => {
    Alert.alert(
      'Выход',
      'Вы уверены, что хотите выйти?',
      [
        { text: 'Отмена', style: 'cancel' },
        { text: 'Выйти', style: 'destructive' }
      ]
    );
  };

  const handleDeleteAccount = () => {
    Alert.alert(
      'Удаление аккаунта',
      'Внимание! Это действие нельзя отменить. Все ваши данные будут удалены.',
      [
        { text: 'Отмена', style: 'cancel' },
        { text: 'Удалить', style: 'destructive' }
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      
      {/* УПРОЩЕННЫЙ Header - убраны кнопки навигации */}
      <View style={styles.header}>
        <Text style={styles.title}>Профиль</Text>
        <TouchableOpacity onPress={handleEditProfile} style={styles.editButton}>
          <Text style={styles.editButtonText}>Редактировать</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        
        {/* Информация пользователя */}
        <View style={styles.userSection}>
          <View style={styles.avatarContainer}>
            <Text style={styles.avatar}>👤</Text>
          </View>
          <View style={styles.userInfo}>
            <Text style={styles.userName}>{userData.name}</Text>
            <Text style={styles.userContact}>{userData.phone}</Text>
            <Text style={styles.userContact}>{userData.email}</Text>
          </View>
        </View>

        {/* Дети пользователя */}
        <View style={styles.childrenSection}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Мои дети</Text>
            <TouchableOpacity onPress={handleAddChild}>
              <Text style={styles.addButton}>+ Добавить</Text>
            </TouchableOpacity>
          </View>
          {userData.children.map(child => (
            <View key={child.id} style={styles.childCard}>
              <Text style={styles.childIcon}>👶</Text>
              <View style={styles.childInfo}>
                <Text style={styles.childName}>{child.name}</Text>
                <Text style={styles.childDetails}>{child.age} • {child.gender}</Text>
              </View>
              <TouchableOpacity style={styles.childEdit}>
                <Text style={styles.childEditText}>✏️</Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>

        {/* Меню настроек */}
        <View style={styles.menuSection}>
          {menuItems.map(item => (
            <TouchableOpacity
              key={item.id}
              style={styles.menuItem}
              onPress={item.onPress}
              disabled={item.hasSwitch}
            >
              <View style={styles.menuItemLeft}>
                <Text style={styles.menuIcon}>{item.icon}</Text>
                <Text style={styles.menuText}>{item.title}</Text>
              </View>
              {item.hasSwitch ? (
                <Switch
                  value={item.switchValue}
                  onValueChange={item.onSwitchChange}
                  trackColor={{ false: '#E0E0E0', true: '#000000' }}
                  thumbColor={item.switchValue ? '#FFFFFF' : '#FFFFFF'}
                />
              ) : (
                <Text style={styles.menuArrow}>›</Text>
              )}
            </TouchableOpacity>
          ))}
        </View>

        {/* Опасная зона */}
        <View style={styles.dangerSection}>
          <Text style={styles.dangerTitle}>Опасная зона</Text>
          <TouchableOpacity style={styles.deleteButton} onPress={handleDeleteAccount}>
            <Text style={styles.deleteButtonText}>Удалить аккаунт</Text>
          </TouchableOpacity>
        </View>

        {/* Выход */}
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutButtonText}>Выйти из аккаунта</Text>
        </TouchableOpacity>
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
    alignItems: 'center',
    justifyContent: 'space-between',
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
  editButton: {
    padding: 8,
  },
  editButtonText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#000000',
  },
  content: {
    flex: 1,
  },
  userSection: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  avatarContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#F8F8F8',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  avatar: {
    fontSize: 32,
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 20,
    fontWeight: '600',
    color: '#000000',
    marginBottom: 4,
  },
  userContact: {
    fontSize: 14,
    color: '#666666',
    marginBottom: 2,
  },
  childrenSection: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000000',
  },
  addButton: {
    fontSize: 14,
    fontWeight: '500',
    color: '#000000',
  },
  childCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    backgroundColor: '#F8F8F8',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    marginBottom: 8,
    borderRadius: 8,
  },
  childIcon: {
    fontSize: 20,
    marginRight: 12,
  },
  childInfo: {
    flex: 1,
  },
  childName: {
    fontSize: 16,
    fontWeight: '500',
    color: '#000000',
    marginBottom: 2,
  },
  childDetails: {
    fontSize: 14,
    color: '#666666',
  },
  childEdit: {
    padding: 8,
  },
  childEditText: {
    fontSize: 16,
  },
  menuSection: {
    paddingVertical: 8,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  menuItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuIcon: {
    fontSize: 20,
    marginRight: 12,
    width: 24,
  },
  menuText: {
    fontSize: 16,
    color: '#000000',
  },
  menuArrow: {
    fontSize: 20,
    color: '#666666',
  },
  dangerSection: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  dangerTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000000',
    marginBottom: 12,
  },
  deleteButton: {
    padding: 16,
    backgroundColor: '#FFF0F0',
    borderWidth: 1,
    borderColor: '#FFCCCC',
    alignItems: 'center',
    borderRadius: 8,
  },
  deleteButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FF3B30',
  },
  logoutButton: {
    margin: 20,
    padding: 16,
    backgroundColor: '#F8F8F8',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    alignItems: 'center',
    borderRadius: 8,
  },
  logoutButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FF3B30',
  },
});

export default ProfileScreen;