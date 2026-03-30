"use client";

import React, { useState, useEffect } from 'react';
import { Calendar, CheckCircle2, Loader2 } from 'lucide-react';

interface QuickBookingProps {
  onSuccess: () => void;
}

const QuickBooking: React.FC<QuickBookingProps> = ({ onSuccess }) => {
  const [rooms, setRooms] = useState<any[]>([]);
  const [slot, setSlot] = useState({ roomId: "", date: "", isSubmitting: false, success: false });

  useEffect(() => {
    fetch("/api/rooms")
      .then(res => res.json())
      .then(data => setRooms(Array.isArray(data) ? data : []));
  }, []);

  const handleBooking = async () => {
    if (!slot.roomId || !slot.date) return;

    setSlot(prev => ({ ...prev, isSubmitting: true }));

    try {
      const response = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          roomId: slot.roomId,
          date: slot.date,
          title: "Admin Assigned",
          startTime: "08:00",
          endTime: "17:00",
          userName: "Administrator",
          userEmail: "admin@soptor.go.th",
        }),
      });

      if (response.ok) {
        setSlot(prev => ({ ...prev, isSubmitting: false, success: true }));
        onSuccess();
        
        setTimeout(() => {
          setSlot(prev => ({ ...prev, success: false }));
        }, 2000);
      }
    } catch (err) {
      console.error("Booking failed", err);
      setSlot(prev => ({ ...prev, isSubmitting: false }));
    }
  };

  const updateSlot = (field: string, value: string) => {
    setSlot(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="flex justify-center w-full">
      <div className="w-full max-w-md bg-surface-container-high rounded-2xl p-8 border border-outline-variant/10 shadow-lg flex flex-col space-y-8 transition-all hover:bg-surface-container-high/80">
        <div className="flex items-center justify-between">
          <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-on-surface-variant/40 font-manrope">Slot Assignment</h4>
          {slot.success && (
            <span className="flex items-center text-[8px] font-black text-secondary uppercase animate-bounce font-manrope">
              <CheckCircle2 className="w-3 h-3 mr-1" /> OK
            </span>
          )}
        </div>

        <div className="space-y-6">
          <div className="space-y-4">
            <select
              value={slot.roomId}
              onChange={(e) => updateSlot("roomId", e.target.value)}
              className="w-full bg-surface-container-lowest border border-outline-variant/20 rounded-xl px-4 py-5 text-sm font-black font-manrope focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all text-on-surface appearance-none cursor-pointer"
            >
              <option value="">เลือกห้อง...</option>
              {rooms.map(room => (
                <option key={room.id} value={room.id}>{room.name}</option>
              ))}
            </select>

            <input
              type="date"
              value={slot.date}
              onChange={(e) => updateSlot("date", e.target.value)}
              className="w-full bg-surface-container-lowest border border-outline-variant/20 rounded-xl px-4 py-5 text-sm font-black font-manrope focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all text-on-surface font-inter cursor-pointer"
            />
          </div>

          <button
            onClick={handleBooking}
            disabled={!slot.roomId || !slot.date || slot.isSubmitting}
            className="w-full bg-primary text-surface py-5 rounded-xl font-black text-[10px] uppercase tracking-[0.2em] flex items-center justify-center hover:opacity-90 transition-all active:scale-95 disabled:opacity-20 shadow-xl shadow-primary/10"
          >
            {slot.isSubmitting ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              "Add to Calendar"
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default QuickBooking;
