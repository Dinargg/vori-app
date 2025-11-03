import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const TermsOfServiceScreen = () => {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Text style={styles.backButtonText}>‹</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Условия использования</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView style={styles.content}>
        <Text style={styles.sectionTitle}>1. Общие положения</Text>
        <Text style={styles.text}>
          1.1. Настоящие Условия использования регулируют отношения между вами (Пользователем) и приложением VORI.
        </Text>
        <Text style={styles.text}>
          1.2. Используя приложение VORI, вы соглашаетесь с настоящими Условиями.
        </Text>

        <Text style={styles.sectionTitle}>2. Описание сервиса</Text>
        <Text style={styles.text}>
          2.1. VORI - это платформа для поиска и бронирования детских занятий, секций и кружков.
        </Text>
        <Text style={styles.text}>
          2.2. Мы предоставляем информацию о доступных занятиях и помогаем организовать запись.
        </Text>

        <Text style={styles.sectionTitle}>3. Регистрация и аккаунт</Text>
        <Text style={styles.text}>
          3.1. Для использования некоторых функций требуется регистрация.
        </Text>
        <Text style={styles.text}>
          3.2. Вы несете ответственность за сохранность своих учетных данных.
        </Text>
        <Text style={styles.text}>
          3.3. Запрещено создавать несколько аккаунтов для одного пользователя.
        </Text>

        <Text style={styles.sectionTitle}>4. Бронирование занятий</Text>
        <Text style={styles.text}>
          4.1. Бронирование создает обязательство по оплате, если иное не указано в условиях конкретного занятия.
        </Text>
        <Text style={styles.text}>
          4.2. Отмена бронирования регулируется правилами конкретного партнера.
        </Text>

        <Text style={styles.sectionTitle}>5. Ответственность</Text>
        <Text style={styles.text}>
          5.1. VORI не несет ответственности за качество предоставляемых партнерами услуг.
        </Text>
        <Text style={styles.text}>
          5.2. Все споры по качеству услуг решаются непосредственно с партнером.
        </Text>

        <Text style={styles.sectionTitle}>6. Изменения условий</Text>
        <Text style={styles.text}>
          6.1. Мы оставляем за собой право изменять настоящие Условия.
        </Text>
        <Text style={styles.text}>
          6.2. Изменения вступают в силу с момента их публикации в приложении.
        </Text>

        <Text style={styles.contact}>
          По вопросам: support@vori.app{'\n'}
          Телефон: +7 (999) 123-45-67
        </Text>
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
    borderBottomColor: '#F0F0F0',
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
  content: {
    flex: 1,
    padding: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#000000',
    marginTop: 24,
    marginBottom: 12,
  },
  text: {
    fontSize: 14,
    color: '#333333',
    lineHeight: 20,
    marginBottom: 8,
  },
  contact: {
    fontSize: 14,
    color: '#666666',
    textAlign: 'center',
    marginTop: 32,
    marginBottom: 40,
    lineHeight: 20,
  },
});

export default TermsOfServiceScreen;