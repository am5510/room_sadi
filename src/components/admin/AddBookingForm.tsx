"use client";

import React, { useState, useEffect } from 'react';
import { Plus, CheckCircle2, Loader2, Info } from 'lucide-react';

interface AddBookingFormProps {
  onSuccess: () => void;
}

const AddBookingForm: React.FC<AddBookingFormProps> = ({ onSuccess }) => {
  const [rooms, setRooms] = useState<any[]>([]);
  const [formData, setFormData] = useState({ roomId: "", date: "", title: "", isSubmitting: false, success: false });

  useEffect(() => {
    // Fetch rooms from API instead of using fixed options
    fetchRooms();
  }, []);

  const fetchRooms = async () => {
    try {
      const response = await fetch('/api/rooms');
      const data = await response.json();
      setRooms(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error('Failed to fetch rooms:', error);
    }
  };

  const handleBooking = async () => {
    if (!formData.roomId || !formData.date) return;

    setFormData(prev => ({ ...prev, isSubmitting: true }));

    try {
      // Find the selected room to get its name
      const selectedRoom = rooms.find(r => r.id === formData.roomId);
      
      const response = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          roomId: formData.roomId,
          date: formData.date,
          title: formData.title || selectedRoom?.name || "Admin Task",
          startTime: "08:00",
          endTime: "17:00",
          userName: "Administrator",
          userEmail: "admin@soptor.go.th",
        }),
      });

      if (response.ok) {
        setFormData(prev => ({ ...prev, isSubmitting: false, success: true, roomId: "", date: "", title: "" }));
        onSuccess();
        setTimeout(() => setFormData(prev => ({ ...prev, success: false })), 2000);
      }
    } catch (err) {
      console.error("Booking failed", err);
      setFormData(prev => ({ ...prev, isSubmitting: false }));
    }
  };

  return (
    <div className="flex flex-col space-y-10">
      <div className="bg-white rounded-[2.5rem] overflow-hidden shadow-sm flex flex-col">
        {/* Header Block - Lime Green with Plus Icon */}
        <div className="bg-[#99FF66] px-8 py-5 flex items-center justify-between">
          <div className="flex items-center">
             <div className="bg-[#5a5a5a] p-1 rounded-full mr-3">
                <Plus className="w-4 h-4 text-white" />
             </div>
             <h3 className="text-xl font-bold font-manrope text-on-surface tracking-tight">
               เพิ่มห้อง
             </h3>
          </div>
          {formData.success && (
            <span className="flex items-center text-[8px] font-black text-secondary uppercase animate-bounce font-manrope">
              <CheckCircle2 className="w-3 h-3 mr-1" /> OK
            </span>
          )}
        </div>

        {/* Form Body */}
        <div className="p-8 space-y-8">
          <div className="space-y-2">
            <label className="text-[15px] font-bold font-manrope text-on-surface">เลือกห้อง</label>
            <select
              value={formData.roomId}
              onChange={(e) => setFormData(prev => ({ ...prev, roomId: e.target.value }))}
              className="w-full bg-white border border-outline-variant/30 rounded-xl px-4 py-4 text-sm font-black font-manrope focus:outline-none focus:ring-2 focus:ring-[#99FF66]/20 transition-all text-on-surface appearance-none cursor-pointer"
            >
              <option value="">เลือกห้อง...</option>
              {rooms.map(room => (
                <option key={room.id} value={room.id}>{room.name}</option>
              ))}
            </select>
          </div>

          <div className="space-y-2">
            <label className="text-[15px] font-bold font-manrope text-on-surface">ชื่องาน (Optional)</label>
            <input
              type="text"
              placeholder="กรอกชื่องาน..."
              value={formData.title}
              onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
              className="w-full bg-white border border-outline-variant/30 rounded-xl px-4 py-4 text-sm font-black font-manrope focus:outline-none focus:ring-2 focus:ring-[#99FF66]/20 transition-all text-on-surface"
            />
          </div>

          <div className="space-y-2">
            <label className="text-[15px] font-bold font-manrope text-on-surface">วันที่ใช้ห้อง</label>
            <input
              type="date"
              value={formData.date}
              onChange={(e) => setFormData(prev => ({ ...prev, date: e.target.value }))}
              className="w-full bg-white border border-outline-variant/30 rounded-xl px-4 py-4 text-sm font-black font-manrope focus:outline-none focus:ring-2 focus:ring-[#99FF66]/20 transition-all text-on-surface font-inter cursor-pointer"
            />
          </div>

          <button
            onClick={handleBooking}
            disabled={!formData.roomId || !formData.date || formData.isSubmitting}
            className="hidden" // The image doesn't feature a visible submit button but we'll triggered by input or we add a hidden/styled one if user wants. But usually, a form needs a button. The image has no button. I'll add a subtle one or auto-trigger? 
            // Better add a button as it's needed for UI interaction.
          />
          <button 
            onClick={handleBooking}
            disabled={!formData.roomId || !formData.date || formData.isSubmitting}
            className="w-full py-5 rounded-2xl font-black text-xs uppercase tracking-widest bg-surface-container-high hover:bg-[#99FF66] transition-all text-on-surface active:scale-95 disabled:opacity-20"
          >
             {formData.isSubmitting ? <Loader2 className="w-4 h-4 animate-spin mx-auto"/> : "Add to Calendar"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddBookingForm;
