import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import InputField from './InputField';

const RegistrationStep2 = ({ formData, updateFormData, nextStep }) => {
  const [passwordStrength, setPasswordStrength] = useState(0);

  // Валидация пароля
  const validatePassword = (password: string) => {
    let strength = 0;
    if (password.length >= 8) strength += 1;
    if (/[A-Z]/.test(password)) strength += 1;
    if (/[a-z]/.test(password)) strength += 1;
    if (/[0-9]/.test(password)) strength += 1;
    if (/[^A-Za-z0-9]/.test(password)) strength += 1;
    setPasswordStrength(strength);
  };

  const handlePasswordChange = (value: string) => {
    updateFormData('password', value);
    validatePassword(value);
  };

  const PasswordStrength = () => (
    <View style={styles.passwordStrength}>
      <View style={styles.strengthBars}>
        {[1, 2, 3, 4, 5].map((index) => (
          <View
            key={index}
            style={[
              styles.strengthBar,
              index <= passwordStrength && styles[`strength${passwordStrength}`]
            ]}
          />
        ))}
      </View>
      <Text style={styles.strengthText}>
        {passwordStrength === 0 && 'Введите пароль'}
        {passwordStrength === 1 && 'Очень слабый'}
        {passwordStrength === 2 && 'Слабый'}
        {passwordStrength === 3 && 'Средний'}
        {passwordStrength === 4 && 'Сильный'}
        {passwordStrength === 5 && 'Очень сильный'}
      </Text>
    </View>
  );

  const handleNext = () => {
    if (passwordStrength < 3) {
      Alert.alert('Слабый пароль', 'Пароль должен содержать минимум 8 символов, включая заглавные и строчные буквы, цифры');
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      Alert.alert('Ошибка', 'Пароли не совпадают');
      return;
    }
    nextStep();
  };

  return (
    <View style={styles.step}>
      <Text style={styles.stepTitle}>Безопасность</Text>
      
      <InputField
        label="Пароль"
        value={formData.password}
        onChange={handlePasswordChange}
        secure={true}
      />

      <PasswordStrength />

      <InputField
        label="Подтвердите пароль"
        value={formData.confirmPassword}
        onChange={(value) => updateFormData('confirmPassword', value)}
        secure={true}
      />

      <Text style={styles.securityTips}>
        🔒 Пароль должен содержать:{'\n'}
        • Минимум 8 символов{'\n'}
        • Заглавные и строчные буквы{'\n'}
        • Цифры и специальные символы
      </Text>

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
  passwordStrength: {
    marginBottom: 20,
  },
  strengthBars: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  strengthBar: {
    flex: 1,
    height: 4,
    backgroundColor: '#E0E0E0',
    marginHorizontal: 2,
    borderRadius: 2,
  },
  strength1: { backgroundColor: '#FF3B30' },
  strength2: { backgroundColor: '#FF9500' },
  strength3: { backgroundColor: '#FFCC00' },
  strength4: { backgroundColor: '#4CD964' },
  strength5: { backgroundColor: '#007AFF' },
  strengthText: {
    fontSize: 12,
    color: '#666666',
    textAlign: 'center',
  },
  securityTips: {
    fontSize: 12,
    color: '#666666',
    backgroundColor: '#F8F8F8',
    padding: 12,
    borderRadius: 8,
    marginBottom: 20,
    textAlign: 'center',
    lineHeight: 18,
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

export default RegistrationStep2;