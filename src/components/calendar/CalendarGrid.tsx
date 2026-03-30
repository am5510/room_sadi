"use client";

import React, { useState, useEffect } from 'react';
import { Loader2 } from 'lucide-react';

interface CalendarGridProps {
  displayDate: Date;
}

const CalendarGrid: React.FC<CalendarGridProps> = ({ displayDate }) => {
  const days = ['จ.', 'อ.', 'พ.', 'พฤ.', 'ศ.', 'ส.', 'อา.'];
  
  const [bookings, setBookings] = useState<any[]>([]);
  const [rooms, setRooms] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const realToday = new Date();
  const currentYear = displayDate.getFullYear();
  const currentMonth = displayDate.getMonth();
  const currentDay = displayDate.getDate();

  const fetchCalendarData = async () => {
    setLoading(true);
    try {
      const [roomsRes, bookingsRes] = await Promise.all([
        fetch("/api/rooms"),
        fetch(`/api/bookings?month=${currentMonth}&year=${currentYear}`)
      ]);
      
      const roomsData = await roomsRes.json();
      const bookingsData = await bookingsRes.json();
      
      setRooms(Array.isArray(roomsData) ? roomsData : []);
      setBookings(Array.isArray(bookingsData) ? bookingsData : []);
    } catch (err) {
      console.error("Failed to load calendar data", err);
    } finally {
      setLoading(false);
    }
  };

  const getRoomColor = (roomId: string) => {
    const room = rooms.find(r => r.id === roomId);
    return room?.color || '#99FF66';
  };

  const hexToRgba = (hex: string, alpha: number) => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  };

  useEffect(() => {
    fetchCalendarData();
  }, [currentMonth, currentYear]);

  const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();
  const firstDayIndex = firstDayOfMonth === 0 ? 6 : firstDayOfMonth - 1;
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const prevMonthLastDay = new Date(currentYear, currentMonth, 0).getDate();
  const prevMonthPadding = Array.from({ length: firstDayIndex }, (_, i) => prevMonthLastDay - firstDayIndex + 1 + i);
  const monthDays = Array.from({ length: daysInMonth }, (_, i) => i + 1);
  
  if (loading) {
    return (
      <div className="min-h-[400px] flex items-center justify-center bg-surface-container-low rounded-xl">
        <Loader2 className="w-10 h-10 text-primary animate-spin" />
        <span className="ml-4 font-manrope font-black text-primary uppercase tracking-widest text-sm">เลื่อนปฏิทิน...</span>
      </div>
    );
  }

  return (
    <section className="bg-surface-container-low rounded-xl p-0.5 overflow-hidden shadow-2xl shadow-primary/5 w-full">
      <div className="grid grid-cols-7 bg-surface-container-high/50 border-b border-outline-variant/10 font-manrope">
        {days.map(day => (
          <div key={day} className="py-3 md:py-6 text-center font-black text-xs md:text-sm tracking-[0.2em] text-on-surface-variant uppercase">
            {day}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 bg-surface">
        {prevMonthPadding.map(day => (
          <div key={`prev-${day}`} className="aspect-square md:min-h-[140px] md:aspect-auto p-2 md:p-4 bg-surface-container-high/20 opacity-40 border-r border-b border-outline-variant/5">
            <span className="text-sm md:text-base font-black font-manrope text-on-surface-variant/40">{day}</span>
          </div>
        ))}

        {monthDays.map(day => {
          const isToday = 
            day === realToday.getDate() && 
            currentMonth === realToday.getMonth() && 
            currentYear === realToday.getFullYear();
            
          const dayBookings = bookings.filter(b => {
             const bDate = new Date(b.date);
             return bDate.getDate() === day;
          });

          // Get the first booking's color for the day background
          const dayBackgroundColor = dayBookings.length > 0 ? getRoomColor(dayBookings[0].roomId) : null;

          return (
            <div 
              key={day} 
              className={`aspect-square md:min-h-[140px] md:aspect-auto p-2 md:p-6 border-r border-b border-outline-variant/5 transition-colors cursor-pointer group relative
                ${isToday ? 'ring-inset ring-1 md:ring-2 ring-primary-fixed-dim/30 shadow-xl z-10' : ''}
              `}
              style={{
                backgroundColor: dayBackgroundColor || (isToday ? 'var(--md-sys-color-primary)' : 'var(--md-sys-color-surface-container-lowest)'),
                color: dayBackgroundColor ? '#000000' : (isToday ? 'var(--md-sys-color-on-primary)' : 'var(--md-sys-color-on-surface-variant)')
              }}
            >
              <span className={`text-sm md:text-xl font-black font-manrope`}>
                {day}
              </span>

              {isToday && !dayBackgroundColor && (
                <div className="absolute top-1 right-1 md:relative md:top-auto md:right-auto mt-0.5 md:mt-2 text-[6px] md:text-[8px] font-bold py-0.5 px-1 md:py-1 md:px-2 bg-primary-fixed-dim/20 text-primary-fixed-dim rounded uppercase tracking-tighter w-fit">
                  TODAY
                </div>
              )}

              <div className="mt-1 md:mt-4 space-y-1">
                {dayBookings.map((booking) => {
                  const roomColor = getRoomColor(booking.roomId);
                  return (
                    <div 
                      key={booking.id} 
                      className="p-1 md:p-2 rounded border overflow-hidden"
                      style={{ 
                        backgroundColor: roomColor,
                        borderColor: roomColor
                      }}
                    >
                      <p className="text-[6px] md:text-[9px] font-bold uppercase leading-none truncate" style={{ color: '#000000' }}>
                        {booking.title}
                      </p>
                      <div className="w-1.5 h-1.5 rounded-full md:hidden" style={{ backgroundColor: roomColor }} title={booking.title} />
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default CalendarGrid;
