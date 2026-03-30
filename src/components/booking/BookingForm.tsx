"use client";

import React, { useState, useEffect } from 'react';
import { Calendar, Plus, ChevronDown } from 'lucide-react';

interface Room {
  id: string;
  name: string;
  type?: string;
  capacity?: number;
  color?: string;
}

interface BookingFormData {
  roomId: string;
  title: string;
  date: string;
  isLiveBroadcast: boolean;
  isGalaRoom: boolean;
}

interface BookingFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: BookingFormData) => void;
  selectedDate?: Date;
}

const BookingForm: React.FC<BookingFormProps> = ({ 
  isOpen, 
  onClose, 
  onSubmit, 
  selectedDate 
}) => {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState<string>('');
  const [eventTitle, setEventTitle] = useState('');
  const [useDate, setUseDate] = useState('');
  const [isLiveBroadcast, setIsLiveBroadcast] = useState(false);
  const [isGalaRoom, setIsGalaRoom] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    if (isOpen) {
      fetchRooms();
      if (selectedDate) {
        setUseDate(selectedDate.toISOString().split('T')[0]);
      }
    }
  }, [isOpen, selectedDate]);

  const fetchRooms = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/rooms');
      const data = await response.json();
      setRooms(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error('Failed to fetch rooms:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedRoom || !useDate) {
      alert('กรุณาเลือกห้องและวันที่');
      return;
    }

    const formData: BookingFormData = {
      roomId: selectedRoom,
      title: eventTitle,
      date: useDate,
      isLiveBroadcast,
      isGalaRoom
    };

    onSubmit(formData);
    
    // Reset form
    setSelectedRoom('');
    setEventTitle('');
    setUseDate('');
    setIsLiveBroadcast(false);
    setIsGalaRoom(false);
    onClose();
  };

  const getSelectedRoomName = () => {
    const room = rooms.find(r => r.id === selectedRoom);
    return room ? room.name : 'เลือกห้อง';
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-2 sm:p-4">
      <div className="bg-surface rounded-2xl w-full max-w-md sm:max-w-lg shadow-2xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="bg-primary text-surface p-4 sm:p-6 rounded-t-2xl">
          <h2 className="text-xl sm:text-2xl font-bold text-center">เพิ่มห้อง</h2>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-4 sm:p-6 space-y-4 sm:space-y-6">
          {/* Room Selection */}
          <div className="relative">
            <label className="block text-sm font-medium text-on-surface mb-2">
              เลือกห้อง
            </label>
            <div className="relative">
              <button
                type="button"
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="w-full bg-surface-container-low border border-outline-variant/20 rounded-xl px-3 sm:px-4 py-3 flex items-center justify-between hover:bg-surface-container transition-colors text-sm sm:text-base"
              >
                <span className={selectedRoom ? 'text-on-surface' : 'text-on-surface-variant'}>
                  {getSelectedRoomName()}
                </span>
                <ChevronDown className={`w-5 h-5 text-on-surface-variant transition-transform ${dropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {dropdownOpen && (
                <div className="absolute top-full left-0 right-0 mt-1 bg-surface-container border border-outline-variant/20 rounded-xl shadow-lg z-10 max-h-48 overflow-y-auto">
                  {rooms.map((room) => (
                    <button
                      key={room.id}
                      type="button"
                      onClick={() => {
                        setSelectedRoom(room.id);
                        setDropdownOpen(false);
                      }}
                      className="w-full px-3 sm:px-4 py-3 text-left hover:bg-surface-container-low transition-colors first:rounded-t-xl last:rounded-b-xl text-sm sm:text-base"
                    >
                      <div className="flex items-center space-x-3">
                        <div 
                          className="w-4 h-4 rounded-full border-2"
                          style={{ backgroundColor: room.color || '#99FF66', borderColor: room.color || '#99FF66' }}
                        />
                        <div className="flex flex-col">
                          <span className="font-medium text-on-surface">{room.name}</span>
                          {room.type && <span className="text-sm text-on-surface-variant">{room.type}</span>}
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Event Title */}
          <div>
            <label className="block text-sm font-medium text-on-surface mb-2">
              ชื่องาน (Optional)
            </label>
            <input
              type="text"
              value={eventTitle}
              onChange={(e) => setEventTitle(e.target.value)}
              placeholder="กรอกชื่องาน"
              className="w-full bg-surface-container-low border border-outline-variant/20 rounded-xl px-3 sm:px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all text-sm sm:text-base"
            />
          </div>

          {/* Date Selection */}
          <div>
            <label className="block text-sm font-medium text-on-surface mb-2">
              วันที่ใช้ห้อง
            </label>
            <div className="relative">
              <input
                type="date"
                value={useDate}
                onChange={(e) => setUseDate(e.target.value)}
                className="w-full bg-surface-container-low border border-outline-variant/20 rounded-xl px-3 sm:px-4 py-3 pr-12 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all text-sm sm:text-base"
                required
              />
              <Calendar className="absolute right-3 sm:right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-on-surface-variant pointer-events-none" />
            </div>
          </div>

          {/* Room Type Checkboxes */}
          <div className="space-y-3">
            <label className="flex items-center space-x-3 cursor-pointer">
              <input
                type="checkbox"
                checked={isLiveBroadcast}
                onChange={(e) => setIsLiveBroadcast(e.target.checked)}
                className="w-4 h-4 sm:w-5 sm:h-5 text-primary bg-surface-container-low border-outline-variant/20 rounded focus:ring-2 focus:ring-primary/50"
              />
              <span className="text-on-surface font-medium text-sm sm:text-base">ห้องประชุม</span>
            </label>

            <label className="flex items-center space-x-3 cursor-pointer">
              <input
                type="checkbox"
                checked={isGalaRoom}
                onChange={(e) => setIsGalaRoom(e.target.checked)}
                className="w-4 h-4 sm:w-5 sm:h-5 text-primary bg-surface-container-low border-outline-variant/20 rounded focus:ring-2 focus:ring-primary/50"
              />
              <span className="text-on-surface font-medium text-sm sm:text-base">ห้องอื่นๆ</span>
            </label>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-primary text-surface font-bold py-3 sm:py-4 rounded-xl hover:bg-primary/90 transition-colors flex items-center justify-center space-x-2 text-sm sm:text-base"
          >
            <Plus className="w-4 h-4 sm:w-5 sm:h-5" />
            <span>ADD TO CALENDAR</span>
          </button>
        </form>
      </div>
    </div>
  );
};

export default BookingForm;
