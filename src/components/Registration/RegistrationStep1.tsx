import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import InputField from './InputField';

const RegistrationStep1 = ({ formData, updateFormData, nextStep }) => {
  
  // Форматирование телефона
  const formatPhone = (text: string) => {
    const numbers = text.replace(/\D/g, '');
    if (numbers.length <= 1) return `+7${numbers}`;
    if (numbers.length <= 4) return `+7 (${numbers.slice(1, 4)}`;
    if (numbers.length <= 7) return `+7 (${numbers.slice(1, 4)}) ${numbers.slice(4, 7)}`;
    if (numbers.length <= 9) return `+7 (${numbers.slice(1, 4)}) ${numbers.slice(4, 7)}-${numbers.slice(7, 9)}`;
    return `+7 (${numbers.slice(1, 4)}) ${numbers.slice(4, 7)}-${numbers.slice(7, 9)}-${numbers.slice(9, 11)}`;
  };

  const handleNext = () => {
    if (!formData.firstName.trim()) {
      Alert.alert('Ошибка', 'Введите имя');
      return;
    }
    if (!formData.lastName.trim()) {
      Alert.alert('Ошибка', 'Введите фамилию');
      return;
    }
    if (!formData.email.includes('@')) {
      Alert.alert('Ошибка', 'Введите корректный email');
      return;
    }
    if (formData.phone.replace(/\D/g, '').length < 11) {
      Alert.alert('Ошибка', 'Введите корректный номер телефона');
      return;
    }
    nextStep();
  };

  return (
    <View style={styles.step}>
      <Text style={styles.stepTitle}>Контактные данные</Text>
      
      <InputField
        label="Имя"
        value={formData.firstName}
        onChange={(value) => updateFormData('firstName', value)}
      />
      
      <InputField
        label="Фамилия"
        value={formData.lastName}
        onChange={(value) => updateFormData('lastName', value)}
      />
      
      <InputField
        label="Электронная почта"
        value={formData.email}
        onChange={(value) => updateFormData('email', value)}
        keyboardType="email-address"
      />
      
      <InputField
        label="Телефон"
        value={formData.phone}
        onChange={(value) => updateFormData('phone', formatPhone(value))}
        keyboardType="phone-pad"
        maxLength={18}
      />

      <TouchableOpacity style={styles.continueButton} onPress={handleNext}>
        <Text style={styles.continueButtonText}>Продолжить</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  step: {
    padding: 24,
  },
  stepTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#000000',
    marginBottom: 32,
    textAlign: 'center',
  },
  continueButton: {
    backgroundColor: '#000000',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 20,
  },
  continueButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default RegistrationStep1;