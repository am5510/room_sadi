"use client";

import React, { useState, useEffect } from 'react';
import { Trash2 } from 'lucide-react';

interface Booking {
  id: string;
  room: { name: string };
  title: string;
  date: string;
}

const BookingReport = ({ refreshTrigger }: { refreshTrigger: number }) => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);

  const handleDelete = async (bookingId: string) => {
    if (!confirm('คุณแน่ใจว่าต้องการลบรายการนี้?')) {
      return;
    }

    try {
      const response = await fetch(`/api/bookings/${bookingId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        // Remove from local state
        setBookings(prev => prev.filter(b => b.id !== bookingId));
      } else {
        alert('ไม่สามารถลบรายการได้');
      }
    } catch (error) {
      console.error('Delete error:', error);
      alert('เกิดข้อผิดพลาดในการลบรายการ');
    }
  };

  useEffect(() => {
    const fetchBookings = async () => {
      setLoading(true);
      const today = new Date();
      try {
        const res = await fetch(`/api/bookings?month=${today.getMonth()}&year=${today.getFullYear()}`);
        const data = await res.json();
        setBookings(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("Failed to fetch report", err);
      } finally {
        setLoading(false);
      }
    };
    fetchBookings();
  }, [refreshTrigger]);

  return (
    <div className="flex flex-col w-full h-full bg-white rounded-[2.5rem] overflow-hidden shadow-sm">
      {/* Header Block - Lime Green */}
      <div className="bg-[#99FF66] px-8 py-5">
        <h3 className="text-xl font-bold font-manrope text-on-surface tracking-tight">
          รายงานการใช้ห้อง
        </h3>
      </div>

      {/* Table Content */}
      <div className="flex-1 p-8">
        <table className="w-full text-left font-manrope">
          <thead>
            <tr className="text-sm font-bold text-on-surface-variant/60 border-b border-outline-variant/5">
              <th className="pb-4 w-12 text-on-surface font-black">no.</th>
              <th className="pb-4 font-black text-on-surface">ห้อง</th>
              <th className="pb-4 font-black text-on-surface">ชื่องาน</th>
              <th className="pb-4 text-right font-black text-on-surface">วันที่</th>
              <th className="pb-4 text-center font-black text-on-surface">จัดการ</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-outline-variant/5">
            {loading ? (
              <tr>
                <td colSpan={5} className="py-10 text-center text-xs font-black uppercase tracking-widest text-on-surface-variant/20 italic">
                  Analyzing Ledger Data...
                </td>
              </tr>
            ) : bookings.length === 0 ? (
              <tr>
                <td colSpan={5} className="py-10 text-center text-xs font-black uppercase tracking-widest text-on-surface-variant/20 italic">
                  No Entries Found
                </td>
              </tr>
            ) : (
              bookings.map((booking, index) => (
                <tr key={booking.id} className="text-[13px] hover:bg-surface-container-low/30 transition-colors">
                  <td className="py-4 font-black text-on-surface/40">{(index + 1).toString().padStart(2, '0')}</td>
                  <td className="py-4 font-black text-on-surface">{booking.room.name}</td>
                  <td className="py-4 font-black text-on-surface/70">{booking.title}</td>
                  <td className="py-4 text-right font-black text-on-surface">
                    {new Date(booking.date).toLocaleDateString('th-TH', { 
                      day: 'numeric', 
                      month: 'short', 
                      year: '2-digit' 
                    })}
                  </td>
                  <td className="py-4 text-center">
                    <button
                      onClick={() => handleDelete(booking.id)}
                      className="p-2 hover:bg-error/10 rounded-full transition-all text-error"
                      title="ลบรายการ"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BookingReport;
