// App.tsx - ОБНОВЛЕННЫЙ КОД С ERROR BOUNDARY
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StyleSheet, LogBox } from 'react-native';
import { House, Calendar, User, MagnifyingGlass } from 'phosphor-react-native';

// Error Boundary
import ErrorBoundary from './src/components/ErrorBoundary/ErrorBoundary';

// ВКЛЮЧАЕМ ЛОГИРОВАНИЕ ВСЕХ ОШИБОК
LogBox.ignoreAllLogs(false); // Показывать ВСЕ логи и предупреждения

// Auth screens
import LoginScreen from './src/screens/auth/LoginScreen';
import PhoneLoginScreen from './src/screens/auth/PhoneLoginScreen';
import RegistrationScreen from './src/screens/auth/RegistrationScreen';
import TermsOfServiceScreen from './src/screens/auth/TermsOfServiceScreen';
import PrivacyPolicyScreen from './src/screens/auth/PrivacyPolicyScreen';

// Partner screens
import PartnerChoiceScreen from './src/screens/partners/PartnerChoiceScreen';
import PartnerPhoneLoginScreen from './src/screens/partners/PartnerPhoneLoginScreen';
import PartnerRegistrationScreen from './src/screens/partners/PartnerRegistrationScreen';

// Main screens
import MainScreen from './src/screens/main/MainScreen';
import ActivitiesScreen from './src/screens/main/ActivitiesScreen';
import BookingsScreen from './src/screens/main/BookingsScreen';
import ProfileScreen from './src/screens/main/ProfileScreen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

// Custom VORI icon component for the main tab
const VoriIcon = ({ color, size }: { color: string; size: number }) => (
  <House size={size} color={color} weight="fill" />
);

function MainTabs() {
  console.log('MainTabs component rendered'); // Лог для отладки
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: styles.tabBar,
        tabBarActiveTintColor: '#000000',
        tabBarInactiveTintColor: '#8E8E93',
        tabBarLabelStyle: styles.tabBarLabel,
        headerShown: false,
      }}
    >
      <Tab.Screen
        name="MainTab"
        component={MainScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <VoriIcon color={color} size={size} />
          ),
          tabBarLabel: 'Главная',
        }}
      />
      <Tab.Screen
        name="ActivitiesTab"
        component={ActivitiesScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MagnifyingGlass size={size} color={color} />
          ),
          tabBarLabel: 'Поиск',
        }}
      />
      <Tab.Screen
        name="BookingsTab"
        component={BookingsScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Calendar size={size} color={color} />
          ),
          tabBarLabel: 'Записи',
        }}
      />
      <Tab.Screen
        name="ProfileTab"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <User size={size} color={color} />
          ),
          tabBarLabel: 'Профиль',
        }}
      />
    </Tab.Navigator>
  );
}

const App = () => {
  console.log('App component rendered'); // Лог для отладки
  return (
    <ErrorBoundary>
      <NavigationContainer>
        <Stack.Navigator 
          initialRouteName="Login"
          screenOptions={{ 
            headerShown: false,
            animation: 'slide_from_right'
          }}
        >
          {/* Auth Screens */}
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Registration" component={RegistrationScreen} />
          <Stack.Screen name="PhoneLogin" component={PhoneLoginScreen} />
          <Stack.Screen name="TermsOfService" component={TermsOfServiceScreen} />
          <Stack.Screen name="PrivacyPolicy" component={PrivacyPolicyScreen} />
          
          {/* Partner Screens */}
          <Stack.Screen name="PartnerChoice" component={PartnerChoiceScreen} />
          <Stack.Screen name="PartnerPhoneLogin" component={PartnerPhoneLoginScreen} />
          <Stack.Screen name="PartnerRegistration" component={PartnerRegistrationScreen} />
          
          {/* Main Tabs */}
          <Stack.Screen name="MainTabs" component={MainTabs} />
          
          {/* Individual Main Screens (for direct navigation) */}
          <Stack.Screen name="Main" component={MainScreen} />
          <Stack.Screen name="Activities" component={ActivitiesScreen} />
          <Stack.Screen name="Bookings" component={BookingsScreen} />
          <Stack.Screen name="Profile" component={ProfileScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </ErrorBoundary>
  );
};

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#F2F2F7',
    height: 60,
    paddingBottom: 8,
    paddingTop: 8,
  },
  tabBarLabel: {
    fontSize: 12,
    fontWeight: '500',
    marginTop: 2,
  },
});

export default App;