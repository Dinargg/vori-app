import { 
  ApiResponse, User, Activity, Booking, Favorite, 
  Child, Partner, ScheduleSlot 
} from '../types/api';

interface IApiService {
  // Auth
  login(phone: string): Promise<ApiResponse<{ user: User; token: string }>>;
  registerParent(userData: any): Promise<ApiResponse<User>>;
  registerPartner(partnerData: any): Promise<ApiResponse<Partner>>;
  verifyPhone(phone: string, code: string): Promise<ApiResponse<{ user: User; token: string }>>;
  
  // Activities
  getActivities(filters?: any): Promise<ApiResponse<Activity[]>>;
  getActivity(id: string): Promise<ApiResponse<Activity>>;
  searchActivities(query: string, filters?: any): Promise<ApiResponse<Activity[]>>;
  
  // Bookings
  createBooking(bookingData: any): Promise<ApiResponse<Booking>>;
  getBookings(userId: string, status?: string): Promise<ApiResponse<Booking[]>>;
  cancelBooking(bookingId: string): Promise<ApiResponse<void>>;
  
  // Favorites
  addFavorite(activityId: string): Promise<ApiResponse<Favorite>>;
  removeFavorite(activityId: string): Promise<ApiResponse<void>>;
  getFavorites(): Promise<ApiResponse<Activity[]>>;
  
  // User
  getCurrentUser(): Promise<ApiResponse<User>>;
  updateUser(userData: Partial<User>): Promise<ApiResponse<User>>;
  getChildren(): Promise<ApiResponse<Child[]>>;
  addChild(childData: Omit<Child, 'id'>): Promise<ApiResponse<Child>>;
}

class MockApiService implements IApiService {
  private delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  // Mock данные
  private mockUsers: User[] = [
    {
      id: 'user_1',
      phone: '+79991234567',
      email: 'parent@example.com',
      first_name: 'Анна',
      last_name: 'Иванова',
      user_type: 'parent',
      created_at: new Date().toISOString(),
    }
  ];

  private mockActivities: Activity[] = [
    {
      id: 'activity_1',
      name: 'Футбольная тренировка',
      category: 'sport',
      description: 'Профессиональные тренировки для детей от опытных тренеров',
      age_range: { min: 5, max: 12 },
      price: 800,
      duration: 90,
      location: {
        address: 'Москва, ул. Спортивная, 15',
        coordinates: { lat: 55.7558, lng: 37.6173 }
      },
      partner_id: 'partner_1',
      images: ['https://via.placeholder.com/300x200/4A90E2/FFFFFF?text=Футбол'],
      rating: 4.8,
      review_count: 124,
      available_slots: 5,
      schedule: [
        { day: 'monday', time: '16:00', duration: 90, available_slots: 3 },
        { day: 'wednesday', time: '16:00', duration: 90, available_slots: 2 }
      ]
    },
    {
      id: 'activity_2',
      name: 'Художественная студия',
      category: 'art',
      description: 'Рисование и лепка для развития творческих способностей',
      age_range: { min: 4, max: 10 },
      price: 600,
      duration: 60,
      location: {
        address: 'Москва, ул. Искусств, 8',
        coordinates: { lat: 55.7517, lng: 37.6178 }
      },
      partner_id: 'partner_2',
      images: ['https://via.placeholder.com/300x200/9C27B0/FFFFFF?text=Рисование'],
      rating: 4.6,
      review_count: 89,
      available_slots: 8,
      schedule: [
        { day: 'tuesday', time: '14:00', duration: 60, available_slots: 5 },
        { day: 'thursday', time: '14:00', duration: 60, available_slots: 3 }
      ]
    }
  ];

  private mockBookings: Booking[] = [];
  private mockFavorites: Favorite[] = [];

  // Auth methods
  async login(phone: string): Promise<ApiResponse<{ user: User; token: string }>> {
    await this.delay(1000);
    
    const user = this.mockUsers.find(u => u.phone === phone);
    if (!user) {
      return { success: false, error: 'Пользователь не найден' };
    }

    return {
      success: true,
      data: {
        user,
        token: 'mock_jwt_token_' + Date.now()
      }
    };
  }

  async registerParent(userData: any): Promise<ApiResponse<User>> {
    await this.delay(1500);
    
    const newUser: User = {
      id: 'user_' + Date.now(),
      phone: userData.phone,
      email: userData.email,
      first_name: userData.first_name,
      last_name: userData.last_name,
      user_type: 'parent',
      created_at: new Date().toISOString(),
    };

    this.mockUsers.push(newUser);
    return { success: true, data: newUser };
  }

  async verifyPhone(phone: string, code: string): Promise<ApiResponse<{ user: User; token: string }>> {
    await this.delay(800);
    
    if (code !== '1234') {
      return { success: false, error: 'Неверный код' };
    }

    const user = this.mockUsers.find(u => u.phone === phone) || {
      id: 'user_' + Date.now(),
      phone,
      email: '',
      first_name: '',
      last_name: '',
      user_type: 'parent',
      created_at: new Date().toISOString(),
    };

    return {
      success: true,
      data: {
        user,
        token: 'mock_jwt_token_' + Date.now()
      }
    };
  }

  // Activities methods
  async getActivities(filters?: any): Promise<ApiResponse<Activity[]>> {
    await this.delay(800);
    
    let activities = [...this.mockActivities];

    if (filters?.category) {
      activities = activities.filter(a => a.category === filters.category);
    }

    if (filters?.age) {
      const [minAge, maxAge] = filters.age.split('-').map(Number);
      activities = activities.filter(a => 
        a.age_range.min <= maxAge && a.age_range.max >= minAge
      );
    }

    return { success: true, data: activities };
  }

