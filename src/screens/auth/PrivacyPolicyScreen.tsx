import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const PrivacyPolicyScreen = () => {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Text style={styles.backButtonText}>‹</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Политика конфиденциальности</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView style={styles.content}>
        <Text style={styles.sectionTitle}>1. Сбор информации</Text>
        <Text style={styles.text}>
          1.1. Мы собираем информацию, которую вы предоставляете при регистрации: имя, email, телефон, данные ребенка.
        </Text>
        <Text style={styles.text}>
          1.2. Автоматически собираем данные об использовании приложения для улучшения сервиса.
        </Text>

        <Text style={styles.sectionTitle}>2. Использование информации</Text>
        <Text style={styles.text}>
          2.1. Для предоставления услуг бронирования занятий.
        </Text>
        <Text style={styles.text}>
          2.2. Для связи с вами по вопросам бронирований и уведомлений.
        </Text>
        <Text style={styles.text}>
          2.3. Для улучшения работы приложения и разработки новых функций.
        </Text>

        <Text style={styles.sectionTitle}>3. Защита данных</Text>
        <Text style={styles.text}>
          3.1. Мы принимаем меры для защиты ваших персональных данных.
        </Text>
        <Text style={styles.text}>
          3.2. Данные передаются по защищенным каналам связи.
        </Text>
        <Text style={styles.text}>
          3.3. Доступ к данным имеют только уполномоченные сотрудники.
        </Text>

        <Text style={styles.sectionTitle}>4. Передача данных третьим лицам</Text>
        <Text style={styles.text}>
          4.1. Мы не передаем ваши персональные данные третьим лицам, за исключением:
        </Text>
        <Text style={styles.text}>
          - Партнерам для организации занятий (только необходимая информация)
        </Text>
        <Text style={styles.text}>
          - По требованию законодательства
        </Text>

        <Text style={styles.sectionTitle}>5. Данные детей</Text>
        <Text style={styles.text}>
          5.1. Мы осознаем особую важность защиты данных детей.
        </Text>
        <Text style={styles.text}>
          5.2. Данные детей собираются и обрабатываются только с согласия родителей.
        </Text>
        <Text style={styles.text}>
          5.3. Мы не используем данные детей для маркетинговых целей.
        </Text>

        <Text style={styles.sectionTitle}>6. Ваши права</Text>
        <Text style={styles.text}>
          6.1. Вы можете запросить информацию о хранящихся о вас данных.
        </Text>
        <Text style={styles.text}>
          6.2. Вы можете потребовать удалить ваши данные.
        </Text>
        <Text style={styles.text}>
          6.3. Вы можете отказаться от получения уведомлений.
        </Text>

        <Text style={styles.sectionTitle}>7. Cookies и аналогичные технологии</Text>
        <Text style={styles.text}>
          7.1. Мы используем cookies для работы приложения и аналитики.
        </Text>

        <Text style={styles.contact}>
          Вопросы по защите данных: privacy@vori.app{'\n'}
          Последнее обновление: {new Date().getFullYear()}
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

export default PrivacyPolicyScreen;