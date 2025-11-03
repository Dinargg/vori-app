// src/screens/auth/LoginScreen.tsx - ПОЛНЫЙ ОБНОВЛЕННЫЙ КОД
import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const LoginScreen = () => {
  const navigation = useNavigation();

  const handleTermsPress = () => {
    navigation.navigate('TermsOfService' as never);
  };

  const handlePrivacyPress = () => {
    navigation.navigate('PrivacyPolicy' as never);
  };

  // ОБНОВЛЕННЫЙ ПЕРЕХОД - Теперь ведет на PhoneLogin
  const handlePhoneLogin = () => {
    navigation.navigate('PhoneLogin' as never);
  };

  const handleRegistration = () => {
    navigation.navigate('Registration' as never);
  };

  const handlePartnerLogin = () => {
    navigation.navigate('PartnerChoice' as never);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.logo}>VORI</Text>
          <Text style={styles.subtitle}>детские активности</Text>
        </View>

        {/* Content */}
        <View style={styles.content}>
          <Text style={styles.welcome}>Найдите занятия{"\n"}для вашего ребенка</Text>
          
          <View style={styles.buttonsContainer}>
            <TouchableOpacity 
              style={styles.primaryButton}
              onPress={handlePhoneLogin}
            >
              <Text style={styles.primaryButtonText}>Войти по телефону</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.secondaryButton}
              onPress={handleRegistration}
            >
              <Text style={styles.secondaryButtonText}>Создать аккаунт</Text>
            </TouchableOpacity>
          </View>

          {/* Кнопка для партнеров */}
          <TouchableOpacity 
            style={styles.partnerButton}
            onPress={handlePartnerLogin}
          >
            <Text style={styles.partnerButtonText}>Вход для партнеров</Text>
          </TouchableOpacity>
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>
            Нажимая «Создать аккаунт», вы принимаете {'\n'}
            <Text style={styles.link} onPress={handleTermsPress}>Условия использования</Text> и {' '}
            <Text style={styles.link} onPress={handlePrivacyPress}>Политику конфиденциальности</Text>
          </Text>
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
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'space-between',
  },
  header: {
    alignItems: 'center',
    paddingTop: 60,
    paddingBottom: 40,
  },
  logo: {
    fontSize: 32,
    fontWeight: '700',
    color: '#000000',
    letterSpacing: 1,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: '#8E8E93',
    fontWeight: '400',
    letterSpacing: 0.5,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  welcome: {
    fontSize: 24,
    fontWeight: '600',
    color: '#000000',
    textAlign: 'center',
    lineHeight: 32,
    marginBottom: 48,
  },
  buttonsContainer: {
    width: '100%',
    marginBottom: 32,
  },
  primaryButton: {
    backgroundColor: '#000000',
    paddingVertical: 16,
    alignItems: 'center',
    marginBottom: 12,
    borderRadius: 8,
  },
  primaryButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  secondaryButton: {
    backgroundColor: '#FFFFFF',
    paddingVertical: 16,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#000000',
    borderRadius: 8,
  },
  secondaryButtonText: {
    color: '#000000',
    fontSize: 16,
    fontWeight: '600',
  },
  partnerButton: {
    paddingVertical: 12,
    paddingHorizontal: 24,
  },
  partnerButtonText: {
    color: '#000000',
    fontSize: 14,
    fontWeight: '500',
    textDecorationLine: 'underline',
  },
  footer: {
    padding: 24,
    alignItems: 'center',
  },
  footerText: {
    fontSize: 12,
    color: '#8E8E93',
    textAlign: 'center',
    lineHeight: 16,
  },
  link: {
    color: '#000000',
    textDecorationLine: 'underline',
  },
});

export default LoginScreen;