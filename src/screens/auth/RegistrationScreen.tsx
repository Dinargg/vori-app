// src/screens/auth/RegistrationScreen.tsx - ПОЛНЫЙ ОБНОВЛЕННЫЙ КОД
import React, { useState } from 'react';
import { View, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';

// Импорты из папки components/Registration/ - ПРАВИЛЬНЫЙ ПУТЬ!
import RegistrationHeader from '../../components/Registration/RegistrationHeader';
import RegistrationStep1 from '../../components/Registration/RegistrationStep1';
import RegistrationStep2 from '../../components/Registration/RegistrationStep2';
import RegistrationStep3 from '../../components/Registration/RegistrationStep3';
import RegistrationStep4 from '../../components/Registration/RegistrationStep4';

const RegistrationScreen = () => {
  const navigation = useNavigation();
  const [currentStep, setCurrentStep] = useState(1);
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

  // ОБНОВЛЕННАЯ ФУНКЦИЯ - теперь ведет на MainTabs
  const handleCompleteRegistration = () => {
    // Здесь будет API вызов для завершения регистрации
    navigation.navigate('MainTabs' as never);
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