  async getActivity(id: string): Promise<ApiResponse<Activity>> {
    await this.delay(600);
    
    const activity = this.mockActivities.find(a => a.id === id);
    if (!activity) {
      return { success: false, error: 'Занятие не найдено' };
    }

    return { success: true, data: activity };
  }

  async searchActivities(query: string, filters?: any): Promise<ApiResponse<Activity[]>> {
    await this.delay(700);
    
    let activities = this.mockActivities.filter(activity =>
      activity.name.toLowerCase().includes(query.toLowerCase()) ||
      activity.description.toLowerCase().includes(query.toLowerCase()) ||
      activity.category.toLowerCase().includes(query.toLowerCase())
    );

    if (filters?.category) {
      activities = activities.filter(a => a.category === filters.category);
    }

    return { success: true, data: activities };
  }

  // Bookings methods
  async createBooking(bookingData: any): Promise<ApiResponse<Booking>> {
    await this.delay(1200);
    
    const activity = this.mockActivities.find(a => a.id === bookingData.activity_id);
    if (!activity) {
      return { success: false, error: 'Занятие не найдено' };
    }

    const booking: Booking = {
      id: `booking_${Date.now()}`,
      activity_id: bookingData.activity_id,
      child_id: bookingData.child_id,
      user_id: bookingData.user_id,
      schedule_slot: bookingData.schedule_slot,
      date: bookingData.date,
      status: 'confirmed',
      total_price: activity.price,
      created_at: new Date().toISOString(),
      activity: activity
    };

    this.mockBookings.push(booking);
    return { success: true, data: booking };
  }

  async getBookings(userId: string, status?: string): Promise<ApiResponse<Booking[]>> {
    await this.delay(600);
    
    let bookings = this.mockBookings.filter(b => b.user_id === userId);

    if (status === 'upcoming') {
      bookings = bookings.filter(b => b.status === 'confirmed');
    } else if (status === 'past') {
      bookings = bookings.filter(b => b.status === 'completed');
    }

    // Populate activity data
    bookings = bookings.map(booking => ({
      ...booking,
      activity: this.mockActivities.find(a => a.id === booking.activity_id)
    }));

    return { success: true, data: bookings };
  }

  async cancelBooking(bookingId: string): Promise<ApiResponse<void>> {
    await this.delay(800);
    
    const bookingIndex = this.mockBookings.findIndex(b => b.id === bookingId);
    if (bookingIndex === -1) {
      return { success: false, error: 'Бронирование не найдено' };
    }

    this.mockBookings[bookingIndex].status = 'cancelled';
    return { success: true };
  }

  // Favorites methods
  async addFavorite(activityId: string): Promise<ApiResponse<Favorite>> {
    await this.delay(500);
    
    const existingFavorite = this.mockFavorites.find(f => 
      f.activity_id === activityId && f.user_id === 'user_1'
    );

    if (existingFavorite) {
      return { success: false, error: 'Уже в избранном' };
    }

    const favorite: Favorite = {
      id: `favorite_${Date.now()}`,
      user_id: 'user_1',
      activity_id: activityId,
      added_at: new Date().toISOString()
    };

    this.mockFavorites.push(favorite);
    return { success: true, data: favorite };
  }

  async removeFavorite(activityId: string): Promise<ApiResponse<void>> {
    await this.delay(400);
    
    const favoriteIndex = this.mockFavorites.findIndex(f => 
      f.activity_id === activityId && f.user_id === 'user_1'
    );

    if (favoriteIndex === -1) {
      return { success: false, error: 'Не найдено в избранном' };
    }

    this.mockFavorites.splice(favoriteIndex, 1);
    return { success: true };
  }

  async getFavorites(): Promise<ApiResponse<Activity[]>> {
    await this.delay(600);
    
    const favoriteActivities = this.mockFavorites
      .filter(f => f.user_id === 'user_1')
      .map(favorite => 
        this.mockActivities.find(a => a.id === favorite.activity_id)
      )
      .filter(Boolean) as Activity[];

    return { success: true, data: favoriteActivities };
  }

  // User methods
  async getCurrentUser(): Promise<ApiResponse<User>> {
    await this.delay(400);
    return { success: true, data: this.mockUsers[0] };
  }

  async getChildren(): Promise<ApiResponse<Child[]>> {
    await this.delay(500);
    
    const children: Child[] = [
      {
        id: 'child_1',
        name: 'Мария',
        birth_date: '2018-03-15',
        gender: 'female',
        health_info: 'Аллергия на орехи'
      }
    ];

    return { success: true, data: children };
  }

  async registerPartner(partnerData: any): Promise<ApiResponse<Partner>> {
    await this.delay(1500);
    
    const partner: Partner = {
      id: 'partner_' + Date.now(),
      organization_name: partnerData.organization_name,
      phone: partnerData.phone,
      email: partnerData.email,
      address: partnerData.address,
      description: partnerData.description,
      status: 'pending',
      registration_date: new Date().toISOString(),
    };

    return { success: true, data: partner };
  }

  // Остальные методы для полноты
  async updateUser(userData: Partial<User>): Promise<ApiResponse<User>> {
    await this.delay(600);
    return { success: true, data: { ...this.mockUsers[0], ...userData } };
  }

  async addChild(childData: Omit<Child, 'id'>): Promise<ApiResponse<Child>> {
    await this.delay(700);
    
    const child: Child = {
      id: 'child_' + Date.now(),
      ...childData
    };

    return { success: true, data: child };
  }
}

export const mockApiService = new MockApiService();