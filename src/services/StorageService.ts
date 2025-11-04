import EncryptedStorage from 'react-native-encrypted-storage';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Ключи для хранения
export const STORAGE_KEYS = {
  // Для физических лиц
  AUTH_TOKEN: 'auth_token',
  USER_DATA: 'user_data', 
  CHILDREN_DATA: 'children_data',
  
  // Для партнеров
  PARTNER_TOKEN: 'partner_token',
  PARTNER_DATA: 'partner_data',
  
  // Общие настройки
  APP_SETTINGS: 'app_settings',
} as const;

// Типы для данных физических лиц
export interface UserData {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
}

export interface ChildData {
  id: string;
  name: string;
  birthDate: string;
  gender: string;
  healthInfo?: string;
}

// Типы для данных партнеров
export interface PartnerData {
  id: string;
  organizationName: string;
  phone: string;
  email: string;
  address: string;
  description: string;
  status: 'pending' | 'approved' | 'rejected';
  registrationDate: string;
}

export interface AppSettings {
  notifications: boolean;
  emailNotifications: boolean;
  location: string;
  userType: 'parent' | 'partner';
}

// Безопасное хранение (шифрование)
export class SecureStorage {
  // === ДЛЯ ФИЗИЧЕСКИХ ЛИЦ ===
  
  // Сохранение токена
  static async setAuthToken(token: string): Promise<void> {
    try {
      await EncryptedStorage.setItem(STORAGE_KEYS.AUTH_TOKEN, token);
      console.log('User auth token saved securely');
    } catch (error) {
      console.error('Failed to save user auth token:', error);
      throw error;
    }
  }

  // Получение токена
  static async getAuthToken(): Promise<string | null> {
    try {
      const token = await EncryptedStorage.getItem(STORAGE_KEYS.AUTH_TOKEN);
      return token;
    } catch (error) {
      console.error('Failed to get user auth token:', error);
      return null;
    }
  }

  // Удаление токена
  static async removeAuthToken(): Promise<void> {
    try {
      await EncryptedStorage.removeItem(STORAGE_KEYS.AUTH_TOKEN);
      console.log('User auth token removed');
    } catch (error) {
      console.error('Failed to remove user auth token:', error);
      throw error;
    }
  }

  // Сохранение пользовательских данных
  static async setUserData(userData: UserData): Promise<void> {
    try {
      await EncryptedStorage.setItem(
        STORAGE_KEYS.USER_DATA, 
        JSON.stringify(userData)
      );
      console.log('User data saved securely');
    } catch (error) {
      console.error('Failed to save user data:', error);
      throw error;
    }
  }

  // Получение пользовательских данных
  static async getUserData(): Promise<UserData | null> {
    try {
      const data = await EncryptedStorage.getItem(STORAGE_KEYS.USER_DATA);
      return data ? JSON.parse(data) : null;
    } catch (error) {
      console.error('Failed to get user data:', error);
      return null;
    }
  }

  // Сохранение данных детей
  static async setChildrenData(children: ChildData[]): Promise<void> {
    try {
      await EncryptedStorage.setItem(
        STORAGE_KEYS.CHILDREN_DATA,
        JSON.stringify(children)
      );
      console.log('Children data saved securely');
    } catch (error) {
      console.error('Failed to save children data:', error);
      throw error;
    }
  }

  // Получение данных детей
  static async getChildrenData(): Promise<ChildData[] | null> {
    try {
      const data = await EncryptedStorage.getItem(STORAGE_KEYS.CHILDREN_DATA);
      return data ? JSON.parse(data) : null;
    } catch (error) {
      console.error('Failed to get children data:', error);
      return null;
    }
  }

  // === ДЛЯ ПАРТНЕРОВ ===

  // Сохранение партнерского токена
  static async setPartnerToken(token: string): Promise<void> {
    try {
      await EncryptedStorage.setItem(STORAGE_KEYS.PARTNER_TOKEN, token);
      console.log('Partner token saved securely');
    } catch (error) {
      console.error('Failed to save partner token:', error);
      throw error;
    }
  }

  // Получение партнерского токена
  static async getPartnerToken(): Promise<string | null> {
    try {
      const token = await EncryptedStorage.getItem(STORAGE_KEYS.PARTNER_TOKEN);
      return token;
    } catch (error) {
      console.error('Failed to get partner token:', error);
      return null;
    }
  }

  // Удаление партнерского токена
  static async removePartnerToken(): Promise<void> {
    try {
      await EncryptedStorage.removeItem(STORAGE_KEYS.PARTNER_TOKEN);
      console.log('Partner token removed');
    } catch (error) {
      console.error('Failed to remove partner token:', error);
      throw error;
    }
  }

  // Сохранение данных партнера
  static async setPartnerData(partnerData: PartnerData): Promise<void> {
    try {
      await EncryptedStorage.setItem(
        STORAGE_KEYS.PARTNER_DATA,
        JSON.stringify(partnerData)
      );
      console.log('Partner data saved securely');
    } catch (error) {
      console.error('Failed to save partner data:', error);
      throw error;
    }
  }

  // Получение данных партнера
  static async getPartnerData(): Promise<PartnerData | null> {
    try {
      const data = await EncryptedStorage.getItem(STORAGE_KEYS.PARTNER_DATA);
      return data ? JSON.parse(data) : null;
    } catch (error) {
      console.error('Failed to get partner data:', error);
      return null;
    }
  }

  // === ОБЩИЕ МЕТОДЫ ===

  // Очистка всех данных
  static async clearAll(): Promise<void> {
    try {
      await EncryptedStorage.clear();
      console.log('All secure data cleared');
    } catch (error) {
      console.error('Failed to clear secure storage:', error);
      throw error;
    }
  }

  // Проверка авторизации
  static async isAuthenticated(): Promise<boolean> {
    const userToken = await this.getAuthToken();
    const partnerToken = await this.getPartnerToken();
    return !!(userToken || partnerToken);
  }

  // Получение типа пользователя
  static async getUserType(): Promise<'parent' | 'partner' | null> {
    const userToken = await this.getAuthToken();
    const partnerToken = await this.getPartnerToken();
    
    if (userToken) return 'parent';
    if (partnerToken) return 'partner';
    return null;
  }
}

// Простое хранилище (для нефункциональных данных)
export class SimpleStorage {
  // Сохранение настроек
  static async setAppSettings(settings: AppSettings): Promise<void> {
    try {
      await AsyncStorage.setItem(
        STORAGE_KEYS.APP_SETTINGS,
        JSON.stringify(settings)
      );
      console.log('App settings saved');
    } catch (error) {
      console.error('Failed to save app settings:', error);
    }
  }

  // Получение настроек
  static async getAppSettings(): Promise<AppSettings | null> {
    try {
      const settings = await AsyncStorage.getItem(STORAGE_KEYS.APP_SETTINGS);
      return settings ? JSON.parse(settings) : null;
    } catch (error) {
      console.error('Failed to get app settings:', error);
      return null;
    }
  }

  // Проверка первого запуска
  static async isFirstLaunch(): Promise<boolean> {
    try {
      const hasLaunched = await AsyncStorage.getItem('has_launched');
      if (!hasLaunched) {
        await AsyncStorage.setItem('has_launched', 'true');
        return true;
      }
      return false;
    } catch (error) {
      console.error('Failed to check first launch:', error);
      return true;
    }
  }
}

export default SecureStorage;