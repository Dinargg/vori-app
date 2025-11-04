import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Booking, Activity, Child } from '../types/api';
import { mockApiService } from '../services/MockApiService';

interface BookingsContextType {
  bookings: Booking[];
  upcomingBookings: Booking[];
  pastBookings: Booking[];
  isLoading: boolean;
  bookActivity: (activityId: string, childId: string, date: string, scheduleSlot: string) => Promise<boolean>;
  cancelBooking: (bookingId: string) => Promise<boolean>;
  getBookingById: (bookingId: string) => Booking | undefined;
  refreshBookings: () => Promise<void>;
}

const BookingsContext = createContext<BookingsContextType | undefined>(undefined);

export const BookingsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Загрузка бронирований при старте
  useEffect(() => {
    loadBookings();
  }, []);

  const loadBookings = async () => {
    setIsLoading(true);
    const response = await mockApiService.getBookings('user_1');
    if (response.success && response.data) {
      setBookings(response.data);
    }
    setIsLoading(false);
  };

  // Предстоящие бронирования
  const upcomingBookings = bookings.filter(booking => 
    booking.status === 'confirmed' || booking.status === 'pending'
  );

  // Прошедшие бронирования
  const pastBookings = bookings.filter(booking => 
    booking.status === 'completed' || booking.status === 'cancelled'
  );

  const bookActivity = async (
    activityId: string, 
    childId: string, 
    date: string, 
    scheduleSlot: string
  ): Promise<boolean> => {
    setIsLoading(true);
    
    const bookingData = {
      activity_id: activityId,
      child_id: childId,
      user_id: 'user_1',
      schedule_slot: scheduleSlot,
      date: date
    };

    const response = await mockApiService.createBooking(bookingData);
    
    if (response.success && response.data) {
      setBookings(prev => [...prev, response.data!]);
      setIsLoading(false);
      return true;
    }
    
    setIsLoading(false);
    return false;
  };

  const cancelBooking = async (bookingId: string): Promise<boolean> => {
    setIsLoading(true);
    
    const response = await mockApiService.cancelBooking(bookingId);
    
    if (response.success) {
      setBookings(prev => 
        prev.map(booking => 
          booking.id === bookingId 
            ? { ...booking, status: 'cancelled' as const }
            : booking
        )
      );
      setIsLoading(false);
      return true;
    }
    
    setIsLoading(false);
    return false;
  };

  const getBookingById = (bookingId: string): Booking | undefined => {
    return bookings.find(booking => booking.id === bookingId);
  };

  const refreshBookings = async () => {
    await loadBookings();
  };

  return (
    <BookingsContext.Provider value={{
      bookings,
      upcomingBookings,
      pastBookings,
      isLoading,
      bookActivity,
      cancelBooking,
      getBookingById,
      refreshBookings
    }}>
      {children}
    </BookingsContext.Provider>
  );
};

export const useBookings = (): BookingsContextType => {
  const context = useContext(BookingsContext);
  if (context === undefined) {
    throw new Error('useBookings must be used within a BookingsProvider');
  }
  return context;
};