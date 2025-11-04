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

const PartnerPhoneLoginScreen = () => {
  const navigation = useNavigation();
  const [phone, setPhone] = useState('');
  const [code, setCode] = useState('');
  const [step, setStep] = useState(1); // 1 - ввод телефона, 2 - ввод кода
  const [isLoading, setIsLoading] = useState(false);

  // Форматирование телефона
  const formatPhone = (text: string) => {
    const numbers = text.replace(/\D/g, '');
    if (numbers.length <= 1) return `+7${numbers}`;
    if (numbers.length <= 4) return `+7 (${numbers.slice(1, 4)}`;
    if (numbers.length <= 7) return `+7 (${numbers.slice(1, 4)}) ${numbers.slice(4, 7)}`;
    if (numbers.length <= 9) return `+7 (${numbers.slice(1, 4)}) ${numbers.slice(4, 7)}-${numbers.slice(7, 9)}`;
    return `+7 (${numbers.slice(1, 4)}) ${numbers.slice(4, 7)}-${numbers.slice(7, 9)}-${numbers.slice(9, 11)}`;
  };

  const handleSendCode = () => {
    if (phone.replace(/\D/g, '').length < 11) {
      Alert.alert('Ошибка', 'Введите корректный номер телефона');
      return;
    }
    // Здесь будет API вызов для отправки SMS
    Alert.alert('Код отправлен', `Код отправлен на номер ${phone}`);
    setStep(2);
  };

  const handleVerifyCode = async () => {
    if (code.length !== 4) {
      Alert.alert('Ошибка', 'Введите 4-значный код');
      return;
    }

    setIsLoading(true);
    
    try {
      // Здесь будет API проверки кода
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Создаем mock партнерский токен
      const mockPartnerToken = 'partner_token_' + Date.now();
      
      // Сохраняем партнерский токен
      await SecureStorage.setPartnerToken(mockPartnerToken);
      
      // Создаем mock данные партнера
      const mockPartnerData: PartnerData = {
        id: 'partner_' + Date.now(),
        organizationName: 'Тестовая организация',
        phone: phone,
        email: 'partner@example.com',
        address: 'Москва, ул. Тестовая, 1',
        description: 'Описание деятельности партнера',
        status: 'approved',
        registrationDate: new Date().toISOString(),
      };
      
      // Сохраняем данные партнера
      await SecureStorage.setPartnerData(mockPartnerData);
      
      // Сохраняем настройки приложения
      await SimpleStorage.setAppSettings({
        notifications: true,
        emailNotifications: false,
        location: 'Moscow',
        userType: 'partner',
      });
      
      console.log('Partner login completed, data saved securely');
      
      Alert.alert(
        'Успешно!', 
        'Вход для партнера выполнен!', 
        [
          { 
            text: 'OK', 
            onPress: () => {
              // navigation.navigate('PartnerMain' as never);
              navigation.navigate('PartnerChoice' as never);
            }
          }
        ]
      );
      
    } catch (error) {
      console.error('Partner login failed:', error);
      Alert.alert('Ошибка', 'Не удалось выполнить вход');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Шапка */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Text style={styles.backButtonText}>‹</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Вход для партнеров</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.content}>
          {step === 1 ? (
            <>
              <Text style={styles.titleLarge}>Введите телефон организации</Text>
              <Text style={styles.subtitle}>Мы отправим код в SMS для входа в партнерский аккаунт</Text>
              
              <View style={styles.phoneContainer}>
                <TextInput
                  style={styles.phoneInput}
                  value={phone}
                  onChangeText={(text) => setPhone(formatPhone(text))}
                  keyboardType="phone-pad"
                  placeholder="+7 (999) 999-99-99"
                  maxLength={18}
                />
              </View>

              <TouchableOpacity style={styles.continueButton} onPress={handleSendCode}>
                <Text style={styles.continueButtonText}>Получить код</Text>
              </TouchableOpacity>
            </>
          ) : (
            <>
              <Text style={styles.titleLarge}>Введите код из SMS</Text>
              <Text style={styles.subtitle}>Отправлен на {phone}</Text>
              
              <View style={styles.codeContainer}>
                <TextInput
                  style={styles.codeInput}
                  value={code}
                  onChangeText={setCode}
                  keyboardType="number-pad"
                  placeholder="1234"
                  maxLength={4}
                  textAlign="center"
                />
              </View>

              <TouchableOpacity 
                style={[styles.continueButton, isLoading && styles.continueButtonDisabled]} 
                onPress={handleVerifyCode}
                disabled={isLoading}
              >
                {isLoading ? (
                  <ActivityIndicator color="#FFFFFF" />
                ) : (
                  <Text style={styles.continueButtonText}>Войти в партнерский аккаунт</Text>
                )}
              </TouchableOpacity>

              {isLoading && (
                <Text style={styles.loadingText}>
                  Сохраняем данные безопасно...
                </Text>
              )}

              <TouchableOpacity style={styles.resendButton} onPress={handleSendCode}>
                <Text style={styles.resendText}>Отправить код повторно</Text>
              </TouchableOpacity>
            </>
          )}
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
    justifyContent: 'center',
    alignItems: 'center',
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
    marginBottom: 48,
    textAlign: 'center',
    lineHeight: 22,
  },
  phoneContainer: {
    width: '100%',
    marginBottom: 32,
  },
  phoneInput: {
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 12,
    padding: 16,
    fontSize: 18,
    textAlign: 'center',
    backgroundColor: '#FFFFFF',
  },
  codeContainer: {
    width: '100%',
    marginBottom: 32,
  },
  codeInput: {
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 12,
    padding: 16,
    fontSize: 24,
    fontWeight: '600',
    backgroundColor: '#FFFFFF',
    textAlign: 'center',
  },
  continueButton: {
    backgroundColor: '#000000',
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 12,
    width: '100%',
    alignItems: 'center',
  },
  continueButtonDisabled: {
    backgroundColor: '#666666',
    opacity: 0.7,
  },
  continueButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  resendButton: {
    marginTop: 16,
  },
  resendText: {
    color: '#000000',
    fontSize: 14,
    textDecorationLine: 'underline',
  },
  loadingText: {
    fontSize: 14,
    color: '#666666',
    textAlign: 'center',
    marginTop: 12,
  },
});

export default PartnerPhoneLoginScreen;