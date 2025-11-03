import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, ScrollView } from 'react-native';
import InputField from './InputField';

const RegistrationStep3 = ({ formData, updateFormData, nextStep }) => {

  const handleNext = () => {
    if (!formData.childName.trim()) {
      Alert.alert('Ошибка', 'Введите имя ребенка');
      return;
    }
    if (!formData.childBirthDate.trim()) {
      Alert.alert('Ошибка', 'Введите дату рождения ребенка');
      return;
    }
    if (!formData.childGender.trim()) {
      Alert.alert('Ошибка', 'Выберите пол ребенка');
      return;
    }
    nextStep();
  };

  // Функция для форматирования даты
  const formatDate = (text: string) => {
    const numbers = text.replace(/\D/g, '');
    if (numbers.length <= 2) return numbers;
    if (numbers.length <= 4) return `${numbers.slice(0, 2)}.${numbers.slice(2, 4)}`;
    return `${numbers.slice(0, 2)}.${numbers.slice(2, 4)}.${numbers.slice(4, 8)}`;
  };

  return (
    <ScrollView style={styles.step} showsVerticalScrollIndicator={false}>
      <Text style={styles.stepTitle}>Данные ребенка</Text>
      
      {/* Имя ребенка */}
      <View style={styles.fieldGroup}>
        <Text style={styles.fieldLabel}>Имя ребенка</Text>
        <InputField
          label=""
          value={formData.childName}
          onChange={(value) => updateFormData('childName', value)}
          placeholder="Введите имя ребенка"
        />
      </View>

      {/* Дата рождения */}
      <View style={styles.fieldGroup}>
        <Text style={styles.fieldLabel}>Дата рождения</Text>
        <InputField
          label=""
          value={formData.childBirthDate}
          onChange={(value) => updateFormData('childBirthDate', formatDate(value))}
          placeholder="ДД.ММ.ГГГГ"
          keyboardType="numbers-and-punctuation"
          maxLength={10}
        />
        <Text style={styles.hintText}>Например: 15.03.2018</Text>
      </View>
      
      {/* Пол ребенка */}
      <View style={styles.fieldGroup}>
        <Text style={styles.fieldLabel}>Пол ребенка</Text>
        <View style={styles.genderContainer}>
          <TouchableOpacity 
            style={[
              styles.genderOption,
              formData.childGender === 'female' && styles.genderOptionSelected
            ]}
            onPress={() => updateFormData('childGender', 'female')}
          >
            <View style={[
              styles.radioCircle,
              formData.childGender === 'female' && styles.radioCircleSelected
            ]}>
              {formData.childGender === 'female' && <View style={styles.radioInner} />}
            </View>
            <Text style={styles.genderText}>Девочка</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[
              styles.genderOption,
              formData.childGender === 'male' && styles.genderOptionSelected
            ]}
            onPress={() => updateFormData('childGender', 'male')}
          >
            <View style={[
              styles.radioCircle,
              formData.childGender === 'male' && styles.radioCircleSelected
            ]}>
              {formData.childGender === 'male' && <View style={styles.radioInner} />}
            </View>
            <Text style={styles.genderText}>Мальчик</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Особенности здоровья */}
      <View style={styles.fieldGroup}>
        <Text style={styles.fieldLabel}>Особенности здоровья</Text>
        <InputField
          label=""
          value={formData.childHealthInfo}
          onChange={(value) => updateFormData('childHealthInfo', value)}
          placeholder="Аллергии, ограничения, особенности развития"
        />
        <Text style={styles.hintText}>
          Эта информация поможет подобрать безопасные занятия. Указывается по желанию.
        </Text>
      </View>

      {/* Кнопка продолжения */}
      <TouchableOpacity style={styles.continueButton} onPress={handleNext}>
        <Text style={styles.continueButtonText}>Продолжить</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  step: {
    flex: 1,
    padding: 24,
    backgroundColor: '#FFFFFF',
  },
  stepTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#000000',
    marginBottom: 32,
    textAlign: 'center',
  },
  fieldGroup: {
    marginBottom: 32,
  },
  fieldLabel: {
    fontSize: 17,
    fontWeight: '600',
    color: '#000000',
    marginBottom: 16, // Увеличил отступ
  },
  hintText: {
    fontSize: 14,
    color: '#8E8E93',
    marginTop: 12, // Увеличил отступ
    lineHeight: 18,
    marginLeft: 4, // Добавил отступ слева чтобы буквы не обрезались
  },
  genderContainer: {
    gap: 12,
  },
  genderOption: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 18, // Увеличил padding
    borderWidth: 1,
    borderColor: '#E5E5EA',
    borderRadius: 12,
    backgroundColor: '#FFFFFF',
  },
  genderOptionSelected: {
    borderColor: '#000000',
    backgroundColor: '#F8F8F8',
  },
  radioCircle: {
    width: 22, // Увеличил размер
    height: 22, // Увеличил размер
    borderRadius: 11,
    borderWidth: 2,
    borderColor: '#C7C7CC',
    marginRight: 14, // Увеличил отступ
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioCircleSelected: {
    borderColor: '#000000',
  },
  radioInner: {
    width: 12, // Увеличил размер
    height: 12, // Увеличил размер
    borderRadius: 6,
    backgroundColor: '#000000',
  },
  genderText: {
    fontSize: 16,
    color: '#000000',
    fontWeight: '500',
  },
  continueButton: {
    backgroundColor: '#000000',
    paddingVertical: 18, // Увеличил padding
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 24, // Увеличил отступ
  },
  continueButtonText: {
    color: '#FFFFFF',
    fontSize: 17, // Увеличил размер шрифта
    fontWeight: '600',
  },
});

export default RegistrationStep3;