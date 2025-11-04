import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
  Alert,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

// Сервис хранения
import { SecureStorage, PartnerData } from '../../services/StorageService';
import { SimpleStorage } from '../../services/StorageService';

const PartnerRegistrationScreen = () => {
  const navigation = useNavigation();
  const [formData, setFormData] = useState({
    organizationName: '',
    phone: '',
    email: '',
    address: '',
    description: '',
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleRegister = async () => {
    if (!formData.organizationName.trim()) {
      Alert.alert('Ошибка', 'Введите название организации');
      return;
    }
    if (!formData.phone.trim()) {
      Alert.alert('Ошибка', 'Введите телефон');
      return;
    }
    if (!formData.email.includes('@')) {
      Alert.alert('Ошибка', 'Введите корректный email');
      return;
    }
    
    setIsLoading(true);
    
    try {
      // Имитация обработки заявки
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Создаем mock партнерский токен
      const mockPartnerToken = 'partner_token_' + Date.now();
      
      // Сохраняем партнерский токен
      await SecureStorage.setPartnerToken(mockPartnerToken);
      
      // Подготавливаем данные партнера
      const partnerData: PartnerData = {
        id: 'partner_' + Date.now(),
        organizationName: formData.organizationName,
        phone: formData.phone,
        email: formData.email,
        address: formData.address,
        description: formData.description,
        status: 'pending',
        registrationDate: new Date().toISOString(),
      };
      
      // Сохраняем данные партнера
      await SecureStorage.setPartnerData(partnerData);
      
      // Сохраняем настройки приложения
      await SimpleStorage.setAppSettings({
        notifications: true,
        emailNotifications: false,
        location: 'Moscow',
        userType: 'partner',
      });
      
      console.log('Partner registration completed, data saved securely');
      
      Alert.alert(
        'Заявка отправлена!',
        'Мы свяжемся с вами для подтверждения регистрации в течение 24 часов.',
        [{ 
          text: 'OK', 
          onPress: () => navigation.navigate('PartnerChoice' as never) 
        }]
      );
      
    } catch (error) {
      console.error('Partner registration failed:', error);
      Alert.alert(
        'Ошибка',
        'Не удалось отправить заявку. Попробуйте еще раз.'
      );
    } finally {
      setIsLoading(false);
    }
  };

  // Форматирование телефона
  const formatPhone = (text: string) => {
    const numbers = text.replace(/\D/g, '');
    if (numbers.length <= 1) return `+7${numbers}`;
    if (numbers.length <= 4) return `+7 (${numbers.slice(1, 4)}`;
    if (numbers.length <= 7) return `+7 (${numbers.slice(1, 4)}) ${numbers.slice(4, 7)}`;
    if (numbers.length <= 9) return `+7 (${numbers.slice(1, 4)}) ${numbers.slice(4, 7)}-${numbers.slice(7, 9)}`;
    return `+7 (${numbers.slice(1, 4)}) ${numbers.slice(4, 7)}-${numbers.slice(7, 9)}-${numbers.slice(9, 11)}`;
  };

  const updateFormData = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Шапка */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Text style={styles.backButtonText}>‹</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Регистрация партнера</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.content}>
          <Text style={styles.titleLarge}>Стать партнером VORI</Text>
          <Text style={styles.subtitle}>Заполните данные вашей организации</Text>
          
          <View style={styles.form}>
            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Название организации *</Text>
              <TextInput
                style={styles.input}
                value={formData.organizationName}
                onChangeText={(value) => updateFormData('organizationName', value)}
                placeholder="Например: Спортклуб Спартак"
              />
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Телефон для связи *</Text>
              <TextInput
                style={styles.input}
                value={formData.phone}
                onChangeText={(value) => updateFormData('phone', formatPhone(value))}
                keyboardType="phone-pad"
                placeholder="+7 (999) 999-99-99"
                maxLength={18}
              />
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Email *</Text>
              <TextInput
                style={styles.input}
                value={formData.email}
                onChangeText={(value) => updateFormData('email', value)}
                keyboardType="email-address"
                placeholder="email@example.com"
              />
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Адрес</Text>
              <TextInput
                style={styles.input}
                value={formData.address}
                onChangeText={(value) => updateFormData('address', value)}
                placeholder="Адрес проведения занятий"
              />
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Описание деятельности</Text>
              <TextInput
                style={[styles.input, styles.textArea]}
                value={formData.description}
                onChangeText={(value) => updateFormData('description', value)}
                placeholder="Опишите ваши секции, кружки, направления..."
                multiline
                numberOfLines={4}
                textAlignVertical="top"
              />
            </View>

            <Text style={styles.note}>
              * После отправки заявки мы свяжемся с вами для подтверждения регистрации
            </Text>

            <TouchableOpacity 
              style={[styles.registerButton, isLoading && styles.registerButtonDisabled]} 
              onPress={handleRegister}
              disabled={isLoading}
            >
              {isLoading ? (
                <ActivityIndicator color="#FFFFFF" />
              ) : (
                <Text style={styles.registerButtonText}>
                  Отправить заявку
                </Text>
              )}
            </TouchableOpacity>

            {isLoading && (
              <Text style={styles.loadingText}>
                Сохраняем данные безопасно...
              </Text>
            )}
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
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  backButton: {
    padding: 8,
    width: 40,
  },
  backButtonText: {
    fontSize: 24,
    color: '#000000',
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000000',
  },
  placeholder: {
    width: 40,
  },
  scrollContainer: {
    flexGrow: 1,
  },
  content: {
    flex: 1,
    padding: 24,
  },
  titleLarge: {
    fontSize: 24,
    fontWeight: '700',
    color: '#000000',
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#666666',
    marginBottom: 32,
    textAlign: 'center',
  },
  form: {
    width: '100%',
  },
  inputContainer: {
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000000',
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    backgroundColor: '#FFFFFF',
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  note: {
    fontSize: 12,
    color: '#666666',
    textAlign: 'center',
    marginBottom: 20,
    lineHeight: 16,
  },
  registerButton: {
    backgroundColor: '#000000',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  registerButtonDisabled: {
    backgroundColor: '#666666',
    opacity: 0.7,
  },
  registerButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  loadingText: {
    fontSize: 14,
    color: '#666666',
    textAlign: 'center',
    marginTop: 12,
  },
});

export default PartnerRegistrationScreen;