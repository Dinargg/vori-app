// Полные структуры идентичные будущим Go моделям

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface User {
  id: string;
  phone: string;
  email: string;
  first_name: string;
  last_name: string;
  user_type: 'parent' | 'partner';
  created_at: string;
}

export interface Child {
  id: string;
  name: string;
  birth_date: string;
  gender: 'male' | 'female';
  health_info?: string;
}

export interface Partner {
  id: string;
  organization_name: string;
  phone: string;
  email: string;
  address: string;
  description: string;
  status: 'pending' | 'approved' | 'rejected';
  registration_date: string;
}

export interface ScheduleSlot {
  day: 'monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday' | 'saturday' | 'sunday';
  time: string;
  duration: number;
  available_slots: number;
}

export interface Activity {
  id: string;
  name: string;
  category: string;
  description: string;
  age_range: { min: number; max: number };
  price: number;
  duration: number;
  location: {
    address: string;
    coordinates: { lat: number; lng: number };
  };
  partner_id: string;
  partner?: Partner;
  images: string[];
  rating: number;
  review_count: number;
  available_slots: number;
  schedule: ScheduleSlot[];
}

export interface Booking {
  id: string;
  activity_id: string;
  child_id: string;
  user_id: string;
  schedule_slot: string;
  date: string;
  status: 'confirmed' | 'cancelled' | 'completed';
  total_price: number;
  created_at: string;
  activity?: Activity;
  child?: Child;
}

export interface Favorite {
  id: string;
  user_id: string;
  activity_id: string;
  added_at: string;
  activity?: Activity;
}

export interface Review {
  id: string;
  user_id: string;
  activity_id: string;
  rating: number;
  comment: string;
  user_name: string;
  date: string;
}