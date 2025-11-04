// src/screens/auth/RegistrationScreen.tsx - ОБНОВЛЕННЫЙ КОД С СОХРАНЕНИЕМ ДАННЫХ
import React, { useState } from 'react';
import { View, StyleSheet, SafeAreaView, ScrollView, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';

// Импорты из папки components/Registration/ - ПРАВИЛЬНЫЙ ПУТЬ!
import RegistrationHeader from '../../components/Registration/RegistrationHeader';
import RegistrationStep1 from '../../components/Registration/RegistrationStep1';
import RegistrationStep2 from '../../components/Registration/RegistrationStep2';
import RegistrationStep3 from '../../components/Registration/RegistrationStep3';
import RegistrationStep4 from '../../components/Registration/RegistrationStep4';

// Сервис хранения
import { SecureStorage, UserData, ChildData } from '../../services/StorageService';

const RegistrationScreen = () => {
  const navigation = useNavigation();
  const [currentStep, setCurrentStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    // Step 1 данные
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    
    // Step 2 данные
    password: '',
    confirmPassword: '',
    
    // Step 3 данные
    childName: '',
    childBirthDate: '',
    childGender: '',
    childHealthInfo: '',
  });

  const updateFormData = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const nextStep = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    } else {
      navigation.goBack();
    }
  };

  // ОБНОВЛЕННАЯ ФУНКЦИЯ - с сохранением данных
  const handleCompleteRegistration = async () => {
    setIsLoading(true);
    
    try {
      // Имитация API вызова для регистрации
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Создаем mock токен (в реальном приложении придет с бэкенда)
      const mockToken = 'mock_jwt_token_' + Date.now();
      
      // Сохраняем токен безопасно
      await SecureStorage.setAuthToken(mockToken);
      
      // Подготавливаем данные пользователя
      const userData: UserData = {
        id: 'user_' + Date.now(),
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        phone: formData.phone,
      };
      
      // Сохраняем данные пользователя
      await SecureStorage.setUserData(userData);
      
      // Если есть данные ребенка - сохраняем их
      if (formData.childName && formData.childBirthDate) {
        const childData: ChildData = {
          id: 'child_' + Date.now(),
          name: formData.childName,
          birthDate: formData.childBirthDate,
          gender: formData.childGender,
          healthInfo: formData.childHealthInfo || '',
        };
        
        await SecureStorage.setChildrenData([childData]);
      }
      
      console.log('Registration completed, data saved securely');
      
      Alert.alert(
        'Регистрация завершена!',
        'Ваш аккаунт успешно создан. Данные сохранены безопасно.',
        [{ 
          text: 'Отлично', 
          onPress: () => navigation.navigate('MainTabs' as never)
        }]
      );
      
    } catch (error) {
      console.error('Registration failed:', error);
      Alert.alert(
        'Ошибка',
        'Не удалось завершить регистрацию. Попробуйте еще раз.'
      );
    } finally {
      setIsLoading(false);
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <RegistrationStep1 
            formData={formData}
            updateFormData={updateFormData}
            nextStep={nextStep}
          />
        );
      case 2:
        return (
          <RegistrationStep2 
            formData={formData}
            updateFormData={updateFormData}
            nextStep={nextStep}
          />
        );
      case 3:
        return (
          <RegistrationStep3 
            formData={formData}
            updateFormData={updateFormData}
            nextStep={nextStep}
          />
        );
      case 4:
        return (
          <RegistrationStep4 
            formData={formData}
            prevStep={prevStep}
            onComplete={handleCompleteRegistration}
            isLoading={isLoading}
          />
        );
      default:
        return null;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <RegistrationHeader 
        step={currentStep} 
        onBack={prevStep} 
      />
      <ScrollView 
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        {renderStep()}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  scrollView: {
    flex: 1,
  },
});

export default RegistrationScreen;