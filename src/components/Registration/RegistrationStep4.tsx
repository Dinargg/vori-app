// src/components/Registration/RegistrationStep4.tsx - ПОЛНЫЙ ОБНОВЛЕННЫЙ КОД
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, ScrollView } from 'react-native';

const RegistrationStep4 = ({ formData, prevStep, onComplete }) => {

  const handleComplete = () => {
    Alert.alert(
      'Регистрация завершена!',
      'Ваш аккаунт успешно создан. Теперь вы можете найти занятия для вашего ребенка.',
      [{ 
        text: 'Отлично', 
        onPress: () => onComplete()
      }]
    );
  };

  return (
    <ScrollView style={styles.step}>
      <Text style={styles.stepTitle}>Проверьте данные</Text>
      
      <View style={styles.summaryCard}>
        <Text style={styles.sectionTitle}>Контактные данные</Text>
        <View style={styles.dataRow}>
          <Text style={styles.dataLabel}>Имя:</Text>
          <Text style={styles.dataValue}>{formData.firstName}</Text>
        </View>
        <View style={styles.dataRow}>
          <Text style={styles.dataLabel}>Фамилия:</Text>
          <Text style={styles.dataValue}>{formData.lastName}</Text>
        </View>
        <View style={styles.dataRow}>
          <Text style={styles.dataLabel}>Email:</Text>
          <Text style={styles.dataValue}>{formData.email}</Text>
        </View>
        <View style={styles.dataRow}>
          <Text style={styles.dataLabel}>Телефон:</Text>
          <Text style={styles.dataValue}>{formData.phone}</Text>
        </View>
      </View>

      <View style={styles.summaryCard}>
        <Text style={styles.sectionTitle}>Данные ребенка</Text>
        <View style={styles.dataRow}>
          <Text style={styles.dataLabel}>Имя ребенка:</Text>
          <Text style={styles.dataValue}>{formData.childName}</Text>
        </View>
        <View style={styles.dataRow}>
          <Text style={styles.dataLabel}>Дата рождения:</Text>
          <Text style={styles.dataValue}>{formData.childBirthDate}</Text>
        </View>
        <View style={styles.dataRow}>
          <Text style={styles.dataLabel}>Пол:</Text>
          <Text style={styles.dataValue}>
            {formData.childGender === 'female' ? 'Девочка' : 
             formData.childGender === 'male' ? 'Мальчик' : 'Не указан'}
          </Text>
        </View>
        <View style={styles.dataRow}>
          <Text style={styles.dataLabel}>Особенности здоровья:</Text>
          <Text style={styles.dataValue}>
            {formData.childHealthInfo || 'Не указаны'}
          </Text>
        </View>
      </View>

      <Text style={styles.agreementText}>
        Нажимая «Завершить регистрацию», вы соглашаетесь с {'\n'}
        <Text style={styles.link}>Условиями использования</Text> и {' '}
        <Text style={styles.link}>Политикой конфиденциальности</Text>
      </Text>

      <TouchableOpacity style={styles.completeButton} onPress={handleComplete}>
        <Text style={styles.completeButtonText}>Завершить регистрацию</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.backButton} onPress={prevStep}>
        <Text style={styles.backButtonText}>Вернуться назад</Text>
      </TouchableOpacity>
    </ScrollView>
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
  summaryCard: {
    backgroundColor: '#F8F8F8',
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000000',
    marginBottom: 12,
  },
  dataRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  dataLabel: {
    fontSize: 14,
    color: '#666666',
    flex: 1,
  },
  dataValue: {
    fontSize: 14,
    color: '#000000',
    fontWeight: '500',
    flex: 1,
    textAlign: 'right',
  },
  agreementText: {
    fontSize: 12,
    color: '#666666',
    textAlign: 'center',
    marginVertical: 20,
    lineHeight: 16,
  },
  link: {
    color: '#000000',
    textDecorationLine: 'underline',
  },
  completeButton: {
    backgroundColor: '#000000',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 12,
  },
  completeButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  backButton: {
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    marginBottom: 40,
  },
  backButtonText: {
    color: '#666666',
    fontSize: 16,
    fontWeight: '500',
  },
});

export default RegistrationStep4;