"use client";

import React, { useState, useEffect } from 'react';
import CalendarGrid from '@/components/calendar/CalendarGrid';
import VellumOverlay from '@/components/details/VellumOverlay';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function Home() {
  const [isOverlayOpen, setOverlayOpen] = useState(false);
  const [currentDate, setCurrentDate] = useState<Date | null>(null);

  useEffect(() => {
    setCurrentDate(new Date());
  }, []);

  if (!currentDate) return null;

  const handlePrevMonth = () => {
    const newDate = new Date(currentDate);
    newDate.setMonth(newDate.getMonth() - 1);
    setCurrentDate(newDate);
  };

  const handleNextMonth = () => {
    const newDate = new Date(currentDate);
    newDate.setMonth(newDate.getMonth() + 1);
    setCurrentDate(newDate);
  };

  const monthName = new Intl.DateTimeFormat('th-TH', { month: 'long' }).format(currentDate);
  const yearName = currentDate.getFullYear() + 543;

  return (
    <div className="flex flex-col space-y-12">
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-4 md:gap-6">
        <div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight text-on-surface font-manrope">
            {monthName} {yearName}
          </h1>
        </div>

        <div className="flex items-center space-x-2 flex-wrap gap-2">
          
          <button 
            onClick={handlePrevMonth}
            className="flex items-center px-3 sm:px-4 py-2 hover:bg-surface-container-low rounded-xl transition-all text-on-surface-variant/70 hover:text-primary group"
          >
            <ChevronLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
            <span className="text-[10px] sm:text-xs font-black uppercase tracking-widest font-manrope">เดือนก่อน</span>
          </button>
          
          <div className="w-px h-4 bg-outline-variant/10" />
          
          <button 
            onClick={handleNextMonth}
            className="flex items-center px-3 sm:px-4 py-2 hover:bg-surface-container-low rounded-xl transition-all text-on-surface-variant/70 hover:text-primary group"
          >
            <span className="text-[10px] sm:text-xs font-black uppercase tracking-widest font-manrope">เดือนถัดไป</span>
            <ChevronRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </header>

      <CalendarGrid displayDate={currentDate} />

      <VellumOverlay isOpen={isOverlayOpen} onClose={() => setOverlayOpen(false)} />
    </div>
  );
}
